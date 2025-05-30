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
