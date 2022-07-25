import { APIGatewayProxyEvent } from 'aws-lambda'

import {ResponseStringCodes, ResponseStatusCodes} from '../../common/types'
import {productService} from '../../common/services/product'
import {AwsGatewayAPIResponse} from '../../common/entities/AwsGatewayAPIResponse'
import {logRequest} from '../../common/utils/logRequest'

export const handler = async (event: APIGatewayProxyEvent) => {
    try {
        logRequest(event)

        const {id} = event.pathParameters || {} as {id?: string}

        if (!id) {
            return new AwsGatewayAPIResponse(ResponseStatusCodes.INVALID_DATA, {
                errorCode: ResponseStringCodes.INVALID_DATA,
                errorMessage: `Product id param is required.`
            })
        }

        const product = await productService.getProductById(id)

        if (!product) {
            return new AwsGatewayAPIResponse(ResponseStatusCodes.NOT_FOUND, {
                errorCode: ResponseStringCodes.NOT_FOUND,
                errorMessage: `Item with id ${id} not found.`
            })
        }

        return new AwsGatewayAPIResponse(ResponseStatusCodes.OK, product)
    } catch (error: any) {
        if (error.code === '22P02') {
            return new AwsGatewayAPIResponse(ResponseStatusCodes.INVALID_DATA, {
                errorCode: ResponseStringCodes.INVALID_DATA,
                errorMessage: `Product id has invalid valid value.`
            })
        }

        console.error(error)

        return new AwsGatewayAPIResponse(ResponseStatusCodes.INTERNAL_SERVER_ERROR, {
            errorCode: ResponseStringCodes.INTERNAL_SERVER_ERROR,
            errorMessage: 'Something went wrong. Please try again later.'
        })
    }

}
