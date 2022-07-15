import {productService} from '../../common/services/product'
import {AwsGatewayAPIResponse} from '../../common/entities/AwsGatewayAPIResponse'
import {ResponseStatusCodes, ResponseStringCodes} from '../../common/types'

export const handler = async () => {
    try {
        const products = await productService.getAllProducts()

        return new AwsGatewayAPIResponse(ResponseStatusCodes.OK, products)
    } catch {
        return new AwsGatewayAPIResponse(ResponseStatusCodes.INTERNAL_SERVER_ERROR, {
            errorCode: ResponseStringCodes.INTERNAL_SERVER_ERROR,
            errorMessage: 'Something went wrong. Please try again later.'
        })
    }
}

