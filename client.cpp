#include <iostream>
#include <thread>
#include <string>
#include <cstring>
#include <ctime>
#include <stdlib.h>
#include <sys/socket.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <math.h>

using namespace std;

bool thrd_flag = 0, lgn_flag = 0;
int socket_fd = 0, p2p_fd;
struct sockaddr_in addr, p2p_addr;
string message, log_name;

int get_port(bool ipt, char in_port[]);
int get_price();
bool get_List();
void logout();
void quit();
void server_conn();
void p2p_thread(int port);
bool p2p_send(string p2p_name, int price);
bool server_send(string tmp);
bool server_recv();
bool name_chk(string);

signed main(int argc, char *argv[]) {
    srand(time(NULL));
    int ser_port = 0, List_port = 0;
    int str1, str2, str3, tmp_price;
    thread p2p_thd;
    bool flag;
    string input, stmp;
    if(argc == 3)
        input = argv[1];
    else{
        cout << "Please input your server's ip\n>";
        cin >> input;
    }
    while(inet_pton(PF_INET, input.c_str(), &addr.sin_addr) <= 0){
        cout << "Invalid IP, please input a valid ip\n>";
        cin >> input;
    }
    if(argc == 3)
        ser_port = get_port(1, argv[2]);
    else{
        cout << "Please input your server's port\n>";
        ser_port = get_port(0, "");
    }
    addr.sin_port = htons(ser_port);
    server_conn();
    //menu
    char sel; int tmp;
    do{
        flag = 0;
        cout << "Welcome!  ";
        if(lgn_flag)
            cout << log_name << endl;
        else
            cout << endl;
        cout << "\nPlease input number to select the menu\n--------\n";
        cout << "1. Register\n";
        if(lgn_flag){
            cout << "2. List\n";
            cout << "3. Transfer\n";
            cout << "4. Log out\n";
            cout << "5. Exit\n>";
        }
        else{
            cout << "2. Login\n";
            cout << "3. Exit\n>";
        }
        cin >> sel;
        if(lgn_flag){
            switch (sel){
                case '1':
                    cout << "Please input your name.: ";
                    while(cin >> input){
                        if(name_chk(input))
                            break;
                        cout << "Please input a valid name(not using preserving word and only have number, alphabet, and _): ";
                    }
                    cout << "Awaiting for server response...\n";
                    if(server_send("REGISTER#" + input)){
                        if(server_recv()){
                            if(message.find("100") != string::npos)
                                cout << "Register successfully!\n";
                            else if(message.find("210") != string::npos)
                                cout << "Register failed\n";
                        }
                        else{
                            cout << "Server error!\n";
                            flag = 1;
                        }
                    }
                    else{
                        cout << "Server error!\n";
                        flag = 1;
                    }
                    break;
                case '2':
                    flag = get_List();
                    break;
                case '3':
                    cout << "Please input the user you want to transfer with.: ";
                    while(cin >> input){
                        if(name_chk(input))
                            break;
                        cout << "Please input a valid name(not using preserving word and only have number, alphabet, and _): ";
                    }
                    if(server_send("List")){
                        if(server_recv()){
                            stmp = message;
                            str1 = stmp.find(input + "#");
                            if(str1 == string::npos){
                                cout << "Can't find this user!\n";
                                break;
                            }
                            else{
                                str1 += (input.length() + 1);
                                str2 = stmp.find("#", str1);
                                str3 = stmp.find('\n', str2+1);
                                if(inet_pton(PF_INET, stmp.substr(str1, (str2 - str1)).c_str(), &p2p_addr.sin_addr) <= 0){
                                    cout << "Something wrong with this user's ip\n";
                                    cout << stmp.substr(24, (str2 - str1)) << endl;
                                    break;
                                }
                                p2p_addr.sin_port = htons(atoi(stmp.substr(str2+1, str3).c_str()));
                            }
                        }
                        else{
                            cout << "Server error!\n";
                            flag = 1;
                        }
                    }
                    else{
                        cout << "Server error!\n";
                        flag = 1;
                    }
                    cout << "How much money you want to transfer: ";
                    tmp_price = get_price();
                    cout << "Auto Renew List Before Transfer.\n---------------------\n";
                    get_List();
                    cout << "---------------------\n";
                    if(!p2p_send(input, tmp_price))
                        cout << "failed\n";
                    cout << "Auto Renew List After Transfer.\n---------------------\n";
                    get_List();
                    cout << "---------------------\n";
                    break;
                case '4':
                    logout();
                    break;
                case '5':
                    quit();
                    break;
                default:
                    cout << "Please input a number between 1 and 5: ";
                    continue;
            }
        }
        else{
            switch (sel){
                case '1':
                    cout << "Please input your name.: ";
                    while(cin >> input){
                        if(name_chk(input))
                            break;
                        cout << "Please input a valid name(not using preserving word and only have number, alphabet, and _): ";
                    }
                    cout << "Awaiting for server response...\n";
                    if(server_send("REGISTER#" + input)){
                        if(server_recv()){
                            if(message.find("100") != string::npos)
                                cout << "Register successfully!\n";
                            else if(message.find("210") != string::npos)
                                cout << "Register failed\n";
                        }
                        else{
                            cout << "Server error!\n";
                            flag = 1;
                        }
                    }
                    else{
                        cout << "Server error!\n";
                        flag = 1;
                    }
                    break;
                case '2':
                    cout << "Please input your login name.: ";
                    while(cin >> input){
                        if(name_chk(input))
                            break;
                        cout << "Please input a valid name(not using preserving word and only have number, alphabet, and _): ";
                    }
                    cout << "Awaiting for server response...\n";
                    do{
                        List_port = (rand() % 50000) + 15000;
                    }while(List_port == ser_port);
                    if(server_send(input + "#" + to_string(List_port))){
                        while(1){
                            if(server_recv()){
                                if(message.find(input + "#") != string::npos){
                                    log_name = input;
                                    p2p_thd = thread(p2p_thread, List_port);
                                    p2p_thd.detach();
                                    while(!lgn_flag)
                                        sleep(0.05);
                                    break;
                                }
                                else if(message.find("220") != string::npos){
                                    cout << "This user is not registered\n";
                                    break;
                                }
                            }
                            else{
                                cout << "Server error!\n";
                                break;
                                flag = 1;
                            }
                        }
                    }
                    else{
                        cout << "Server error!\n";
                        flag = 1;
                    }
                    break;
                case '3':
                    quit();
                    break;
                default:
                    cout << "Please input a number between 1 and 3: ";
                    continue;
            }
        }
        if(flag) break;
        cout << "\n\n\n";
    }while(1);
    close(socket_fd);
    return 0;
}

