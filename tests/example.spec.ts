import { test, expect } from '@playwright/test';

test('GET - tags', async ({ request }) => {
  const tagsResponse = await request.get('https://conduit-api.bondaracademy.com/api/tags')
  console.log(tagsResponse)
  
  console.log('/////////////////////////////////////////////////////////////////////////////////////')
  
  // here we get the content body response
  const tagsResponseJson = await tagsResponse.json()
  console.log(tagsResponseJson)

  expect(tagsResponse.status()).toEqual(200)
  expect(tagsResponseJson.tags[0]).toEqual('Test')
  expect(tagsResponseJson.tags.length).toBeLessThanOrEqual(10)
});

test('GET - articles', async ({request}) => {
  const articlesResponse = await request.get('https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0')
  console.log(articlesResponse)

  console.log('/////////////////////////////////////////////////////////////////////////////////////')

  const articlesResponseJson = await articlesResponse.json()
  console.log(articlesResponseJson)

  expect(articlesResponse.status()).toEqual(200)
  expect(articlesResponseJson.articles[0].title).toContain('Discover Bondar Academy: Your Gateway to Efficient Learning')
  expect(articlesResponseJson.articles.length).toBeLessThanOrEqual(10) // this limit is set in: limit=10 on url
  expect(articlesResponseJson.articlesCount).toEqual(10)
})

test('POST - create article', async ({request}) => {
  
  // 1 - sign in
  const signIn = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
    data: {"user":{"email":"brunor@teste.com","password":"12345678"}}
  })

  // 2 - get the body data injson format
  const signInResponseJSON = await signIn.json()
  console.log(signInResponseJSON)

  // 3 - get the token value
  const authToken = 'Token ' + signInResponseJSON.user.token
  console.log(authToken)

  // 4 - Create the article
  const newArticle = await request.post('https://conduit-api.bondaracademy.com/api/articles/', {
    headers: {Authorization: authToken},
    data: {
      "article": {
          "title": "teste postman",
          "description": "teste postman",
          "body": "teste postman",
          "tagList": []
      }
    }
  })

  const newArticleResponseJSON = await newArticle.json()
  console.log(newArticleResponseJSON)

  expect(newArticle.status()).toEqual(201)
  expect(newArticleResponseJSON.article.title).toContain('teste postman')

  // 6 - is a best practice make a Get request after make a post to validete
  const articlesResponse = await request.get('https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0', {
    headers: {Authorization: authToken}
  })
  expect(articlesResponse.status()).toEqual(200)

  const articlesResponseJson = await articlesResponse.json()
  expect(articlesResponseJson.articles[0].title).toContain('teste postman')
})
