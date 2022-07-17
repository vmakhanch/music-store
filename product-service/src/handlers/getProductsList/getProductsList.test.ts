import {ResponseStatusCodes, ResponseStringCodes} from '../../common/types'
import {productService} from '../../common/services/product'

import {handler} from './getProductsList'
import {testData} from './testData'

jest.mock('../../common/services/product', () => ({
    productService: {
        getAllProducts: jest.fn()
    }
}));

describe('getProductsList handler', () => {
    const awsGatewayApiEvent = {} as any
    describe('positive cases', () => {
        beforeAll(() => {
            (productService.getAllProducts as jest.Mock<any>).mockImplementation(() => testData)
        })

        it('return correct data', async () => {
            const result = await handler(awsGatewayApiEvent)
            const body = JSON.parse(result.body!)

            expect(result.statusCode).toEqual(ResponseStatusCodes.OK)
            expect(body.length).toEqual(testData.length)
        })
    })

    describe('negative cases', () => {
        beforeAll(() => {
            (productService.getAllProducts as jest.Mock<any>).mockImplementation(() => {
                throw new Error('Internal server error')
            })
        })

        it('return correct data', async () => {
            const result = await handler(awsGatewayApiEvent)
            const error = JSON.parse(result.body!)

            expect(result.statusCode).toEqual(ResponseStatusCodes.INTERNAL_SERVER_ERROR)
            expect(error.errorCode).toEqual(ResponseStringCodes.INTERNAL_SERVER_ERROR)
        })
    })
})
