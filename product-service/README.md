# Task 3

Link to swagger http://music-store-backend-static-data-rs-scool-aws.s3-website-us-east-1.amazonaws.com/

Link to CloudFront website - https://d16amwjd31tx37.cloudfront.net

## Task 3.1
Get all products: GET https://r85lov72rb.execute-api.us-east-1.amazonaws.com/dev/products

## Task 3.2
Get  product by id: GET https://r85lov72rb.execute-api.us-east-1.amazonaws.com/dev/products/{id}

##Additional tasks done:
- Async/await is used in lambda functions
- ES6 modules are used for Product Service implementation
- Webpack is configured for Product Service
- SWAGGER documentation is created for Product Service. Link to swagger http://music-store-backend-static-data-rs-scool-aws.s3-website-us-east-1.amazonaws.com/
- Lambda handlers are covered by basic UNIT tests 
- Lambda handlers (getProductsList, getProductsById) code is written not in 1 single module (file) and separated in codebase.
- Main error scenarios are handled by API.

# Task 4

Link to swagger http://music-store-backend-static-data-rs-scool-aws.s3-website-us-east-1.amazonaws.com/

## Task 4.1
Scripts to init DB using node - product-service/database/scripts/initDataBase.js

## Task 4.2
Get all products: GET https://r85lov72rb.execute-api.us-east-1.amazonaws.com/dev/products
Get product by id: GET https://r85lov72rb.execute-api.us-east-1.amazonaws.com/dev/products/{id}

## Task 4.3
Create product: POST https://r85lov72rb.execute-api.us-east-1.amazonaws.com/dev/products

##Additional tasks done:
- POST /products lambda functions returns error 400 status code if product data is invalid
- All lambdas return error 500 status code on any error (DB connection, any unhandled error in code)
- All lambdas do console.log for each incoming requests and their arguments
- Transaction based creation of product (in case stock creation is failed then related to this stock product is not created and not ready to be used by the end user and vice versa)
