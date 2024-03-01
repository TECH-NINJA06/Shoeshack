import Product from '../models/products.models'

function addProducts(products) {
  return Product.insertMany(products);
}

// Export the function
module.exports = {
  addProducts: addProducts
};
