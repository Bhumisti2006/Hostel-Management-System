#include <iostream>
#include <fstream>
#include <sstream>
#include <vector>
using namespace std;

// ================= BASE CLASS =================
class User
{
protected:
    string name;
    int id;

public:
    User(string n = "", int i = 0)
    {
        name = n;
        id = i;
    }

    virtual void display()
    {
        cout << "User: " << name << endl;
    }

    int getID() { return id; }
    string getName() { return name; }
};

// ================= DERIVED CLASS =================
class Student : public User
{
private:
    string branch, email, contact, hostel, room, fee;

public:
    Student(string n, int i, string b, string e, string c, string h, string r, string f)
        : User(n, i)
    {
        branch = b;
        email = e;
        contact = c;
        hostel = h;
        room = r;
        fee = f;
    }

    string getRoom() { return room; }
    string getFee() { return fee; }

    void display() override
    {
        cout << "\nName: " << name
             << "\nID: " << id
             << "\nBranch: " << branch
             << "\nEmail: " << email
             << "\nContact: " << contact
             << "\nHostel: " << hostel
             << "\nRoom: " << room
             << "\nFee: " << fee << endl;
    }
};

// ================= COMPLAINT HIERARCHY =================
class Complaint
{
public:
    virtual void submit() = 0; // pure virtual
    virtual ~Complaint() {}
};

class ElectricityComplaint : public Complaint
{
public:
    void submit() override
    {
        cout << "Electricity complaint submitted\n";
    }
};

class FoodComplaint : public Complaint
{
public:
    void submit() override
    {
        cout << "Food complaint submitted\n";
    }
};

class OtherComplaint : public Complaint
{
private:
    string description;

public:
    OtherComplaint(string desc) : description(desc) {}

    void submit() override
    {
        cout << "Other complaint submitted: " << description << "\n";
    }
};

// ================= WARDEN NOTICE HIERARCHY =================
class WardenNotice
{
protected:
    string message;
    string postedAt;

public:
    WardenNotice(string msg, string time = "") : message(msg), postedAt(time) {}
    virtual void post() = 0;
    virtual void read() = 0;
    virtual ~WardenNotice() {}
};

class StaffAvailabilityNotice : public WardenNotice
{
private:
    string staffType;
    string slot;

public:
    StaffAvailabilityNotice(string type, string s, string time = "")
        : WardenNotice("", time), staffType(type), slot(s)
    {
        message = staffType + " available on " + slot;
    }

    void post() override
    {
        cout << "[WARDEN NOTICE] " << message << "\n";
    }

    void read() override
    {
        cout << "Availability: " << staffType << " | Slot: " << slot;
        if (!postedAt.empty())
            cout << " | Posted: " << postedAt;
        cout << "\n";
    }
};

class GeneralNotice : public WardenNotice
{
public:
    GeneralNotice(string msg, string time = "") : WardenNotice(msg, time) {}

    void post() override
    {
        cout << "[WARDEN NOTICE] " << message << "\n";
    }

    void read() override
    {
        cout << "Notice: " << message;
        if (!postedAt.empty())
            cout << " | Posted: " << postedAt;
        cout << "\n";
    }
};

// ================= NOTICE BOARD (HAS-A) =================
class NoticeBoard
{
private:
    vector<WardenNotice *> notices;

public:
    void addNotice(WardenNotice *n)
    {
        n->post();
        notices.push_back(n);
    }

    void viewAll()
    {
        if (notices.empty())
        {
            cout << "No notices posted.\n";
            return;
        }
        cout << "\n--- NOTICE BOARD ---\n";
        for (auto &n : notices)
            n->read();
    }

    ~NoticeBoard()
    {
        for (auto &n : notices)
            delete n;
    }
};

