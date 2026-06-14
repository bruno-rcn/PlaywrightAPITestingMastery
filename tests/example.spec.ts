import { test, expect } from '@playwright/test';

let authToken: string

test.beforeAll('Run before all tests', async ({request}) => {
  console.log('Before all. Its best pratice add here code to create the environmento ofr the tests')

  // Get the token from the login
  const tokenLogin = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
    data: {"user":{"email":"bruno@teste.pt","password":"12345678","username":"BrunoTeste"}}
  })

  const tokenLoginJSON = await tokenLogin.json()
  authToken = "Token " + tokenLoginJSON.user.token
})

test.beforeEach('Run before each tests', async ({}) => {
  console.log('Run before each test. One by one. Its best pratice add here code to create the environmento ofr the tests')
})

test.afterAll('Run after all tests', async ({}) => {
  console.log('After all')
})

test.afterEach('Run after each tests', async ({}) => {
  console.log('Run after each test. One by one')
})

test('Get test Tags', async ({ request }) => {
  // Create the request and get the response
  const tagsResponse = await request.get('https://conduit-api.bondaracademy.com/api/tags')
  
  // Extract the JSON body
  const tagsResponseBodyJSON = await tagsResponse.json()

  // Assertions
  expect(tagsResponse.status()).toEqual(200)
  expect(tagsResponseBodyJSON).toHaveProperty('tags')
  expect(tagsResponseBodyJSON.tags[0]).toEqual('Test')
  expect(tagsResponseBodyJSON.tags.length).toBeLessThanOrEqual(10)

  console.log(tagsResponse)
  console.log(tagsResponseBodyJSON)
  
});

test('Get test Articles', async ({request}) => {
  // Create the request and get the response
  const articlesResponse = await request.get('https://conduit-api.bondaracademy.com/api/articles')

  // Extract the JSON body
  const articlesResponseBodyJSON = await articlesResponse.json()

  expect(articlesResponse.status()).toEqual(200)
  expect(articlesResponseBodyJSON.articlesCount).toEqual(10)
});


test('Post/Delete Create and Delete Article', async ({request}) => {
  // Create the article
  const newArticleResponse = await request.post('https://conduit-api.bondaracademy.com/api/articles', {
    data: {
      "article": {
        "title": "Test Article",
        "description": "Teste course",
        "body": "Test body",
        "tagList": []
      }
    },
    headers: {
      Authorization: authToken
    }
  })

  const newArticleJSON = await newArticleResponse.json()

  expect(newArticleResponse.status()).toEqual(201)
  expect(newArticleJSON.article.title).toEqual('Test Article')

  // Delete the article
  const slugId = newArticleJSON.article.slug

  const deleteArticle = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${slugId}`, {
      headers: {
        Authorization: authToken
    }
  })

  expect(deleteArticle.status()).toEqual(204)

})

test('Delete', async ({request}) => {

})

test('Create/Update/Delete an Article', async ({request}) => {
  // Create the article
  const newArticleResponse = await request.post('https://conduit-api.bondaracademy.com/api/articles', {
    data: {
      "article": {
        "title": "Test title",
        "description": "Teste description",
        "body": "Test body",
        "tagList": []
      }
    },
    headers: {
      Authorization: authToken
    }
  })

  const newArticleJSON = await newArticleResponse.json()

  expect(newArticleResponse.status()).toEqual(201)
  expect(newArticleJSON.article.title).toEqual('Test title')

  // Update
  const slugId = newArticleJSON.article.slug

    const updateArticleResponse = await request.put(`https://conduit-api.bondaracademy.com/api/articles/${slugId}`, {
    data: {
      "article": {
        "title": "Test Article Update",
        "description": "Teste course Update",
        "body": "Test body Update",
        "tagList": []
      }
    },
    headers: {
      Authorization: authToken
    }
  })

   const updateArticleResponseJSON = await updateArticleResponse.json()

  expect(updateArticleResponse.status()).toEqual(200)
  expect(updateArticleResponseJSON.article.title).toEqual('Test Article Update')

    // Delete the article
const updateSlugId = updateArticleResponseJSON.article.slug

  const deleteArticle = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${updateSlugId}`, {
      headers: {
        Authorization: authToken
    }
  })

  expect(deleteArticle.status()).toEqual(204)

})