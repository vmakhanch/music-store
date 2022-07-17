import { APIGatewayProxyEvent } from 'aws-lambda'

import {Product, ResponseStringCodes, ResponseStatusCodes} from '../../common/types'
import {productService} from '../../common/services/product'
import {AwsGatewayAPIResponse} from '../../common/entities/AwsGatewayAPIResponse'
import {logRequest} from '../../common/utils/logRequest'

export const handler = async (event: APIGatewayProxyEvent) => {
    try {
        logRequest(event)
        const {title, description, price, count} = JSON.parse(event.body!) as any as Product

        if (!title || !price || typeof price !== 'number' || typeof count !== 'number' || count < 0 || price < 0) {
            return new AwsGatewayAPIResponse(ResponseStatusCodes.INVALID_DATA, {
                errorCode: ResponseStringCodes.INVALID_DATA,
                errorMessage: '"title", "price" and "count" are required fields.'
            })
        }

        const product = await productService.createProduct({title, description, price, count})

        return new AwsGatewayAPIResponse(ResponseStatusCodes.OK, product)
    } catch (error) {
        console.error(error)

        return new AwsGatewayAPIResponse(ResponseStatusCodes.INTERNAL_SERVER_ERROR, {
            errorCode: ResponseStringCodes.INTERNAL_SERVER_ERROR,
            errorMessage: 'Something went wrong. Please try again later.'
        })
    }

}
