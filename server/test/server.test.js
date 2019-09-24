let app = require('../server');
let testServer = require('supertest');

describe('testing the user path', () => {
  test('should respond with 200 to log out request', async () => {
    let response = await testServer(app).post('/api/user/logout')
    expect(response.statusCode).toBe(200)
  });

  test('should respond with 403 if user is not logged in on get request', async () => {
    let response = await testServer(app).get('/api/user')
    expect(response.statusCode).toBe(403)
  })

  test('should respond with 200 on user information request if user is logged in', async () => {
    let agent = testServer.agent(app)
    let response = await agent
      .post('/api/user/login')
      .send({ username: 'david', password: '1234' })
    expect(response.statusCode).toBe(200)

    let userResponse = await agent.get('/api/user')
    expect(userResponse.statusCode).toBe(200)
    //testServer returns the response with a .body for the content of the response
    expect(userResponse.body.username).toBe('david')

  })

})
