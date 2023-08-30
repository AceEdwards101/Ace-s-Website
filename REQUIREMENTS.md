# Assignment Requirements

## Server API

The server API is provided initially by the `json-server` module from 
the file `server/sampledata.json`.  See the JSON file for examples of the
JSON objects that will be returned.  See
[the `json-server` documentation](https://github.com/typicode/json-server)
for details of the complete API that is provided.

The following endpoints should be useful in building this project:

* GET `/products` - retrieve an array of products for the store.
* GET `/products/<id>` - retrieve one product with the given `id=<id>`
* GET `/orders?user_id=<id>` - retrieve the array of orders for this user `id=<id>`
* GET `/categories` - get the product category names and a user friendly name for them
* GET `/tags` - get an array of all tag names used for products
* POST `/orders` - create a new order

You might want to use the query parameters to find products in a category, eg.
`/products?category=apparel`.

We are not going to implement authentication in this project but we will
pretend that there is a logged in user and that you can get their
details using the following API endpoints:

* GET `/session` - retrieve the current user session
* GET `/users/<id>` - retrieve the details for one user with `id=<id>`

Your application should query the server for the current session and then
use the user id it contains to identify the 'logged in' user and then
retrieve their details via a query to `/users/1` (if the user has id `1`).

The sample data is adapted from
[this Shopify repository](https://github.com/shopifypartners/product-csvs)
with a few modifications and converted to JSON format.  This data is used to
demonstrate the Shopify web software, if you search for some of the product
descriptions you'll find lots of examples on the web.

## React Front End

Your front end should present an online store with the products
displayed in a user friendly manner.  The user should be able to
add products to their shopping cart and then go through a checkout
process to place an order.  The key requirements are as follows:

* Browsable display of products including thumbnail images
* Product detail page showing all product details available and allowing
  the user to add the product to their shopping cart
* A page to view the contents of the shopping cart, update/remove items and quantities
* The option to confirm the order that will create a new order on the server
* A page to list the current orders for the user.
