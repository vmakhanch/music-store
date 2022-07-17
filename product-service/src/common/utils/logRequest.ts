import {APIGatewayProxyEvent} from 'aws-lambda'

const serializeQueryStringParameters = (obj: any) => {
    const str = [];

    for (let p in obj) {
        if (obj.hasOwnProperty(p)) {
            str.push(p + '=' + obj[p]);
        }
    }

    return str.join('&');
}

export const logRequest = (event: APIGatewayProxyEvent) => {
    try {
        const queryString = serializeQueryStringParameters(event.queryStringParameters)
        console.log(`Request: ${event.httpMethod} ${event.path}${queryString ? `?${queryString}` : ''} \n${event.body ? `body: ${JSON.stringify(event.body)}` : ''}`)
    } catch (error) {
        console.error(error)
    }
}
