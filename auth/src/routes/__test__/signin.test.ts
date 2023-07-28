import request from 'supertest';
import { app } from '../../app';

it('It succeeds when a valid existing user tries to sign in', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test5@test.com',
      password: 'password',
    })
    .expect(201);

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test5@test.com',
      password: 'password',
    })
    .expect(200);
});

it('It response with a cookie when given valid credentials', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test6@test.com',
      password: 'password',
    })
    .expect(201);

  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test6@test.com',
      password: 'password',
    })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});

it('It fails when a non existing user tries to sign in', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test4@test.com',
      password: 'password',
    })
    .expect(400);
});

it('It fails when an incorrect password is supplied', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test4@test.com',
      password: 'password',
    })
    .expect(201);

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test4@test.com',
      password: 'p',
    })
    .expect(400);
});
