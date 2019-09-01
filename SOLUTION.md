
# A. Bugs Fixed
Code had errors like missing syntax , some lines of code were removed. These all bugs were fixed and application can run successfully.

For example -
  
  1. index.js -  app variable was not defined before using.  
     const app = express(); - this line was missing
  
  2. mongodb connection was not defined. To fix this, db.js file created for handling db connection and  imported in index.js file to create database
  connection when application starts.
  
  3. EventController file line no 25 had a syntax bug which is fixed to access mongodb with different parameters.
     and fix is like in below -
              $and: [
                  {
                    'location.latLng.lng': eventModel.location.latLng.lng,
                    'location.latLng.lat': eventModel.location.latLng.lat,
                  },
                    {start: {$gte: eventModel.start}},
                    {end: {$lte: eventModel.end}},
                ],
   4. To save data into Mongodb, we need to use save method, instead of make.
      fix is like 
         Event.make(data)  was fixed to  event.save()
         Event.see({})   was fixed to  event.find({})
  
   5. Router file method name was mismatch with Controller file.
        router.route('/').post(EventController.addJobsEvent);
        router.route('/').get(EventController.getEvents);

   6. module.export was missing in router.js 
        module.export = router


# B. Solutions

In the application, I prefer to use to popular opensource framework instead of new fancy technologies like Mocha, Chai, Mockgoose, Istanbul etc. These kind of framework has lot of opensource community support and help. During my expreices, I faced some sitution that, where my team used new technoglogy and later some tech problems in this framework or team members skill on technology becomes barrier for speed up development.

Using popular framework, helps to get tech solution , and human resources easier. In this case, our team member focus on building business solution instead of solving some deep technology issues, which may cause lot of organisation resource like cash or time .

Every application has various level of architecture as 
- Code architecture
- System Integration Architecture
- Cloud Level Architecture

But here, I refactored only Code level of architecture.

## Code Architecture
In this application, I have designed code into 3 major layers as Controller, Service, Model

#### Controller -  
It handles the request, invoke services to perform that action, and process response to sending back to the requester.

#### Service -
It is any function which can perform any task, like calculating some formula, accessing database to read or write. Here we will use a service function to access the database for retrieving and storing the information. 
Also, service will not have access to the request and response object. So anything needs to be done on the request and response object will have to be done in the controller only.   


And overall flow of application API will be like in below-
   /api -> Controller -> Service -> Model -> Database


#### Model-
  It is the data access layer to fetch and save the documents. The service layer will be invoking the models to perform any actions on the document in the database via the model.
A model represents the document which can be created, updated, removed and fetched from the database

## Folder Taxonomy
   Designing folder taxonomy is important section  in project. As project grows bigger, the folder structure gets complex and over the period of time, we need to keep 
   refactoring to make it simple and easy to understand by folder name and file name which can express its behaviour.

   -  src 
      1. config    -    Application Configuration files  like db.js(database connection)
      2. controllers -  Application Controllers  
      3. models -       Models and database schemas
      4. routers -      Define API end points and its routing path 
      5. services  -    Application level all kind of Business logic 
      6. util  -        Application common utility behaviours
   -  test
      1.  config   -     for test config files like db.js ( mockdb connection)
      2.  integration -  Integration testing files based on controllers and API
      3.  unit -         Unit testing files
      4.  data -         Mock json data required during testing
   -  index.js
   -  package.json     


### Config File & Utility
  Application level of configuration files need to be under config folder.
  For eg-  db.js which defines database connection path details and handles connection creation  under this folder.

## Unit Testing Mocha & Mockgoose
  For unit testing, using mock database is important, it makes development and testing functionality faster, so that application does not require to relay on realtime db connetion like integration , cleaning up database which slows down development process.
  For mock database and testing framework, Mockgoose and Mocha with Chai are used in applicastion.  Both are popular stable framework and lot of community support available. It makes easier trouble shooting testing issues. Chai library is used for validation of result or response data during testing.

## Integration Testing with MongoDB 
   Integration testing need to be done integratte with database or any if anyintegration required. This application need to connect with MongoDB to run
   integration test cases.
   Integration Test files are written for each controller to make sure all api end points working fine.

## APIs 

Api are designed with some best practices like mentioning version , using nouns etc.

- /api/v1/events   - CRUD operation on event
- /api/v1/users    - CRUD operation on  user
- /api/v1/users-events  -  Read operation for users with  events

# Installation and Run

To run application and test cases, npm or yarn package must be installed, if not installed, please install before running application.

-  To run test case with coverage -    
    npm test   
       or 
    yarn test
  
-  To run application -    
    npm start or yarn start
 