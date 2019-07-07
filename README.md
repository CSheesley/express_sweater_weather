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
  "api_key": "jgn983hy48thw9begh98h4539h4"
}
```

#### POST /api/v1/sessions
```
*request*
Content-Type: application/json
Accept: application/json
{
  "email": "my_email@example.com",
  "password": "password"
}
```
```
*response*
status: 200
body:
{
  "api_key": "jgn983hy48thw9begh98h4539h4"
}
```

#### GET /api/v1/forecast?location=[city],[state abbr]
```
*request*
Content-Type: application/json
Accept: application/json
body:
{
  "api_key": "jgn983hy48thw9begh98h4539h4"
}
```
```
*response*
{
  "location": "Denver, C0",
  "currently": {
      "summary": "Overcast",
      "icon": "cloudy",
      "precipIntensity": 0,
      "precipProbability": 0,
      "temperature": 54.91,
      "humidity": 0.65,
      "pressure": 1020.51,
      "windSpeed": 11.91,
      "windGust": 23.39,
      "windBearing": 294,
      "cloudCover": 1,
      "visibility": 9.12,
    },
  "hourly": {
    "summary": "Partly cloudy throughout the day and breezy this evening.",
    "icon": "wind",
    "data": [
      {
      "time": 1555016400,
      "summary": "Overcast",
      "icon": "cloudy",
      "precipIntensity": 0,
      "precipProbability": 0,
      "temperature": 54.9,
      "humidity": 0.65,
      "pressure": 1020.8,
      "windSpeed": 11.3,
      "windGust": 22.64,
      "windBearing": 293,
      "cloudCover": 1,
      "visibility": 9.02,
      },
    ]
  },
  "daily": {
    "summary": "No precipitation throughout the week, with high temperatures bottoming out at 58°F on Monday.",
    "icon": "clear-day",
    "data": [
      {
        "time": 1554966000,
        "summary": "Partly cloudy throughout the day and breezy in the evening.",
        "icon": "wind",
        "sunriseTime": 1554990063,
        "sunsetTime": 1555036947,
        "precipIntensity": 0.0001,
        "precipIntensityMax": 0.0011,
        "precipIntensityMaxTime": 1555045200,
        "precipProbability": 0.11,
        "precipType": "rain",
        "temperatureHigh": 57.07,
        "temperatureLow": 51.47,
        "humidity": 0.66,
        "pressure": 1020.5,
        "windSpeed": 10.94,
        "windGust": 33.93,
        "cloudCover": 0.38,
        "visibility": 9.51,
        "temperatureMin": 53.49,
        "temperatureMax": 58.44,
      },
    ]
  }
}
```
  
#### POST /api/v1/favorites
```
*request*
Content-Type: application/json
Accept: application/json
{
  "location": "Denver, CO",
  "api_key": "jgn983hy48thw9begh98h4539h4"
}
```
```
*response*
status: 200
body:
{
  "message": "denver, co has been added to your favorites",
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
