# AP2-ass2 By Ori Arad, Tal Gelerman and Itamar Cohen

In this assigment we converted our react project to work on node.js. we created a server side that helps to transfer data and information between the clinets
by using socket.By using that method clinet's chat page is being updated in real time. by using the sockets we were able to let the clinet recive messages and 
be added to new chat at the moment it happens.
In the server side that handdles the clinet's requests we used the MVC method in order to keep the functionalty of the code.

### HOW TO RUN:

```
git clone https://github.com/cohenitamar/AP2-ass2
```
Now you will have the cloned directory and you will be able to run both of the parts.

In order to run the ReactJS that will work with the Swagger you will have to open
your cmd or a terminal and do the following from the **cloned directory**:
```
cd ReactJS
npm i
npm start
go to your browser and enter the following URL: http://localhost:3000

NOTE: Don't forget to run the Swagger server, otherwise the project won't work!
```

In order to run the ReactJS project (the build) that will run with the NodeJS server that we wrote you will have to open
your CMD or a terminal and do the following from the **cloned directory**:
```
cd NodeJS
npm i
node app.js

go to your browser and enter the following URL: http://localhost:5000
```


### About The React From Previous Assignment

Our project include three main folders one for each page. In this project we split our html pages into little components that each one of them is incharge of different logics and sasific details of the page.

A. ChatComponent

B. RegistrationComponent

C. LoginComponent

--NOTE THAT THE BACKGROUND (shared_background.png) THAT IS BEING USED BY ALL THE SCREENS IS IN THE MAIN FOLDER--


**LOGIN**

The first screen that user interacts with. In this screen, the user is able to login the website systen by entering his unique username and password.
The login page contains different features that will help the user in different cases:
*"create a user" for cases that the user in not registered yet. After clicking this button, the registration page will be opened.
* for a person who is trying to login to the page the login checks if the username and the password are related to a member of the website if he is,
  he can enter to the chat room. else the login page would tell the client the his password is invalid or this username is not exsit in the list of the     subscribes of the website.
* a person can't remote to the chat page without login with a valid account.

<br>

**REGISTRATION**

the user will interact with the screen in case he is not registered and he clicked the "create a user" button in the login page.
In this screen, the user is asked to fill different fields, such as : First name, Last name, Username and more.
The registration page also includes double check for password for the user's security.
When clicking the "sign up" button, the user will be officially registered and will be join to the website's users community. Therefore, will be able to log in the system with his nickname and password in the login page.
* Username is uniqe so if a new member wants to choose a username that is already taken the register validation won't let him create an the account. 
* In our website the new member password should contain: 
    - Password must contain 8 characters minimum.
    - Password must contain at least one capital letter.
    - Password must contain at least one lower letter.
    - Password must contain at least one number.
    - Username must be at least 3 character long.
    - Profile picture has to be a picture format (if the user doesn't upload a picture our website provides a default picture).
* If a password doesn't match the requirements above, the page won't let to create a the user and the confirm password box's border color will be changed to red.
* If the password and the confirm password is not equal the page won't let to create a the user.
* The first name and last name will be showed as the display name in the chat page.

<br>

**CHAT PAGE**

A registered user will interact with this screen after entering his correct username ans password in the login screen.
In this screen the user will be able to find on the left his other users' name that he chatted with recently, his profile picture and his username. 
 By clicking on one of the users' names, their chat history will be opened on the right side of the screen, where they can chat with no limit.
When sending a message to a user, the most recent message and its time will be shown under the contact's name.
In addition, on the left side the user can find the button for starting a chat with a new user, and a logout button as well.
By clicking the new contact button, the user will be requested to insert the user's name, and by clicking "add" the user will be added the contacts list. You cannot add the same contact twice.
By clicking the logout button, the user will be moved back to the login page.


**Notes**
* User can't create chat with himself.
* In case the user tries to get to the chat without login (by using the search bar) the website will sent the user to the login page and all the new users   will be deleted.
* We can create more then one chat with the same user. 
* If the user tries the upload a file that is not recognized as image format our website will provide the user a default picture.
* The login page is the home-page of the website
* You can enter the register page also by  typing "http//localhost:5000/register" but all the users the being created will be deleted.
