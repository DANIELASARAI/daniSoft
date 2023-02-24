# First Commit
1. [X ] Create User stories. What the customer wants from the app. Create the rest API(As user stories, we need to be able to create, edit and delete notes and users CRUD operations for both, first we run the app, then the authentication and authorisation). 
a. Create the backend folder and install node js in it. npm init -y to avoid the questions. 
b. package.json generated, then we need to install express and nodemon npm i nodemon -D for devDependencies. 
c. Edit the package.json scripts, description of the project.
d. Create the .gitignore file with node_modules
e. Create the server.js file and run the server on 3500 
f. Add path to listen root route public folder
g. Create the public folder and css folder also into it
h. Create style.css file
g. Go back to server.js and require the root.js file, create this file then into routes folder
h. Create then the views folder and index.html file inside with the app title and link to style.css. 
i. Open localhost 3500 to see the index.html displayed
j. Create a 404 page inside of the views folder
k. Create the route in the server for pages not found.
2. [X ] Middleware. 
a. Add on server js the built in middleware for express.json
b. Create the logs folder for the server to log erros, requests and add it to gitignore. 
c. Create the middleware folder.
d. npm install date-fns and uuid
e. Create the logger.js file
f. Go to server js, import logger and use it at the very top, got to the browser, localhost:3500 and see the get request logged in console and the reqLog.log inside our logs folder.
g. Create a new file inside our middlewsare directory errorHandler.js 
h. Go back to server js and import the errorHandler module and use it before the app.listen 
i. npm i cookie-parser for the rest api to be able to parse cookies
j. import in server js  the cookie-parser and use it after express.json
k. To make requests, we need to allow the browser to fetch from our app. You can test it fetch('http://localhost:3500') from devtools console in google. Create first a public API and then, we secure it.
l. npm i cors and import it in server js, use it.
m. Once using cors, fetching out localhost:3500 is no longer rejected but a fulfilled promise.
n. Now we want to secure it, just the origins we want to allow by cors actions. Go and create first a directory config. A file inside allowedOrigins.js with the corresponding allowed url and export the module.
o. Create a corsOptions.js file inside config folder also, apply it in server js also just by passing corsOptions to the app.use(cors(corsOptions))
p. Run the server go to the browser, devtools, fetch the localhost:3500 and we get rejected because we have not allowed google
3. [X ] MongoDB. 
a. Set the envoronment variables. npm i dotenv. First, require it in server.js and then, create the .env file. Testet it by console.log and add it to gitignore file.
b. Go and create a MongoDB account if ain´t created yet. All the way till connect your app.
c. Add mongoose. npm i mongoose.
d. Create a folder models and User.js file in it. Inside UserSchema is where we have the data model, we can check on our User stories to get an idea. Example: 13. users can be Employess, Managers or Admins, User Roles, or 9.  Provide a way to remove user access asap if needed. 
e. Create also the note schema.Refer to the user stories number 10, 11 and 12. We need a reference back to the users. 
f. To help us with the sequential ticket number, we can do taht by installing npm i mongoose-sequence and require it in Note.js
g. In the config folder, we create the file dbConn.js.
h. Go back to server.js. Import connectDB module, mongoose and logEvents.
i. Call the connectDB function, scroll down and listen for the mongoose connection.
j. When running the server got this error: DeprecationWarning: Mongoose: the `strictQuery` option will be switched back to `false` by default in Mongoose 7. Use `mongoose.set('strictQuery', false);` if you want to prepare for this change. Or use `mongoose.set('strictQuery', true);` to suppress this warning. Solved by adding  await mongoose.set("strictQuery", false); inside try catch block on dbConn.js
4. [X ] Controllers. 
a. Go to server.js and use the /users route. Create userRoutes.js route inside routes folder.
const express = require("express");
const router = express.Router();

