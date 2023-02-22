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
4. [ ] 
5. [ ]  
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