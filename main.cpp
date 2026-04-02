#include <iostream>
#include <fstream>
#include <sstream>
using namespace std;

// -------- VIEW STUDENT --------
void viewStudent(string searchName) {
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

        if (name == searchName) {
            cout << "\nName: " << name
                 << "\nScholar ID: " << id
                 << "\nBranch: " << branch
                 << "\nEmail: " << email
                 << "\nContact: " << contact
                 << "\nHostel: " << hostel
                 << "\nRoom: " << room
                 << "\nFee Status: " << fee << endl;
            return;
        }
    }

    cout << "Student not found\n";
}

// -------- ROOMMATES --------
void showRoommates(string roomNo) {
    ifstream file("roomDetails.csv");
    string line;

    if (!file) {
        cout << "Error opening roomDetails.csv\n";
        return;
    }

    getline(file, line); // skip header

    while (getline(file, line)) {
        stringstream ss(line);
        string room, s1, s2, s3;

        getline(ss, room, ',');
        getline(ss, s1, ',');
        getline(ss, s2, ',');
        getline(ss, s3, ',');

        if (stoi(room) == stoi(roomNo)) {

            cout << "\nRoommates Details:\n";

            // function to print details of one student
            auto printDetails = [](string studentName) {
                ifstream f("students.csv");
                string l;

                getline(f, l); // skip header

                while (getline(f, l)) {
                    stringstream ss2(l);
                    string name, id, branch, email, contact, hostel, room, fee;

                    getline(ss2, name, ',');
                    getline(ss2, id, ',');
                    getline(ss2, branch, ',');
                    getline(ss2, email, ',');
                    getline(ss2, contact, ',');
                    getline(ss2, hostel, ',');
                    getline(ss2, room, ',');
                    getline(ss2, fee, ',');

                    if (name == studentName) {
                        cout << "Name: " << name
                             << " | Branch: " << branch
                             << " | Contact: " << contact << endl;
                        return;
                    }
                }
            };

            // 🔥 print all 3 roommates
            printDetails(s1);
            printDetails(s2);
            printDetails(s3);

            return;
        }
    }

    cout << "Room not found\n";
}

// -------- VIEW ROOM DETAILS --------
void viewRoomDetails(int searchID) {
    ifstream file("students.csv");
    string line, roomNo = "";

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

        if (stoi(id) == searchID) {
            roomNo = room;
            cout << "\nRoom No: " << roomNo << endl;
            break;
        }
    }

    if (roomNo == "") {
        cout << "Student not found\n";
        return;
    }

    showRoommates(roomNo);
}

// -------- FEE STATUS (FROM students.csv ONLY) --------
void showFeeStatus(int searchID) {
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

        if (stoi(id) == searchID) {
            cout << "\nFee Status: " << fee << endl;
            return;
        }
    }

    cout << "Student not found\n";
}

// -------- COMPLAINT --------
void complaints() {
    int ch;
    cout << "\n--- Complaint Types ---\n";
    cout << "1. Electricity\n";
    cout << "2. Food\n";
    cout << "3. Hygiene\n";
    cout << "4. Water\n";
    cout << "5. Washing Machine\n";
    cout << "Enter choice: ";
    cin >> ch;

    switch (ch) {

    case 1: {  // 🔥 Electricity sub-menu
        int sub;
        cout << "\n--- Electricity Issues ---\n";
        cout << "1. LAN Issue\n";
        cout << "2. Light Issue\n";
        cout << "3. Fan Issue\n";
        cout << "Enter choice: ";
        cin >> sub;

        switch (sub) {
        case 1:
            cout << "Open Google Form (LAN): https://forms.gle/lan-form-link\n";
            break;
        case 2:
            cout << "Open Google Form (Light): https://forms.gle/light-form-link\n";
            break;
        case 3:
            cout << "Open Google Form (Fan): https://forms.gle/fan-form-link\n";
            break;
        default:
            cout << "Invalid choice\n";
        }
        break;
    }

    case 2:
        cout << "Open Google Form (Food): https://forms.gle/food-form-link\n";
        break;

    case 3: {
        int floor;
        cout << "Enter Floor: ";
        cin >> floor;
        cout << "Cleaning Staff Contact for Floor " << floor << ": 9876543210\n";
        break;
    }

    case 4:
        cout << "Open Google Form (Water): https://forms.gle/water-form-link\n";
        break;

    case 5:
        cout << "Open Google Form (Washing Machine): https://forms.gle/wm-form-link\n";
        break;

    default:
        cout << "Invalid choice\n";
    }
}

// -------- MAIN --------
int main() {
    int choice;

    do {
        cout << "\n--- HOSTEL MANAGEMENT SYSTEM ---\n";
        cout << "1. View Student\n";
        cout << "2. View Room Details\n";
        cout << "3. Fee Status\n";
        cout << "4. Complaint Section\n";
        cout << "5. Exit\n";
        cout << "Enter choice: ";
        cin >> choice;

        switch (choice) {

        case 1: {
            string name;
            cout << "Enter Name: ";
            cin >> name;
            viewStudent(name);
            break;
        }

        case 2: {
            int id;
            cout << "Enter Scholar ID: ";
            cin >> id;
            viewRoomDetails(id);
            break;
        }

        case 3: {
            int id;
            cout << "Enter Student ID: ";
            cin >> id;
            showFeeStatus(id);
            break;
        }

        case 4:
            complaints();
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