import {ResponseStringCodes, ResponseStatusCodes} from '../../common/types'
import {handler} from './getProductsById'
import {productService} from '../../common/services/product'
import {testData} from './testData'

jest.mock('../../common/services/product', () => ({
    productService: {
        getAllProducts: jest.fn()
    }
}));

describe('getProductsById handler', () => {
    describe('without API error', () => {
        beforeAll(() => {
            (productService.getAllProducts as jest.Mock<any>).mockImplementation(() => testData)
        })

        it('return existing product', async () => {
            const productId = '7567ec4b-b10c-48c5-9345-fc73c48a80a0'
            const awsGatewayApiEvent = {
                pathParameters: {
                    id: productId
                }
            } as any
            const result = await handler(awsGatewayApiEvent)
            const product = JSON.parse(result.body!)

            expect(result.statusCode).toEqual(ResponseStatusCodes.OK)
            expect(product.id).toEqual(productId)
        })

        it('return a not found error if product with id does not exist', async () => {
            const productId = '7567ec4b-b10c-48c5-9345-fc73c48a80a01'
            const awsGatewayApiEvent = {
                pathParameters: {
                    id: productId
                }
            } as any
            const result = await handler(awsGatewayApiEvent)
            const error = JSON.parse(result.body!)

            expect(result.statusCode).toEqual(ResponseStatusCodes.NOT_FOUND)
            expect(error.errorCode).toEqual(ResponseStringCodes.NOT_FOUND)
        })


        it('return an invalid data error if required params has been not passed', async () => {
            const awsGatewayApiEvent = {
                pathParameters: {}
            } as any
            const result = await handler(awsGatewayApiEvent)
            const error = JSON.parse(result.body!)

            expect(result.statusCode).toEqual(ResponseStatusCodes.INVALID_DATA)
            expect(error.errorCode).toEqual(ResponseStringCodes.INVALID_DATA)
        })
    })

    describe('with API error', () => {
        beforeAll(() => {
            (productService.getAllProducts as jest.Mock<any>).mockImplementation(() => {
                throw new Error('Internal server error')
            })
        })

        it('return correct data', async () => {
            const productId = '7567ec4b-b10c-48c5-9345-fc73c48a80a0'
            const awsGatewayApiEvent = {
                pathParameters: {
                    id: productId
                }
            } as any
            const result = await handler(awsGatewayApiEvent)
            const error = JSON.parse(result.body!)

            expect(result.statusCode).toEqual(ResponseStatusCodes.INTERNAL_SERVER_ERROR)
            expect(error.errorCode).toEqual(ResponseStringCodes.INTERNAL_SERVER_ERROR)
        })
    })
})
