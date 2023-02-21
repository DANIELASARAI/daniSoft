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
3. [ ] 
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