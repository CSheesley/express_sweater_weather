var shell = require('shelljs');
var request = require("supertest");
var app = require('./app');

describe('api', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:create')
  });
  beforeEach(() => {
      shell.exec('npx sequelize db:migrate')
      shell.exec('npx sequelize db:seed:all')
    });
  afterEach(() => {
    shell.exec('npx sequelize db:migrate:undo:all')
  });

  describe('Test Api/V1/Users path', () => {
    test('It should respond to the POST method', () => {
        request(app)
          .post('/api/v1/users')
          .set({
            "email": "test@email.com",
            "password": "password",
            "password_confirmation": "password"
          })
          .then(response => {
            expect(response.statusCode).toBe(200)
          })
    });
  });
});
