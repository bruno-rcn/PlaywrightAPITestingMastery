Day 1 - *Module 1: Introduction*:
At the first day on the course, the activities has done were:
- Created the repository on GitHub;
- Created the default Playwright project;
- Finished with the information showed:
    a. site used: https://conduit.bondaracademy.com/;
    b. Environment Configuration

Day 2 - *Module 2: API Testing Basics*:
- What is API?
    - API means: Application Programming Interface
    - Its about the communication between the client and the server:
        [courseSchema\imgs\how api works.png]
    - We have URL (Uniform Resource Locator) and URI (Uniform Resource Identifier) are the same thing and both are correctly
        [courseSchema\imgs\api url components.png]
    - API requests methods (CRUD):
        POST    -> *C*reate a new record
        GET     -> *R*ead the existing record
        PUT     -> *U*pdate the existing record
        DELETE  -> *D*elete the existing record
    - HTTP response status:
        200 -> Success
        300 -> Redirect
        400 -> Something wrong with the request made by the user
        500 -> Something wrong with the request at the server

- Exploring API using Postman
    - Go to the site
    - Open Development tool (right click on mouse - inspect optin)
    - Go to Network page
    - Click on Fetch/XHR
    - Now you can see the endpoints [courseSchema\imgs\endpoints.png]
    - To get the payload click on View source [courseSchema\imgs\payload.png]
    - To get the authorization: Go to Headers page - Request Headers - Authorization [courseSchema\imgs\autho.png]
        - use this on postman (copy the entiry token): [courseSchema\imgs\postman.png]
        - body of the request: [courseSchema\imgs\body request.png]