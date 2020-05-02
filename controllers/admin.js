const Product = require('../models/product');


//takes the user to the add product page
exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};

//posts added product
exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const product = new Product(title, price);
  product.save();
  res.redirect('/');
};


//gets a list of all the products
exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};