// ================= SYSTEM CLASS =================
class HostelSystem
{
private:
    vector<Student> students; // HAS-A
    NoticeBoard board;        // HAS-A

public:
    // Load data from CSV
    void loadStudents()
    {
        ifstream file("students.csv");
        string line;

        if (!file)
        {
            cout << "Error opening students.csv\n";
            return;
        }

        getline(file, line); // skip header

        while (getline(file, line))
        {
            stringstream ss(line);
            string name, id, branch, email, contact, hostel, room, fee;

            getline(ss, name, ',');
            getline(ss, id, ',');
            getline(ss, branch, ',');
            getline(ss, email, ',');
            getline(ss, contact, ',');
            getline(ss, hostel, ',');
            getline(ss, room, ',');
            getline(ss, fee, ',');

            students.push_back(Student(name, stoi(id), branch, email, contact, hostel, room, fee));
        }

        file.close();
    }

    // View Student
    void viewStudent(string searchName)
    {
        for (auto &s : students)
        {
            if (s.getName() == searchName)
            {
                s.display();
                return;
            }
        }
        cout << "Student not found\n";
    }

    // Fee Status
    void showFee(int id)
    {
        for (auto &s : students)
        {
            if (s.getID() == id)
            {
                cout << "Fee Status: " << s.getFee() << endl;
                return;
            }
        }
        cout << "Student not found\n";
    }

    // Roommates
    void showRoommates(string roomNo)
    {
        cout << "\nRoommates:\n";
        for (auto &s : students)
        {
            if (s.getRoom() == roomNo)
            {
                cout << s.getName() << endl;
            }
        }
    }

    // Room Details
    void viewRoom(int id)
    {
        for (auto &s : students)
        {
            if (s.getID() == id)
            {
                cout << "Room: " << s.getRoom() << endl;
                showRoommates(s.getRoom());
                return;
            }
        }
        cout << "Student not found\n";
    }

    // Complaint Section
    void complaintMenu()
    {
        int ch;
        cout << "\n1. Electricity\n2. Food\n3. Other\nChoice: ";
        cin >> ch;

        Complaint *c;

        if (ch == 1)
            c = new ElectricityComplaint();
        else if (ch == 2)
            c = new FoodComplaint();
        else
        {
            string desc;
            cin.ignore();
            cout << "Describe your complaint: ";
            getline(cin, desc);
            c = new OtherComplaint(desc);
        }

        c->submit();
        delete c;
    }

    // Warden: post a notice
    void wardenMenu()
    {
        int ch;
        cout << "\n1. Post staff availability\n2. Post general notice\nChoice: ";
        cin >> ch;
        cin.ignore();

        if (ch == 1)
        {
            string type, slot;
            cout << "Staff type (e.g. Electrician, Plumber): ";
            getline(cin, type);
            cout << "Available slot (e.g. Monday 10am-12pm): ";
            getline(cin, slot);
            board.addNotice(new StaffAvailabilityNotice(type, slot));
        }
        else
        {
            string msg;
            cout << "Enter notice message: ";
            getline(cin, msg);
            board.addNotice(new GeneralNotice(msg));
        }
    }

    // View all notices
    void viewNotices()
    {
        board.viewAll();
    }
};

// ================= MAIN =================
int main()
{
    HostelSystem system;
    system.loadStudents();

    int choice;

    do
    {
        cout << "\n--- HOSTEL MANAGEMENT ---\n";
        cout << "1. View Student\n";
        cout << "2. Room Details\n";
        cout << "3. Fee Status\n";
        cout << "4. Complaint\n";
        cout << "5. View NoticesPost\n";
        cout << "6. Notice (Warden)\n";
        cout << "7. Exit\n";
        cout << "Enter choice: ";
        cin >> choice;

        switch (choice)
        {
        case 1:
        {
            string name;
            cout << "Enter Name: ";
            cin >> name;
            system.viewStudent(name);
            break;
        }
        case 2:
        {
            int id;
            cout << "Enter ID: ";
            cin >> id;
            system.viewRoom(id);
            break;
        }
        case 3:
        {
            int id;
            cout << "Enter ID: ";
            cin >> id;
            system.showFee(id);
            break;
        }
        case 4:
            system.complaintMenu();
            break;
        case 5:
            system.viewNotices();
            break;
        case 6:
            system.wardenMenu();
            break;
        case 7:
            cout << "Exiting...\n";
            break;
        default:
            cout << "Invalid choice\n";
        }

    } while (choice != 7);

    return 0;
}