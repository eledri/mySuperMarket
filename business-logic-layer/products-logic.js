const dal = require("../data-access-layer/dal");

//get all products
async function getAllProductsAsync() {
  const sql = `select * from products`;
  const products = await dal.executeAsync(sql);
  return products;
}

//get one product by id
async function getProductByIdAsync(productId) {
    const sql = `select * from products where productId = ${productId}`;
    const product = await dal.executeAsync(sql);
    return product;
  }

  //get categories
async function getAllCategoriesAsync() {
    const sql = `select * from categories `;
    const categories = await dal.executeAsync(sql);
    return categories;
  }

//get all products by categoryId
async function getProductsByCategoryIdAsync(categoryId) {
    const sql = `select * from products where categoryId = ${categoryId}`;
    const products = await dal.executeAsync(sql);
    return products;
  }

//add new product - admin only!
  async function addProductAsync(product, image) {
    let newFileName = null;
    if (image) {
      newFileName = image.name;
      await image.mv("./images/" + newFileName);
    }
    const sql = `insert into products values (default,?,?,?,?)`
    const values = [product.productName, product.categoryId , product.price, product.imageFileName]
    const info = await dal.executeAsync(sql, values)
    product.productId = info.insertId
    return product;
  }

  // edit full product
async function updateFullProductAsync(product, image) {
    let newFileName = null;
    if (image) {
      newFileName = image.name;
      await image.mv("./images/" + newFileName);
    } else {
      newFileName = product.imageFileName;
    }
    const sql = `UPDATE products SET
    productName = ?,
    categoryId = ?,
    price = ?,
    imageFileName = ?
    WHERE productId = ${product.productId}`;
    const values = [product.productName, product.categoryId , product.price, product.imageFileName]
    const info = await dal.executeAsync(sql, values)
    return info.affectedRows === 0 ? null : product;
  }


module.exports = {
  getAllProductsAsync,
  getProductByIdAsync,
  getProductsByCategoryIdAsync,
  addProductAsync,
  getAllCategoriesAsync,
  updateFullProductAsync
};
