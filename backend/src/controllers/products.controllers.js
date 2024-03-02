
// function addProducts(req, res) {
//   ProductService(req.body.products)
//     .then(() => {
//       res.status(201).send("Products added successfully");
//     })
//     .catch((error) => {
//       console.error("Error adding products:", error);
//       res.status(500).send("Internal Server Error");
//     });
// }

// export default addProducts;


import Product from '../models/products.models'

// Controller function to handle the request to add a product
async function addProduct(req, res) {
  try {
    const authenticatedUser = req.user;
    const { name, description, brand, price, sizes, images, category, inventory, gender } = req.body;

    const newProduct = {
      name: name,
      description: description,
      brand: brand,
      price: price,
      sizes: sizes,
      // images: images,
      category: category,
      inventory: inventory,
      gender: gender,
      addedBy: authenticatedUser._id 
    };

    const savedProduct = await Product.save(newProduct);
    console.log(savedProduct)

    res.status(201).send('Product added successfully');
  } catch (error) {
    console.log('Error adding product:', error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = {
  addProduct: addProduct
};
