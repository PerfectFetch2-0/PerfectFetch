const request = require('supertest');
const fs = require('fs');
const path = require('path');
const app = require('../server');
const pool = require('../database');

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

describe('Users API', () => {
  const addTestUser = {
    name: 'Add-Test-User',
    text: 'INSERT INTO users(username, email, password) VALUES ($1, $2 ,$3)',
    values: ['test', 'test@gmail.com', '1234'],
  };
  beforeEach(async (done) => {
    // await pool.query('DELETE FROM users');
    const addRes = await pool.query(addTestUser);
    console.log(addRes);
    done();
  });
  afterEach(async (done) => {
    await pool.query('DELETE FROM users');
    done();
  });

  describe('Log in process', () => {
    it('Should return a 200 status code if given a valid set of user login info', (done) => {
      request(app)
        .post('/user/login')
        .send({
          email: 'test@gmail.com',
          password: '1234',
        })
        .expect(200, done);
    });
    it('Should return a 400 status code if given invalid username', (done) => {
      request(app)
        .post('/user/login')
        .send({
          email: 'wrongtest@gmail.com',
          password: '1234',
        })
        .expect(400, done);
    });
    it('Should return a 400 status code if given invalid password', (done) => {
      request(app)
        .post('/user/login')
        .send({
          email: 'test@gmail.com',
          password: 'wrongpw',
        })
        .expect(400, done);
    });
  });

  describe('Sign up process', () => {
    it('Should return a 200 status code when a new user signs up', (done) => {
      request(app)
        .post('/user/signup')
        .send({
          name: 'New Test',
          email: 'newtest@gmail.com',
          password: '1234',
        })
        .expect(200, done);
    });
    it('Should return a 400 status code if email\'s already taken', (done) => {
      request(app)
        .post('/user/signup')
        .send({
          name: 'Test Name',
          email: 'test@gmail.com',
          password: '123',
        })
        .expect(400, done);
    });
    it('Should record user\'s account information in the database', () => {
      request(app)
        .post('/user/signup')
        .send({
          name: 'Test Name',
          email: 'test@gmail.com',
          password: '123',
        })
        .then(async () => {
          const query = 'SELECT * FROM users WHERE email = $1';
          const value = ['test@gmail.com'];
          const queryResult = await pool.query(query, value);
          console.log(queryResult);
          // TODO: process the query result
        });
    });
  });
});
