import { APIGatewayProxyEvent } from 'aws-lambda'

import {Product, ResponseStringCodes, ResponseStatusCodes} from '../../common/types'
import {productService} from '../../common/services/product'
import {AwsGatewayAPIResponse} from '../../common/entities/AwsGatewayAPIResponse'

export const handler = async (event: APIGatewayProxyEvent) => {
    try {
        const {id} = event.pathParameters || {} as {id?: string}

        if (!id) {
            return new AwsGatewayAPIResponse(ResponseStatusCodes.INVALID_DATA, {
                errorCode: ResponseStringCodes.INVALID_DATA,
                errorMessage: `Product id param is required.`
            })
        }

        const response = await productService.getAllProducts()
        const product = response.find((item: Product) => item.id === id)

        if (!product) {
            return new AwsGatewayAPIResponse(ResponseStatusCodes.NOT_FOUND, {
                errorCode: ResponseStringCodes.NOT_FOUND,
                errorMessage: `Item with id ${id} not found.`
            })
        }

        return new AwsGatewayAPIResponse(ResponseStatusCodes.OK, product)
    } catch {
        return new AwsGatewayAPIResponse(ResponseStatusCodes.INTERNAL_SERVER_ERROR, {
            errorCode: ResponseStringCodes.INTERNAL_SERVER_ERROR,
            errorMessage: 'Something went wrong. Please try again later.'
        })
    }

}
