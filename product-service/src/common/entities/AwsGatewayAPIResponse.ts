const defaultAwsGatewayAPIResponseHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Credentials': true,
}

export class AwsGatewayAPIResponse {
    statusCode: number
    body?: string
    headers = defaultAwsGatewayAPIResponseHeaders

    constructor(statusCode: number, body: any) {
        this.statusCode = statusCode
        this.body = JSON.stringify(body)
    }
}
