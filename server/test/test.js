const request = require('supertest');
const fs = require('fs');
const path = require('path');
const app = require('../server');
const { Pool, Client } = require('pg');

// let server;
// const port = 3000;


// afterEach((done) => {
//   server.close(done);
// });

describe('General', () => {
  it('Should return a 200 response code', (done) => {
    request(app)
      .get('/')
      .expect(200, done);
  });
  it('Should serve public/index.html', () => {
    request(app)
      .get('/')
      .then((res) => {
        fs.readFile(path.resolve(__dirname, '../../public/index.html'), (err, html) => {
          if (err) throw err;
          expect(res.text).toBe(html.toString());
        });
      });
  });
  xit('Should redirect requests to any invalid endpoint to a 404 page', () => {

  });
});

describe('User API', () => {
  beforeAll(() => {
    console.log('ay the testing bout to start')
  });
  it('Should respond with a 400 status code if given invalid username/password', () => {
    console.log(process.env.NODE_ENV);
    // request(app)
    //   .post('/user/login');
  });
});
