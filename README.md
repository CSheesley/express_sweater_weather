# Express Sweater Weather

### About
Express Sweater Weather is a solo project, and my first experience using JavaScript, Node.js, Express, and Sequelize. This was very much an exploratory project in which a number of API endpoints were built out to implement CRUD functionality. [Here](https://backend.turing.io/module4/projects/express_sweater_weather/express_sweater_weather_spec) is the link to the original project listing.

**Key Learnings**
* Intro to JavaScript
* Intro to Node.js and Express
* Intro to Sequelize
* Intro to Jest
* Project Management - using a [project board](https://trello.com/b/dv7NzuBG/expresssweaterweather), and breaking down features into multiple user stories.
* Documentation
* Basic CRUD functionality
* Consuming and Producing API's

### Links
Trello Project Board Link: https://trello.com/b/dv7NzuBG/expresssweaterweather

### Endpoints  

#### POST /api/v1/users
```
*request*
Content-Type: application/json
Accept: application/json

{
  "email": "my_email@example.com",
  "password": "password"
  "password_confirmation": "password"
}
```
```
*response*
status: 201
body:

{
  "api_key": "jgn983hy48thw9begh98h4539h4",
}
```

### Setup
`$ npx sequelize db:create`  
`$ npx sequelize db:migrate`  
`$ npx sequelize db:seed:all`  

### Versions
node 10.16.0  
npm 6.9.0  
express 4.16.2  
jest 24.8.0

### Packages
`$ npm install dotenv`  
`$ npm install node-gyp`  
`$ npm install bcrypt`   
`$ npm install uuid`  
`$ npm install node-fetch --save`  
`$ npm install jest`  
`$ npm install babel-jest supertest shelljs`  

### Schema
![schema](schema.png)
