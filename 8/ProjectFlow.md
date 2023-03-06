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
5. [X]  Start building the frontend.
a. Start Working on Public.js page
b. Start Working on DashboardLayout.
6. [X] Redux and RTK Query.
a. Install @reduxjs/toolkit and react-redux
b. Create app\api directory and apiSlice.js file into it.
c. We create the store.js file also, but inside app folder. Pull the apiSlice into our store.
d. Provide also middleware inside of the reducer
e. Bring the store into our project, index.js inside the React.StrictMode
f. Go to features/users directory and create usersApiSlice.js file. First we create usersAdapter using createEntityAdapter to get some normalize state to get ids from entities so we can iterate over them. Then, if initial state exists in the usersAdapter, we call that initial state.
g. we use apiSlice, define usersApiSlice and inject the endpoints into that original apiSlice and that's where we define our endpoints, to begin with, just getUsers query passed in the builder. The query is going to the users endpoint provided as base query Url inside of the apiSlice
h. validate the status as the documentation says, keep in development keepUnusedDataFor:5. Map over the data and set user.id = user._id because is looking for id property and return the user itself after that.
i. We use then the usersadapter and set all to the loadedUsers that has the response data with tue user= user.id property. Normalized data with ids and entities.
j. Checking in case we obtain other result, just return the list instead if we didn't get ids. A fail safe.
k. It is gonna create a hook based on thus endpoint for us automatically. Export this hook. 
l. Create some selectors. selectUsersResult rferring to the endpoints, pass this result to the usersResult function, use the meoized selector in getSelectors down below.
This could be usefull when optimizing our app. Cppy everything and create notesApiSlice.js inside features/notes directory
m. Ctrl f2 to change users by notes instances, can install Multiple cursor case preserve
from vscode extensions.
n. Go to UsersList component, import the hook useGetUsersQuery and destructure the data so we can make some conditional rendering in our component
o. Our error also is error.data.message, if it is success, we destructure our users, map over the ids and show our User component we are about to create.
p. Once User.js component is created, we start our backend server and check the Users List in our app
q. Now, we go with the Notes List and create the Note.js component
7. [X] Forms to CRUD Operations.
a. Go to usersApiSlice, addNewUser, pass initial data, go into the /users endpoint using post request method, force the cache we're using with rtk query and redux to update, the users list will be invalidated so that it can be updated.
b. updateUser, now we pass the id with arg.parameter we passed to invalidatesTags so we now it will nedd to be updated again
c. delete is very similar so destructure the id because we just need the id from the body, delete method used,
d. Export the hooks for CRUD operations to create the forms. Do the same for notesApiSlice.
e. For notes, same logic as users.
f. Create EditUser.js and NewUserForm.js inside features/users
g. Create EditsNot.js and NewNote.js  inside features/notes
h. Go to App.js and create the routes for our forms
i. Create a directory named config/roles.js inside src to export the ROLES we need for several files
j. Go back to new user form component. Import the stuff we need.
k. We can use addNewUser function by calling it from the hook useAddNewUserMutation(). Pull the navigate from useNavigate hook and we also use it when ever we call it. 
l. Declare some pieces of states.
m. UseEffect to help us validate our username and password testing the regex we defined.
n. If it is succesful, it will empty out all individual state.
o. Put the handlers, save the user, and options menu for role, error classes. 
p. return the content. We can display the error class at the top of the form, in roles, set multiple to true.
q. Go to EditUser component. Import useParams because we gonna get that user id parameter out of the url. Also useSelector from redux and select user by id. To select the user data from the state and we get that by selecting the user id.
r. Create the EditUsr.js and the EditUserForm.js components.
s. Run the backend server. Check the users list and click edit button.
t. Open dev tools Redux on /dash/users inside api/internalSubscriptions/subscriptions we got a long string, we go to specific user and page remain loading, there is no subscription now after a few seconds. What is happening? Look for usersApiSlice, get rid og keeUnusedDataFor: 5. And leave it as default.
u. Then, create Prefetch.js inside auth folder, call it in our App.js and wrap the DashLayout with the manual subscription we created. Test the app and the editUserForm is not going away in 5 nor in 60 seconds. We can edit the user, and refresh the page, we can prefetch the component first before and did the subscription.
v. Go th app/store.js setup listeners to use in the users in case several windows opened go to UsersList.js and NotesList.js also
w. Welcome component and add new notes and new users link
x. Work on NewNote.js amd NewNoteForm.js
8. [X] Authentication and Authorisation. 
a. add auth route in server.jsand create the route in routes/authRoutes.js, add the route: '/' post, '/refresh' get and '/logout' post. save the file to create then authController.
b. npm i express-rate-limit and go to middleware folder and crreate loginLimit.js file
c. First, we set the time, max rate limit, then if succeded, message. Then the handler where is coming from and send the status code and message, this module is used specifically in login path.
d. Go back to authRoutes.js and use it as an argument in route '/'.
e. Create authController.js inside controllers folder. Import the bcrypt, jwt and asyncHandler from express.
f. First, npm i jsonwebtoken and go back to authRoutes.js and put the rest of the information from authController.js as follows:
router.route("/").post(loginLimiter, authController.login);
router.route("/refresh").get(authController.refresh);
router.route("/logout").post(authController.logout);
Then, go back to aurhController and complete the code.
g. Access Token => short time, refresh Token=> long time the refresh token can be sent ass httpOnlñy cookie not accesible via JavaScript, must have expiry at some point, REQUIRING THE USER TO LOGIN AGAIN. 
Access Token Process involves:
* Issuing an access token after user authentication
* Users's app can then access our rest api's protected routes with the access token until it expires
* Our rest api will verify the token every time the token is used to make a request
* When the access token does expiry, the user's app need to send the refresh token to our rest api's refresh endpoint to be granted a new access token
Refresh Token Process involves:
* Issued after user auhentication
* Our rest api endpoint will also verify the token.
* If the refresh token is valid, a new access token will be provided to the user's app.
* The refresh token must be allowed to expiry at some point to prevent indefinite access.
h. We need to creater a couple of environment variables ACCESS_TOKEN_SECRET and REFRESH_TOKEN_SECRET, by open the terminal and hit node to create the node prompt inside the terminal and require('crypto').randomBytes(64).toString('hex') enter. This way we get a secret key. Press alt+z to wrap the code in .env. Do the same for refresh token. 
i. authController, 
*first method => login  
*second method=> refresh
*third method=> logout
j. Exports the modules
k. These modules does not protect the others endpoints yet with those tokens, so create a middleware to verify a valid token every time we make a request to a protected endpoint.
l. Create inside middleware folder veryfyJWT.js and apply it to the routes we want to protect.
m. The app.use method could apply to all of the routes in pur app, go to notesRoutes and userRoutes and router.use(verifyJWT).
n. Let's now test the logic, start the server. Ang go to postman to test endpoints
o. Go first to http://localhost:3500/auth endpoint post request, body=> raw, JSON object
p. username and password in the body, if password incorrect, Unauthorized message received. If valid, we receive an accessToken in the response body.
More thant that, press the Cookies tab, no cookie for you but, top right hit Cookies and there is a jwt cookie, we received a secure cookie with a refresh token in it. We get rid of Secure; in the response cause we just need http now, not https and save, cloe the cookie manager.
q. Now go to the auth/refresh endpoint with GET method, hit send, be sure to click on body instead of Cookies in results,  and we get a new access token because our refresh token was valid, if send again, we get a new access token
r. Go to auth/logout POST method and it should delete our cookie, we get cookie cleared in the response as expected, no cookie also in the Cookies manager top right
s. Go and log in once again POST /auth with credentials and send, we receive a new accessToken and we are gonna use that in user or notes routes to that verifyJWT is working
t. Click in Headers before body with the key Authorization and the value Bearer accessToken received. We received all the notes and users from GET methods in their endpoints before the accessToken get expired.
u. We can also automate from our react app with redux next, when the request is forbidden, that's when we need to send the refresh token to get a new accessToken.
