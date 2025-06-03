import { test, expect } from '@playwright/test';

let authToken: string

test.beforeAll('Get auth token', async ({request}) => {
  // 1 - sign in
  const signIn = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
    data: {"user":{"email":"brunor@teste.com","password":"12345678"}}
  })

  // 2 - get the body data injson format
  const signInResponseJSON = await signIn.json()

  // 3 - get the token value
  authToken = 'Token ' + signInResponseJSON.user.token
})

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

test('POST, PUT, Get and Delete - article', async ({request}) => {
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

  // to delete and update we need to get the unic identify
  const slugId = newArticleResponseJSON.article.slug

  // 6 - it is a best practice make a Get request after make a post to validete
  const articlesResponse = await request.get('https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0', {
    headers: {Authorization: authToken}
  })
  expect(articlesResponse.status()).toEqual(200)

  const articlesResponseJson = await articlesResponse.json()
  expect(articlesResponseJson.articles[0].title).toContain('teste postman')

  // 7 - Update article
  const updateArticle = await request.put(`https://conduit-api.bondaracademy.com/api/articles/${slugId}`, {
    headers: {Authorization: authToken},
    data: {
      "article": {
          "title": "teste Update postman",
          "description": "teste Update postman",
          "body": "teste postman",
          "tagList": []
      }
    }
  })
  
  expect(updateArticle.status()).toEqual(200)
  
  const updateArticleJson = await updateArticle.json()
  const newSlugId = updateArticleJson.article.slug

  // 8 - it is a best practice make a Get request after make a post to validete
  const articleUpdateResponse = await request.get('https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0', {
    headers: {Authorization: authToken}
  })
  expect(articleUpdateResponse.status()).toEqual(200)

  const articleUpdateResponseJson = await articleUpdateResponse.json()
  expect(articleUpdateResponseJson.articles[0].title).toContain('teste Update postman')

  // 9 - Delete the article
  const deleteArticle = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${newSlugId}`, {
    headers: {Authorization: authToken}
  })

  expect(deleteArticle.status()).toEqual(204)
})


