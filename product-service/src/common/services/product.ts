import axios from 'axios'

import {Product} from '../types/Product'

const PRODUCTS_DATA_URL = 'http://music-store-backend-static-data-rs-scool-aws.s3-website-us-east-1.amazonaws.com/data.json'

const getAllProducts = async (): Promise<Product[]> => {
    const response = await axios.get(PRODUCTS_DATA_URL)

    return response.data
}


export const productService = {
    getAllProducts: getAllProducts
}