void logout(){
    if(server_send("Exit")){
        if(server_recv()){
            cout << "Logout!\n";
            lgn_flag = 0;
        }
        else{
            cout << "Server error!\n";
            close(socket_fd);
            exit(-1);
        }
    }
    else{
        cout << "Server error!\n";
        close(socket_fd);
        exit(-1);
    }
    close(socket_fd);
    server_conn(); 
}

void quit(){
    if(server_send("Exit")){
        if(server_recv())
            cout << "Exit!\n";
        else
            cout << "Server error!\n";
    }
    else
        cout << "Server error!\n";
    close(socket_fd);
    exit(0);
}

int get_price(){
    bool flag = 0;
    string input; int input_price;
    while(1){
        flag = 0;
        cin >> input;
        for(int i = 0;i < input.length();i++){
            if(!isdigit(input[i])){
                cout << "Invalid price, please input a positive number: ";
                flag = 1;
                break;
            }
        }
        if(flag) continue;
        input_price = atoi(input.c_str());
        if(input_price <= 0){
            cout << "Invalid price, please input a positive number: ";
            continue;
        }
        break;
    }
    return input_price;
}

int get_port(bool ipt, char in_port[]){
    bool flag = 0;
    string input; int input_port;
    while(1){
        flag = 0;
        if(ipt)
            input = in_port;
        else
            cin >> input;
        for(int i = 0;i < input.length();i++){
            if(!isdigit(input[i])){
                cout << "Invalid port, please input a number between 1 and 65536: ";
                flag = 1;
                break;
            }
        }
        if(flag) continue;
        input_port = atoi(input.c_str());
        if(input_port <= 0 || input_port > 65536){
            cout << "Invalid port, please input a port between 1 and 65535: ";
            continue;
        }
        break;
    }
    return input_port;
}

