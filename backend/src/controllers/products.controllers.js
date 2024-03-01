import productService from '../services/products.services.js'


function addProducts(req, res) {
    productService.addProducts(req.body.products)
      .then(() => {
        res.status(201).send('Products added successfully');
      })
      .catch(error => {
        console.error('Error adding products:', error);
        res.status(500).send('Internal Server Error');
      });
  }
  
  // Export the function
  module.exports = {
    addProducts: addProducts
  };