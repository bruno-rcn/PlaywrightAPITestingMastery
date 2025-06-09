import { APIRequestContext } from "@playwright/test"
import { expect } from '@playwright/test';
import { APILogger } from "./logger";

// Create the methods to work with the api's
export class RequestHandler {

    private baseUrl: string | undefined
    private logger: APILogger
    private apiPath: string = ''
    private defaultBaseUrl: string
    private queryParams: object = {}
    private apiHeaders: Record<string, string> = {}
    private apiBody: object = {}
    private request: APIRequestContext // this APIContext is the same thing to [test.beforeAll('Get auth token', async ({request})]

    constructor(requestValue: APIRequestContext, apiBaseUrl: string, loggerValue: APILogger){
        this.request = requestValue
        this.defaultBaseUrl = apiBaseUrl
        this.logger = loggerValue
    }

    url(url: string){
        this.baseUrl = url
        return this
    }
    
    path(path: string){
        this.apiPath = path
        return this
    }
    
    params(params: object){
        this.queryParams = params
        return this
    }
    
    headers(headers: Record<string, string>){
        this.apiHeaders = headers
        // console.log(this.apiHeaders)
        return this
    }
    
    body(body: object){
        this.apiBody = body
        return this
    }

    // this URL object comes from node js and let you build and modifie an URL
    // Hows is it works: if the value of {this.baseUrl} was not provide or undefine, then, the method will use the value from {this.defaultBaseUrl}
    private getUrl(){
        const url = new URL(`${this.baseUrl ?? this.defaultBaseUrl}${this.apiPath}`)

        // this method will convert the key and value into an array
        for(const [key, value] of Object.entries(this.queryParams)){
            url.searchParams.append(key, value)
        } 

        return url.toString()
    }

    async getRequest(statusCode: number){
        // 1 - get the url
        const url = this.getUrl()

        // 2 - Capture the logRequest
        this.logger.logRequest('GET', url, this.apiHeaders)

        // 3 - get the response
        const response = await this.request.get(url, {
            headers: this.apiHeaders
        })
        this.cleanupFields()

        // 4 - Get the status code and response as json formatt
        const actualStatusCode = response.status()
        const responseJSON = await response.json()

        // 5 - Capture the logRequest
        this.logger.logResponse(actualStatusCode, responseJSON)

        // 6 - Validate satus code
        this.statusCodeValidator(actualStatusCode, statusCode, this.getRequest)

        // 7 - Return the response json
        return response.json()
    }

    async postRequest(statusCode: number){
        const url = this.getUrl()

        this.logger.logRequest('POST', url, this.apiHeaders, this.apiBody)

        const response = await this.request.post(url, {
            headers: this.apiHeaders,
            data: this.apiBody
        })
        this.cleanupFields()

        const actualStatusCode = response.status()
        const responseJSON = await response.json()

        this.logger.logResponse(actualStatusCode, responseJSON)

        this.statusCodeValidator(actualStatusCode, statusCode, this.postRequest)

        return response.json()
    }

    async putRequest(statusCode: number){
        const url = this.getUrl()

        this.logger.logRequest('PUT', url, this.apiHeaders, this.apiBody)

        const response = await this.request.put(url, {
            headers: this.apiHeaders,
            data: this.apiBody
        })
        this.cleanupFields()

        const actualStatusCode = response.status()
        const responseJSON = await response.json()

        this.logger.logResponse(actualStatusCode, responseJSON)

        this.statusCodeValidator(actualStatusCode, statusCode, this.putRequest)

        return response.json()
    }

    async deleteRequest(statusCode: number){
        const url = this.getUrl()

        this.logger.logRequest('DELETE', url, this.apiHeaders)

        const response = await this.request.delete(url, {
            headers: this.apiHeaders
        })
        this.cleanupFields()
        
        const actualStatusCode = response.status()

        this.logger.logResponse(actualStatusCode)

        this.statusCodeValidator(actualStatusCode, statusCode, this.deleteRequest)
    }

    // will bring a better message why the status code isnt the correct
    private statusCodeValidator(actualStatus: number, expectStatus: number, callingMethod: Function){
        if (actualStatus !== expectStatus) {
            const logs = this.logger.getRecentLogs()
            const error = new Error(`Expected status ${expectStatus} but got ${actualStatus}\n\n == Recent API Activity: \n ${logs}`)
            Error.captureStackTrace(error, callingMethod)
            throw error
        }
    }

    private cleanupFields(){
        this.apiBody = {}
        this.apiHeaders = {}
        this.baseUrl = undefined
        this.apiPath = ''
        this.queryParams = {}
    }

}
