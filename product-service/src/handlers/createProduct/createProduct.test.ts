import {ResponseStringCodes, ResponseStatusCodes} from '../../common/types'
import {productService} from '../../common/services/product'

import {handler} from './createProduct'
import {testData} from './testData'

jest.mock('../../common/services/product', () => ({
    productService: {
        createProduct: jest.fn()
    }
}));

describe('createProduct handler', () => {
    describe('without API error', () => {
        beforeAll(() => {
            (productService.createProduct as jest.Mock<any>).mockImplementation(data => data)
        })

        it('return existing product', async () => {
            const awsGatewayApiEvent = {
                body: JSON.stringify(testData)
            } as any
            const result = await handler(awsGatewayApiEvent)
            const product = JSON.parse(result.body!)

            expect(result.statusCode).toEqual(ResponseStatusCodes.OK)
            expect(testData.title).toEqual(product.title)
        })

        it('return an invalid data error if required params has been not passed', async () => {
            const awsGatewayApiEvent = {
                body: JSON.stringify({})
            } as any
            const result = await handler(awsGatewayApiEvent)
            const error = JSON.parse(result.body!)

            expect(result.statusCode).toEqual(ResponseStatusCodes.INVALID_DATA)
            expect(error.errorCode).toEqual(ResponseStringCodes.INVALID_DATA)
        })
    })

    describe('with API error', () => {
        beforeAll(() => {
            (productService.createProduct as jest.Mock<any>).mockImplementation(() => {
                throw new Error('Internal server error')
            })
        })

        it('return correct data', async () => {
            const awsGatewayApiEvent = {
                body: JSON.stringify(testData)
            } as any
            const result = await handler(awsGatewayApiEvent)
            const error = JSON.parse(result.body!)

            expect(result.statusCode).toEqual(ResponseStatusCodes.INTERNAL_SERVER_ERROR)
            expect(error.errorCode).toEqual(ResponseStringCodes.INTERNAL_SERVER_ERROR)
        })
    })
})
