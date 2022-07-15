# Task 3

Link to swagger http://music-store-backend-static-data-rs-scool-aws.s3-website-us-east-1.amazonaws.com/

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
