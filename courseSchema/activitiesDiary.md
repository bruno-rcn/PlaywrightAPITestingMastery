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


Day 3:
- Start tests using playwright;
- We need to use the keyword "await" always we use a promisse in javascript: this will return the value if will be ok or will be reject if something is wrong
- Tests for API we use ({request}) fixture from playwright instead use ({page})


Day 4:
- Work with authorization endpoint
- Create a new article POST and validated the article GET


Day 5:
- Create a Delete and Put requests
- Work with hooks


Day 6:
- APIs requests basicaly has 5 componets: URL, Path, Headers, Parameters and Body
- Create folder utils to put all helpers components: create a function to each component from API request
- Created the smokeTest file to demonstrate how to use this methods


Day 7:
- Start to work with fixtures (file created in utils)
- Test fixtures is a function works as a pre condition or teardown for your test (like before and after hooks)
- After that we will import test from this file not from playwright
- Create a fixture - import this fixtures into the playwright tests instead tests from playwright


Day 8:
- Create a method to build a url: private getUrl()
- Create a method to build the request fixture using the constructor into the RequestHandler
    - 1 - we have the class RequestHandler to create our method to build the url and the requets
    - 2 - then we have the class fixtures to import RequestHandler and created a method api to use the methods from RequestHandler and create our tests
    - 3 - use the api instead request at the parameter on the test to use this methods from RequestHandler - like async({api})


Day 9:
- Create Post, Put and Delete requester methods on RequestHandler
- Use this methods into the tests
- Logger.ts will bringing us the logs details about the request and responses
- Created the file custom-expect.ts to update the expect from a request
- Created the file api-test-config to be responsible to have the information values for the tests than you can use on into the tests [test('', async({api, config}))]
- Into the helpers folder we have the data are repetitives and pre conditions


Day 10:
- Setting up anAutomatic Authorization token
- Update the config file from playwright