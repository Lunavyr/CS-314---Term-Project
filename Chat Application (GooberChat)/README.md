Frank Claverie</br>
Corlin Fardal

# GooberChat
CS 314 Spring 2024 Term Project.
## User guide:



### Installation:
* Clone Repository to local system (use the 'Code' tab in the root directory). 
* Change `MONGO_URI` variable in the `.env` file located in the `/Chat Appliction (GooberChat)` directory to a database with which your IP is associated.
* (Optional): Change `PORT` and `JWT_KEY` to different values per your own preference.



### Use:
Backend:
* While your terminal is currently in `~/Chat Application (GooberChat)` - run `npm start`

Frontend:
* Change to the Frontend directory (cd Frontend) - run `npm start`
* (*Note): this process didn't work on our usage on a windows 11 machine until after running `npm audit fix --force` twice, then retrying. 
  
System:
* Upon successful start of the front, a tab in your web browser should open. If not then simply go to `localhost:${PORT}/` where PORT is your selected port.
* The application should now be up and running. Use to your hearts content!

Deployment:
* We have also been unsuccessful in our attempts at full deployment via the website integration of this github page using Heroku (PaaS). CLI deployment might be possible while inside the `Chat Application (GooberChat)` folder. 


  
## Product Description:
Goober Chat is interactive and dynamic live chatting web application. It allows for users to register an account, find other users, and chat with them either individually or in groups. The application was build with security and ease of use in mind.

### Backend overview:
The backend of gooberchat was developed using Node.js, the express.js framework, mongodb, and the socket.io library among other tools. These allowed for quick development of APIs which interfaced with mongodb and socket.io to provide live, quick, and abstract usage - which in turn simplified the process of making the frontend and establishing modularity. 

On the launch, the server connects to the database we created with mongodb, establishes a few api routes and error handlers, creates a listening server, and defines a socket.io protocol for updating chat rooms with new messages. The APIs that are defined by this server are as follows: 
* register a new user.
* log in with passed in credentials.
* find users on the database (used in creating chats).
* create a new chat with a specified user.
* create a group chat with a given name and at least 3 members.
* add a new user to an existing group chat.
* rename a group chat.
* delete a chat.
* send a message in a specified chat or group.
* and retrieve all messages for a given chat to display the chat's history.

Each of the APIs that return information associated with a particular user requires a JWT, which is returned upon account creation or successful login. In this way we ensured that personal information to a user cannot be accessed by abusing URI pathways. Additionally, each password was encrypted using the salted bcrypt algorithm and only stores the hash on the server. This helps ensure that user information is as secure as possible in the unlikely event of a data breach. It also ensures that any prying eyes that might have legitimate access to the database will not be able to easily skim user credentials - though for a project of this scope, this is certainly a non-issue. 

The way the database interfaces with user information is encapuslated in our object models using mongoose schemas. We have models for users, chats, and messages. The user schema contains information about their name, email address, and a hash of their password. Chats are defined with chat name, group chat status, users, and an admin. Both single and group chats are stored this way, but the single chats omit group name and supply false for group chat status. The chat admin is the presently the only user authorized to delete chats; however, users can still leave chats should they desire. The message schema encodes the sender, message, timestamp, as well as the chat to which it belongs. 

Regarding possible usage errors - every API has code to verify the existence, proper type, and in some cases specific format of necessary input. It also features exception handling for the server itself incase some function or database call fails; returing the diagnostic information to the terminal running the server. Additionally, the server itself has an error handler for invalid API URIs. 

### Frontend overview:
The front end has a front page used to login or register a new user, and a chat page where you can manage the single and group chats you're in. Group chats can be edited by admins to change the chat's name and members, and any chat can be deleted by an admin. Chats are sent synchronously and send notifications if the recipient isn't in the corresponding chat.



## Test overview:
### Backend:
* We have not currently implemented any automated testing using any frameworks. However, the backend has been fully tested in Postman with verification of data existence and validity in the database.
* All API paths have been tested and verified for both valid and invalid data (if required).

### Frontend:
* We have not implemented any automated testing. However, the frontend has been fully tested manually.
* All front-end features have been tested and verified for valid and invalid input.



## Thoughts:

### Claverie:
This project was pretty rough, I feel, for both of us. Yet, despite the struggle of learning an entire new language and several framework, we certainly learned a lot! 

Besides that, I feel the biggest struggle we had was implementing what we were taught in lectures - specifically in terms of adhereing to a specific sprint cycle schedule. Though the meetings we had each week after lectures did allow us the opportunity to speak on what we were planning on doing towards the project at regular intervals. Strangely enough though, distributing the workload between frontend and backend proved to annul this lack of precise scheduling.

Speaking to the backend - I am personally satisfied with the functionality and performance of the server overall. It functions quite well as a first attempt at full stack web development and completely and securely satisfies the requied features of this project. Yet, in retrospect and considering everything I have learned since starting this project, there are many places where I can see room for improvement. 

Firstly, while we were working on integrating the whole system - it was apparent that many of the elements were not dynamic in the way that live chatting is. If I were to continue improving upon this project, I would certainly like to expand the socket protocols. Additionally, it would be fun to overhaul the permission system to allow for the original admin to exchange ownership or elevate other users in the chat. Though considering that the only moderation possible is deletion or removal, this extended funcitonality doesn't prove to be critical. Another thing I would like to add would be a second option to enable other login methods, such as google oauth. Likewise, I would overhaul the encryption protocol we used - evidently bcrypt is not as strong as it once was, and so a better encryption method, such as yescrypt could help add security. 

Overall though, I have quite enjoyed the challenge that this project presented, and it was wonderful getting an emulated look at what industry standard proceedures for system development is like.
