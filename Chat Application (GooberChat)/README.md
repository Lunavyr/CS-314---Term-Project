Frank Claverie</br>
Corlin Fardal

# GooberChat
CS 314 Spring 2024 Term Project.
## User guide:



### Installation
* Clone Repository to local system (use the 'Code' tab in the root directory). 
* Change "MONGO_URI" variable in the ".env" file located in the "/Chat Appliction (GooberChat)" directory to a database with which your IP is associated.
* (*Optional): Change "PORT" and "JWT_KEY" to different values per your own preference.



### Use
Backend:
* While your terminal is currently in "~/Chat Application (GooberChat)" - run "npm start"

Frontend:
* Change to the Frontend directory (cd Frontend) - run "npm start"
* (*Note): this process didn't work on our usage on a windows 11 machine until after running "npm audit fix --force" twice, then retrying. 
  
System:
* Upon successful start of the front, a tab in your web browser should open. If not then simply go to "localhost:${PORT}/" where PORT is your selected port.
* The application should now be up and running. Use to your hearts content!

<br><br>Deployment:
* We have also been unsuccessful in our attempts at full deployment via the website integration of this github page using Heroku (PaaS). CLI deployment might be possible while inside the "Chat Application (GooberChat)" folder. 


  
## Product Description:
*High level overview

### Backend overview:

### Frontend overview:
The front end has a front page used to login or register a new user, and a chat page where you can manage the single and group chats you're in. Group chats can be edited by admins to change the chat's name and members, and any chat can be deleted by an admin. Chats are sent synchronously and send notifications if the recipient isn't in the corresponding chat.


## Test overview:
### Backend:
* We have not currently implemented any automated testing using any frameworks. However, the backend has been fully tested in Postman.
* All API paths have been tested and verified for both valid and invalid data (if required).

### Frontend:
* We have not implemented any automated testing. However, the frontend has been fully tested manually.
* All front-end features have been tested and verified for valid and invalid input.


## Thoughts:
