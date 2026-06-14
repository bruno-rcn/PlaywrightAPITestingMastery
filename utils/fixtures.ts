// How to build

// 1. Here import the test functions and rename to base
import { test as base } from '@playwright/test'
import { RequestHandler } from '../utils/request-handler';

// 2. Create a fixture
// 2.1. api is a key and the async is the value
// 2.2. We need to add as params an empty object and the Playwright 'use' function
// 2.3. Add the goal for the fixture: Access the RequestHandler methods
// 3. All code that is before the use method will run as a pre-condiction when the fixture is called
// 4. Reassigned to a const test to use into the others file and keep consistent with the names

// This method is the config for when we are in another file and add '.' after the 'api' we will can see the methods
export type TestOptions = {
    api: RequestHandler
}

export const test = base.extend<TestOptions>({
    api: async({request}, use) => {

        const baseUrl = 'https://conduit-api.bondaracademy.com/api'

        // given
        const requestHandler = new RequestHandler(request, baseUrl)

        // when
        await use(requestHandler)
    }
})

