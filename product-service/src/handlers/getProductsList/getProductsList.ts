import {APIGatewayProxyEvent} from 'aws-lambda'

import {productService} from '../../common/services/product'
import {AwsGatewayAPIResponse} from '../../common/entities/AwsGatewayAPIResponse'
import {ResponseStatusCodes, ResponseStringCodes} from '../../common/types'
import {logRequest} from '../../common/utils/logRequest'

export const handler = async (event: APIGatewayProxyEvent) => {
    try {
        logRequest(event)

        const products = await productService.getAllProducts()

        return new AwsGatewayAPIResponse(ResponseStatusCodes.OK, products)
    } catch (error) {
        console.error(error)

        return new AwsGatewayAPIResponse(ResponseStatusCodes.INTERNAL_SERVER_ERROR, {
            errorCode: ResponseStringCodes.INTERNAL_SERVER_ERROR,
            errorMessage: 'Something went wrong. Please try again later.'
        })
    }
}

