import { APIRequestContext } from "@playwright/test"

export class RequestHandler {

    private baseUrl: string = ''
    private defaultBaseUrl: string = ''
    private apiPath: string = ''
    private queryParameters: object = {}
    private apiHeaders: object = {}
    private apiBody: object = {}
    private request: APIRequestContext

    // Method that defines the requireds params for new instances for this class
    // here we will have: request fixtures form PW and the base url
    constructor(requestParams: APIRequestContext, apiBaseUrl: string){
        this.request = requestParams
        this.defaultBaseUrl = apiBaseUrl
    }

    url(url: string){
        this.baseUrl = url
        return this
    }

    path(path: string){
        this.apiPath = path
        return this
    }

    queryParams(params: object){
        this.queryParameters = params
        return this
    }

    headers(headers: object){
        this.apiHeaders = headers
        return this
    }

    body(body: object){
        this.apiBody = body
        return this
    }

    // This {this.baseUrl ?? this.defaultBaseUrl} means: 
    // 1. Use the value from baseUrl, but, if the value from baseUrl is equal to (null/undefined) use the value from defaultBaseUrl
    private getUrl(){
        const url = new URL(`${this.baseUrl ?? this.defaultBaseUrl}${this.apiPath}`)

        // Converte the query params object in a Array with key and value pairs string to add into the url
        for(const [key, value] of Object.entries(this.queryParameters)){
            url.searchParams.append(key, value)
        }
        return url.toString()
    }
}

