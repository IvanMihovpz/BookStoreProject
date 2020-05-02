const fs = require('fs');
const path = require('path');

//imports book data from json file
const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'bookshop-11b54-Books-export'
);

//gets products from file
const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

//class product and its attributes
module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.price = price;
  }

  //saves products from file
  save() {
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }

  //fetches products
  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
};