bool get_List(){
    if(server_send("List")){
        if(server_recv()){
            if(message.find("Please login first") != string::npos){
                lgn_flag = 0;
                cout << "You have been logged out!\n";
            }
            else
                cout << message << endl;
        }
        else{
            cout << "Server error!\n";
            return 1;
        }
    }
    else{
        cout << "Server error!\n";
        return 1;
    }
    return 0;
}

void server_conn(){
    //setting IPv4
    addr.sin_family = PF_INET;
    //establish client socket
    if ((socket_fd = socket(PF_INET, SOCK_STREAM, 0)) == 0) {
        cerr << "Socket creation failed";
        exit(-1);
    }
    //connect to the server
    if (connect(socket_fd, (struct sockaddr *)&addr, sizeof(addr)) < 0) {
        cerr << "Connect failed";
        close(socket_fd);
        exit(-1);
    }
    cout << "Connected to the server!" << endl;
    return;
}

void p2p_thread(int port){
    int i1, i2, i3;
    thrd_flag = 1;
    char buffer[1000];
    string mess;
    struct sockaddr_in address;
    int valRead, server_fd = 0, new_socket = 0, addrlen = sizeof(address);
    if ((server_fd = socket(PF_INET, SOCK_STREAM, 0)) == 0) {
        cerr << "Listen socket creation failed\n";
        thrd_flag = 0;
        lgn_flag = 0;
        return;
    }

    address.sin_family = PF_INET;
    address.sin_addr.s_addr = INADDR_ANY;
    address.sin_port = htons(port);

    if (bind(server_fd, (struct sockaddr *)&address, sizeof(address)) < 0) {
        close(server_fd);
        thrd_flag = 0;
        lgn_flag = 0;
        return;
    }

    if (listen(server_fd, 3) < 0) {
        close(server_fd);
        thrd_flag = 0;
        lgn_flag = 0;
        return;
    }
    
    cout << "Login successfully!\n";
    lgn_flag = 1;

    
    while(1){
        if ((new_socket = accept(server_fd, (struct sockaddr *)&address, (socklen_t*)&addrlen)) < 0) {
            cerr << "Accept failed\n";
            close(server_fd);
            thrd_flag = 0;
            lgn_flag = 0;
            return;
        }

        valRead = read(new_socket, buffer, 1000);

        mess.clear();
        buffer[valRead] = '\0';
        mess = buffer;
        i1 = mess.find("#") + 1;
        i2 = mess.find("#", i1);
        cout << mess.substr(0, i1-1) << " wants to transfer you $" << mess.substr(i1,i2-i1) << endl;
        if(send(socket_fd, buffer, strlen(buffer), 0) < 0){
            cout << "Server failed\n";
            lgn_flag = 0;
            return;
        }
        close(new_socket);
    }
}

bool p2p_send(string p2p_name, int price){
    //setting IPv4
    p2p_addr.sin_family = PF_INET;
    //establish client socket
    if ((p2p_fd = socket(PF_INET, SOCK_STREAM, 0)) == 0) {
        cerr << "p2p socket creation failed";
        return 0;
    }
    //connect to the server
    if (connect(p2p_fd, (struct sockaddr *)&p2p_addr, sizeof(p2p_addr)) < 0) {
        cerr << "p2p connect failed";
        close(p2p_fd);
        return 0;
    }
    string snd = log_name + "#" + to_string(price) + "#" + p2p_name;
    if(send(p2p_fd, snd.c_str(), snd.length(), 0) < 0)
        return 0;
    cout << "Transferring...\n";
    if(server_recv()){
        cout << message << endl;
    }
    else{
        cout << "Server error!\n";
        return 0;
    }
    return 1;
}

bool server_send(string tmp){
    char buffer[1000] = {};
    strcpy(buffer, tmp.c_str());
    if(send(socket_fd, buffer, strlen(buffer), 0) < 0)
        return 0;
    return 1;
}

bool server_recv(){
    char buff[1000] = {};
    message.clear();
    size_t message_size = 0;
    if((message_size = read(socket_fd, buff, 1000)) < 0)
        return 0;
    buff[message_size] = '\0';
    message = buff;
    return 1;
}

bool name_chk(string tmp){
    for(int i = 0;i < tmp.length();i++){
        if(!isalpha(tmp[i]) && !isdigit(tmp[i]) && tmp[i] != '_')
            return 0;
        tmp[i] = tolower(tmp[i]);
    }
    if(tmp == "register" || tmp == "login" || tmp == "list" || tmp == "exit")
        return 0;
    
    return 1;
}
