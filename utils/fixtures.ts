import { test as base } from '@playwright/test';
import { RequestHandler } from '../utils/request-handler';

export type MyFixtures = {
    api: RequestHandler;
}

// All code write before the line [ await use(requestHandler) ] will be execute as a pre condiction when call from a test
// All code write after that will execute after the test finish
export const test = base.extend<MyFixtures>({
    api: async ({}, use) => {
        const requestHandler = new RequestHandler()
        await use(requestHandler)
    }
})
