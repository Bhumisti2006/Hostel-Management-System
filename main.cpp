#include <iostream>
#include <fstream>
#include <sstream>
#include <vector>
using namespace std;

// ================= BASE CLASS =================
class User {
protected:
    string name;
    int id;

public:
    User(string n = "", int i = 0) {
        name = n;
        id = i;
    }

    virtual void display() {
        cout << "User: " << name << endl;
    }

    int getID() { return id; }
    string getName() { return name; }
};

// ================= DERIVED CLASS =================
class Student : public User {
private:
    string branch, email, contact, hostel, room, fee;

public:
    Student(string n, int i, string b, string e, string c, string h, string r, string f)
        : User(n, i) {
        branch = b;
        email = e;
        contact = c;
        hostel = h;
        room = r;
        fee = f;
    }

    string getRoom() { return room; }
    string getFee() { return fee; }

    void display() override {
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

// ================= COMPLAINT (POLYMORPHISM) =================
class Complaint {
public:
    virtual void submit() = 0; // pure virtual
};

class ElectricityComplaint : public Complaint {
public:
    void submit() override {
        cout << "Electricity complaint submitted\n";
    }
};

class FoodComplaint : public Complaint {
public:
    void submit() override {
        cout << "Food complaint submitted\n";
    }
};

// ================= SYSTEM CLASS =================
class HostelSystem {
private:
    vector<Student> students; // HAS-A relationship

public:
    // Load data from CSV
    void loadStudents() {
        ifstream file("students.csv");
        string line;

        if (!file) {
            cout << "Error opening students.csv\n";
            return;
        }

        getline(file, line); // skip header

        while (getline(file, line)) {
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
    void viewStudent(string searchName) {
        for (auto &s : students) {
            if (s.getName() == searchName) {
                s.display(); // polymorphism
                return;
            }
        }
        cout << "Student not found\n";
    }

    // Fee Status
    void showFee(int id) {
        for (auto &s : students) {
            if (s.getID() == id) {
                cout << "Fee Status: " << s.getFee() << endl;
                return;
            }
        }
        cout << "Student not found\n";
    }

    // Roommates
    void showRoommates(string roomNo) {
        cout << "\nRoommates:\n";
        for (auto &s : students) {
            if (s.getRoom() == roomNo) {
                cout << s.getName() << endl;
            }
        }
    }

    // Room Details
    void viewRoom(int id) {
        for (auto &s : students) {
            if (s.getID() == id) {
                cout << "Room: " << s.getRoom() << endl;
                showRoommates(s.getRoom());
                return;
            }
        }
        cout << "Student not found\n";
    }

    // Complaint Section
    void complaintMenu() {
        int ch;
        cout << "\n1. Electricity\n2. Food\nChoice: ";
        cin >> ch;

        Complaint* c;

        if (ch == 1)
            c = new ElectricityComplaint();
        else
            c = new FoodComplaint();

        c->submit(); // polymorphism

        delete c;
    }
};

// ================= MAIN =================
int main() {
    HostelSystem system;
    system.loadStudents();

    int choice;

    do {
        cout << "\n--- HOSTEL MANAGEMENT ---\n";
        cout << "1. View Student\n";
        cout << "2. Room Details\n";
        cout << "3. Fee Status\n";
        cout << "4. Complaint\n";
        cout << "5. Exit\n";
        cout << "Enter choice: ";
        cin >> choice;

        switch (choice) {
        case 1: {
            string name;
            cout << "Enter Name: ";
            cin >> name;
            system.viewStudent(name);
            break;
        }
        case 2: {
            int id;
            cout << "Enter ID: ";
            cin >> id;
            system.viewRoom(id);
            break;
        }
        case 3: {
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
            cout << "Exiting...\n";
            break;
        default:
            cout << "Invalid choice\n";
        }

    } while (choice != 5);

    return 0;
}