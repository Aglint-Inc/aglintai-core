import request from 'supertest';
import { expect } from 'chai';
import { describe, it } from 'node:test';
import { app } from '../../../../src/server';

describe('GET /api/v1/example', () => {
  it('should return 200 and a message', async () => {
    const res = await request(app).get('/api/v1/example');
    expect(res.status).to.equal(200);
    // Add assertion for response body if needed
    // expect(res.body).to.deep.equal({ message: 'GET /api/v1/example' });
  });
});

// describe('POST /users', () => {
//   it('should return 201 and a message when name is provided', async () => {
//     const res = await request(app).post('/users').send({ name: 'John Doe' });
//     expect(res.status).to.equal(201);
//     expect(res.body).to.deep.equal({
//       message: 'User created',
//       name: 'John Doe',
//     });
//   });

//   it('should return 400 when name is not provided', async () => {
//     const res = await request(app).post('/users').send({});
//     expect(res.status).to.equal(400);
//     expect(res.body).to.deep.equal({ error: 'Name is required' });
//   });
// });

// // test/routes/posts.test.ts

// describe('GET /posts', () => {
//   it('should return 200 and a list of posts', async () => {
//     const res = await request(app).get('/posts');
//     expect(res.status).to.equal(200);
//     expect(res.body).to.be.an('array');
//   });
// });

// Add more tests for other post endpoints as needed
