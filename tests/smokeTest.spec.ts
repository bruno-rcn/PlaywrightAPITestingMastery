import { test } from '../utils/fixtures';
// import { expect } from '@playwright/test';
import { expect } from '../utils/custom-expect';
import { createToken } from '../helpers/createToke';

// let authToken: string

// test.beforeAll('Get auth token', async ({api, config}) => {
//   authToken = await createToken(config.userEmail, config.userPassword)
// })

// Here we call the method (api) that came from fixtures who use the others methods that came from RequestHandler to make our tests
test('How to use the methods from RequestHandler file', async({api}) => {
    api
        // .url('https://conduit-api.bondaracademy.com/api') // if not use this methos {this.baseUrl} the value will comes from {this.defaultBaseUrl}
        .path('/articles')
        .params({limit:10, offset:0}) // now, with the loof for created on the method getUrl aways we put a queryParams here that will be attach in the right way
        // .headers({Authorization: authToken})
        // .body({"user":{"email":"brunor@teste.com","password":"12345678"}}) // Its comments because this endpoins doesnt have a body its just to show how to use
})

// How to use the method - async getRequest() - from RequestHandler file - 
test('To Get articles ', async({api}) => {
    const response = await api.path('/articles').params({limit:10, offset:0}).getRequest(200)
    expect(response.articles.length).shouldBeLessThanOrEqual(10)
    expect(response.articlesCount).shouldEqual(10)
})

test('To Get tags ', async({api}) => {
    const response = await api.path('/tags').getRequest(200)
    expect(response.tags[0]).shouldEqual('Test')
    expect(response.tags.length).shouldBeLessThanOrEqual(10)
})

test('Create and Delete article', async({api}) => {
  // 1 - Create article
  const createArticleResponse = 
    await api
      .path('/articles')
      // .headers({Authorization: authToken}) - dont need because created a methodto authorize by default
      .body({
        "article": {
            "title": "create article test - title",
            "description": "create article test - description",
            "body": "create article test - body",
            "tagList": []
        }
      })
      .postRequest(201)

  expect(createArticleResponse.article.title).toContain('create article test - title')

  // 2 - Get SlugId
  const slugId = createArticleResponse.article.slug

  // 3 - Confirm that article was created
  const getArticlesResponse = 
      await api
        .path('/articles')
        .params({limit:10, offset:0})
        // .headers({Authorization: authToken})
        .getRequest(200)
  expect(getArticlesResponse.articles[0].title).toContain('create article test - title')

  // 4 - Delete article
      await api 
        .path(`/articles/${slugId}`)
        // .headers({Authorization: authToken})
        .deleteRequest(204)

  // 5 - Confirm that article was deleted
  const getArticlesAfterDeleteResponse = 
      await api
        .path('/articles')
        .params({limit:10, offset:0})
        // .headers({Authorization: authToken})
        .getRequest(200)
  expect(getArticlesAfterDeleteResponse.articles[0].title).not.toContain('create article test - title')
})

test('Create, Update and Delete article', async({api}) => {
  // 1 - Create article
  const createArticleResponse = 
    await api
      .path('/articles')
      // .headers({Authorization: authToken})
      .body({
        "article": {
            "title": "create article test - title",
            "description": "create article test - description",
            "body": "create article test - body",
            "tagList": []
        }
      })
      .postRequest(201)

  expect(createArticleResponse.article.title).toContain('create article test - title')

  // 2 - Get SlugId
  const slugId = createArticleResponse.article.slug

  // 3 - Confirm that article was created
  const getArticlesResponse = 
      await api
        .path('/articles')
        .params({limit:10, offset:0})
        // .headers({Authorization: authToken})
        .getRequest(200)
  expect(getArticlesResponse.articles[0].title).toContain('create article test - title')

  // 4 - Update the article
  const updateArticleResponse = 
      await api
        .path(`/articles/${slugId}`)
        // .headers({Authorization: authToken})
        .body({
          "article": {
              "title": "teste Update",
              "description": "teste Update",
              "body": "teste",
              "tagList": []
          }
        })
        .putRequest(200)
  expect(updateArticleResponse.article.title).toContain('teste Update')
  
  // 5 - Get the new slugId after update
  const newSlugId = updateArticleResponse.article.slug

  // 6 - Delete article
      await api 
        .path(`/articles/${newSlugId}`)
        // .headers({Authorization: authToken})
        .deleteRequest(204)

  // 7 - Confirm that article was deleted
  const getArticlesAfterDeleteResponse = 
      await api
        .path('/articles')
        .params({limit:10, offset:0})
        // .headers({Authorization: authToken})
        .getRequest(200)
  expect(getArticlesAfterDeleteResponse.articles[0].title).not.toContain('teste Update')
})
