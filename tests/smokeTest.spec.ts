import { test } from '../utils/fixtures';

let authToken: string

test.beforeAll('Get auth token', async ({request}) => {
  const signIn = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
    data: {"user":{"email":"brunor@teste.com","password":"12345678"}}
  })
  const signInResponseJSON = await signIn.json()
  authToken = 'Token ' + signInResponseJSON.user.token
})

test('How to use the methods from RequestHandler file', async({api}) => {
    api
        .url('https://conduit-api.bondaracademy.com/api')
        .path('/articles')
        .params({limit:10, offset:0})
        .headers({Authorization: authToken})
        // .body({"user":{"email":"brunor@teste.com","password":"12345678"}}) Its comments because this endpoins doesnt have a body its just to show how to use
})