import { expect as baseExpect } from '@playwright/test';
import {APILogger} from './logger'

let apiLogger: APILogger

export const setCustomExpectLogger = (logger: APILogger) => {
    apiLogger = logger
}

declare global {
    namespace PlaywrightTest{
        interface Matchers<R, T>{
            shouldEqual(expected: T): R
            shouldBeLessThanOrEqual(expected: T): R
        }
    }
}

export const expect = baseExpect.extend({
    shouldEqual(received: any, expect: any){
        let pass: boolean
        let logs: string = ''

        try {
            baseExpect(received).toEqual(expect)
            pass = true;
            if(this.isNot){
                logs = apiLogger.getRecentLogs()
            }
        } catch (e: any) {
            pass = false;
            logs = apiLogger.getRecentLogs()
        }

        let hint = this.isNot ? 'not':''
        const message = this.utils.matcherHint('shouldEqual', undefined, undefined, { isNot: this.isNot }) +
            '\n\n' +
            `Expected: ${hint} ${this.utils.printExpected(expect)}\n` +
            `Received: ${this.utils.printReceived(received)}\n\n` + `-> Recent API Activity: \n ${logs}`

        return {
            message: () => message,
            pass
        };
    },

    shouldBeLessThanOrEqual(received: any, expect: any){
        let pass: boolean
        let logs: string = ''

        try {
            baseExpect(received).toBeLessThanOrEqual(expect)
            pass = true;
            if(this.isNot){
                logs = apiLogger.getRecentLogs()
            }
        } catch (e: any) {
            pass = false;
            logs = apiLogger.getRecentLogs()
        }

        let hint = this.isNot ? 'not':''
        const message = this.utils.matcherHint('shouldBeLessThanOrEqual', undefined, undefined, { isNot: this.isNot }) +
            '\n\n' +
            `Expected: ${hint} ${this.utils.printExpected(expect)}\n` +
            `Received: ${this.utils.printReceived(received)}\n\n` + `-> Recent API Activity: \n ${logs}`

        return {
            message: () => message,
            pass
        };
    }

})