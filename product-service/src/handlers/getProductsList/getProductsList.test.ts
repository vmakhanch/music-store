import {ResponseStatusCodes, ResponseStringCodes} from '../../common/types'
import {handler} from './getProductsList'
import {testData} from './testData'
import {productService} from '../../common/services/product'

jest.mock('../../common/services/product', () => ({
    productService: {
        getAllProducts: jest.fn()
    }
}));

describe('getProductsList handler', () => {
    describe('positive cases', () => {
        beforeAll(() => {
            (productService.getAllProducts as jest.Mock<any>).mockImplementation(() => testData)
        })

        it('return correct data', async () => {
            const result = await handler()
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
            const result = await handler()
            const error = JSON.parse(result.body!)

            expect(result.statusCode).toEqual(ResponseStatusCodes.INTERNAL_SERVER_ERROR)
            expect(error.errorCode).toEqual(ResponseStringCodes.INTERNAL_SERVER_ERROR)
        })
    })
})
