import { expect } from '@playwright/test'
import { test } from '../utils/fixtures'

let authToken: string

test.beforeAll('Extract the token', async ({api}) => {

    const tokenLogin = await api
        .path('/users/login')
        .body({"user":{"email":"bruno@teste.pt","password":"12345678","username":"BrunoTeste"}})
        .postRequest(200)
    authToken = "Token " + tokenLogin.user.token
})

test('GET Articles - First test with RequestHandler and Fixture and getRequest function', async ({api}) => {
    const getArticlesResponse = await api.path('/articles').queryParams({limit:10, offset:0}).getRequest(200)
    expect(getArticlesResponse.articlesCount).toEqual(10)
})

test('GET Tags', async ({api}) => {
    const getTagsResponse = await api.path('/tags').getRequest(200)
    expect(getTagsResponse.tags.length).toBeLessThanOrEqual(10)
})

test('Create and Delete Article', async ({api}) => {

    const createArticle = await api.path('/articles')
        .headers({Authorization: authToken})
        .body({"article": {"title": "Test Article","description": "Teste course","body": "Test body","tagList": []}})
        .postRequest(201)

    expect(createArticle.article.title).toEqual('Test Article')

    const slugId = createArticle.article.slug

    const getArticlesResponse = await api.path('/articles').headers({Authorization: authToken}).queryParams({limit:10, offset:0}).getRequest(200)
    expect(getArticlesResponse.articles[0].title).toEqual('Test Article')


    await api.path(`/articles/${slugId}`).headers({Authorization: authToken}).deleteRequest(204)

    const getArticlesResponseTwo = await api.path('/articles').headers({Authorization: authToken}).queryParams({limit:10, offset:0}).getRequest(200)
    expect(getArticlesResponseTwo.articles[0].title).not.toEqual('Test Article')
})


test('Create, Update and Delete Article', async ({api}) => {

    const createArticle = await api.path('/articles')
        .headers({Authorization: authToken})
        .body({"article": {"title": "Test Article","description": "Teste course","body": "Test body","tagList": []}})
        .postRequest(201)

    expect(createArticle.article.title).toEqual('Test Article')

    const slugId = createArticle.article.slug

    const getArticlesResponse = await api.path('/articles').headers({Authorization: authToken}).queryParams({limit:10, offset:0}).getRequest(200)
    expect(getArticlesResponse.articles[0].title).toEqual('Test Article')


    const updateArticle = await api
    .path(`/articles/${slugId}`)
    .headers({Authorization: authToken})
    .body({"article": {"title": "Update","description": "Teste course","body": "Test body","tagList": []}})
    .putRequest(200)

    expect(updateArticle.article.title).toEqual('Update')

    const newSlugId = updateArticle.article.slug

    const getArticlesUpdateResponse = await api.path('/articles').headers({Authorization: authToken}).queryParams({limit:10, offset:0}).getRequest(200)
    expect(getArticlesUpdateResponse.articles[0].title).toEqual('Update')


    await api.path(`/articles/${newSlugId}`).headers({Authorization: authToken}).deleteRequest(204)

    const getArticlesResponseTwo = await api.path('/articles').headers({Authorization: authToken}).queryParams({limit:10, offset:0}).getRequest(200)
    expect(getArticlesResponseTwo.articles[0].title).not.toEqual('Test Article')
})