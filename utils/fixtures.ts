import { test as base } from '@playwright/test';
import { RequestHandler } from '../utils/request-handler';
import { APILogger } from './logger';
import { setCustomExpectLogger } from './custom-expect';
import { config } from '../api-test-config';

// Use the RequestHandler to create a method who can call all methods from RequestHandler into a unic method calls (api) here
export type MyFixtures = {
    api: RequestHandler,
    config: typeof config
}

// All code write before the line [ await use(requestHandler) ] will be execute as a pre condiction when call from a test
// All code write after that will execute after the test finish
export const test = base.extend<MyFixtures>({
    api: async ({request}, use) => {
        const logger = new APILogger()
        setCustomExpectLogger(logger)
        const requestHandler = new RequestHandler(request, config.apiUrl, logger)
        await use(requestHandler)
    },

    config: async({}, use) => {
        await use(config)
    }
})