router.route("/").get().post().patch().delete();// the '/' is the root that matches the users route
module.exports = router;
b. Then, go and create the controllers folder, and userController.js file inside.
c. npm i express-async-handler bcrypt and go back to userController.js file and import both, we need to hash the password before saving it to database, and express-async-handler to avoid using to many try and catch blocks
d. Create the functions and go back to userRoutes.js and import our userController and call it inside each operation with their methods respectively.
e. Now, write the logic inside each module in userController.js. First the getAllUsers, createNewUser, updateUser, deleteUser
f. Now, we use Postman to perfomr operations. got this error: user is not allowed to do action [find] on [test.users] and solved by editing on MongoDB SECURITY, built in roles, write, edit in any database for the user.
g. To create a new user, we go on Postoman, headers key=Content-Type value=application/json then body tab    {
"username": "Lucho",
"password": "15105955",
"roles": ["Employee"]
 }
 Post Method and send
 h. Now we can make a get request to http://localhost:3500/users and verify the user already created.
 i. Now try to create a duplicated user. And send a post request with out a field to see the error. Also trying to send an empty string in roles, {"message":"All fields are required"}
 j. Now we can check to update the user, from "active": true to false.
 k. Now create another user with post request. Try to change its name equal to the other user.
 l. Go ahead with delete a user. User id required on the delete method, then make a get request to check the users.
5. [ ]  Start building the frontend.
a. Create the react-app inside the directpory frontend. npm start on  http://localhost:3000 
b. Take a look for user Stories, we have just working on backend until now, from frontend, we are able to fulfill a couple of them as 2 amd 4, for example. Add a public faciong and welcome page.
c. We can decide first at all, the stage management of the app, file structure and the routing structure before continue on. For business purposes it will allow the app to grow and add features. Apply the redux file structure and react route structure.
d. npm i react-router-dom 
e. On index.js file, remove reportWebVitals and import what we need for react-router-dom
f. Start with BrowserRouter=>Routes=>Route and inside the Route, put the <App /> component. Import it. The specific Route will allow to work with specific Routes
g. In the App.js we can remove the default from create react app inside the return.
h. Create the components folder and inside Layout.js, returning  <Outlet/> to render the children of the outlet component, Layout.js gonna be the parent component. Like Footer for example and other extra features to render on several pages. 
i. Go back to App.js. Defines the Routes with Layout element as a parent. 
j. Create Public.js file inside components folder, we can add some styles from index.css.
k. Nest this Public component inside the Route Layout in App.js. Note tha we put index as value when we go to this route, it`s not showing the Layout because Layout is just redering the children. The default component is Public.
i. Create the Login.js component and add it as a children Route of our Layout.
j. Now, we create the DashLayout.js component. This will be part of the dash after a user logged in. We use react fragment to nest some things inside. <> </> Provide a div with a dash-container our Outlet so the area that is required to log in(protected area) is wrapped to apply different styles and the children as well.
k. Create DashHeader.js and use it in our DashLayout.js. Above the children, every page on the protected part of our site. 
l. Create the DashFooter.js. We won't see it on the Public page, but once we make it to the dash part of the page, the protected part, we'll see the header and the footer as well. 
m. npm i fortawesome/fontawesome-svg-core fortawesome/free-solid-svg-icons fortawesome/react-fontawesome
n. Create the DashFooter.js
o. Import the DashFooter.js inside the fragment in DashLayout.js at the end. Then, import in App.js our DashLayout.js and use it as a Route. Not protected yet. 
p. Create features folder/auth in src. Move Login.js into auth folder just created.
q. Create a Welcome.js page. Import it on App.js and inside our DashLayout as index for the Route to look for this indexif we just go to the dash.
r. Create notes and users directory inside of features folder also. NotesList.js and UsersList.js components inside respectively.
6. [ ] 
7. [ ] 
8. [ ]
9. [ ]
10. [ ]
11. [ ]
12. [ ] 
13. [ ]
14. [ ] 
15. [ ] 
16. [ ] 
17. [ ] 
18. [ ] 
19. [ ] 
20. [ ]