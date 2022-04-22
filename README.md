# TOPIC: Authentication

## Authentication with JWT
- Token generation
- Token verification

## Assignment
- For this assignment you have to create a new branch - assignment/auth-
- Your user document should look like this
```
 	{
    "_id" : ObjectId("6226e3d2b98f22b349ca58be"),
    "firstName" : "Sabiha",
    "lastName" : "Khan",
    "mobile" : "9898909087",
    "emailId" : "sk@gmail.com",
    "password" : "password123",
    "gender" : "female",
	"isDeleted": false, //default value is false 
    "age" : 12,
    "createdAt" : ISODate("2022-03-08T05:04:18.737Z"),
    "updatedAt" : ISODate("2022-03-08T05:04:18.737Z"),
    "__v" : 0
}
```

 	{
    
    "firstName" : "arun",
    "lastName" : "sharma",
    "mobile" : "8708996615",
    "emailId" : "arunsharma@gmail.com",
    "password" : "password666",
    "gender" : "male",
	"isDeleted": false,  
    "age" : 23

}

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjYyOWU2OWQzMjBlMmU5NDdjNGQ5ZDciLCJiYXRjaCI6InRob3JpdW0iLCJvcmdhbmlzYXRpb24iOiJGVW5jdGlvblVwIiwiaWF0IjoxNjUwNjMwNDMyfQ.tfQvorK9vNtmyzS9z27k1ExiXGLXwGFor5Ebhyc9z_I


 	{
    
    "firstName" : "mitesh",
    "lastName" : "chawdhary",
    "mobile" : "8708999915",
    "emailId" : "shrimiteshchaudhary@gmail.com",
    "password" : "password586",
    "gender" : "male",
	"isDeleted": false,  
    "age" : 21

}

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjYyNzU5Y2QzMjBlMmU5NDdjNGQ5ZDUiLCJiYXRjaCI6InRob3JpdW0iLCJvcmdhbmlzYXRpb24iOiJGVW5jdGlvblVwIiwiaWF0IjoxNjUwNjMwMzc4fQ.xjhdwKoNt5ijnKALz78KYhU1EPYObasKPFwvYt8qbv0


- Write a **POST api /users** to register a user from the user details in request body. 
- Write a ***POST api /login** to login a user that takes user details - email and password from the request body. If the credentials don't match with any user's data return a suitable error.
On successful login, generate a JWT token and return it in response body.
- Write a **GET api /users/:userId** to fetch user details. Pass the userId as path param in the url. Check that request must contain **x-auth-token** header. If absent, return a suitable error.
If present, check that the token is valid.
- Write a **PUT api /users/:userId** to update user details. Pass the userId as path param in the url and update the attributes received in the request body. Check that request must contain **x-auth-token** header. If absent, return a suitable error.
- Write a **DELETE api /users/:userId** that takes the userId in the path params and marks the isDeleted attribute for a user as true. Check that request must contain **x-auth-token** header. If absent, return a suitable error.
- Once, all the apis are working fine, move the authentication related code in a middleware called auth.js
- Add this middleware at route level in the routes where applicable.



