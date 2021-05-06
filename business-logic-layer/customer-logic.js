const dal = require("../data-access-layer/dal");

//get all cart items by cartId
async function getAllCartItemsByIdAsync(cartId) {
  const sql = `SELECT productName,quantity,price,imageFileName,products.productId, cartId,categoryId, totalPrice FROM cart_items join products on cart_items.productId = products.productId WHERE cartId = ${cartId}`;
  const cartItems = await dal.executeAsync(sql);
  return cartItems;
}


//check if item in cart
async function getCartItemByIdAsync(cartId, productId) {
  const sql = `SELECT productId from cart_items where cartId = ${cartId} and ProductId = ${productId}`;
  const checkIfIsInCart = await dal.executeAsync(sql);
  if (checkIfIsInCart.length === 0) {
    return false;
  } else {
    return true;
  }
}

//add product item to cart
async function addItemAsync(item, cartId) {
  const checkIfIsInCart = await getCartItemByIdAsync(cartId, item.productId);
  if (checkIfIsInCart !== true) {
    const sql = `INSERT INTO cart_items VALUES(DEFAULT, ?, ?, ?, ?)`;
    const info = await dal.executeAsync(sql, [
      item.productId,
      item.quantity,
      cartId,
      item.price * item.quantity,
    ]);
    item.itemId = info.insertId;
    item.cartId = cartId;
    return returnProduct(cartId, item.productId);
  } else {
    return 400;
  }
}

// return the added product
async function returnProduct(cartId, productId) {
  const returnProduct = `SELECT productName,quantity,price,imageFileName,products.productId, cartId, categoryId, totalPrice FROM cart_items join products on cart_items.productId = products.productId WHERE cartId = ${cartId} and products.productId =${productId}`;
  const result = await dal.executeAsync(returnProduct);
  return result;
}

//update cart items quantity
async function updateItemQuantityAsync(item, cartId, productId) {
  const sql = `UPDATE cart_items SET
      quantity = ?,
      totalPrice = ${item.quantity * item.price}
      where cartId= ${cartId} and productId = ${productId} `;
  const info = await dal.executeAsync(sql, [item.quantity]);
  return info.affectedRows === 0 ? null : item;
}

//delete item from cart
async function deleteItemAsync(cartId, productId) {
  const sql = `delete from cart_items where cartId = ${cartId} and productId = ${productId}`;
  await dal.executeAsync(sql);
}

//delete all cart
async function deleteAllCartItemsAsync(cartId) {
  const sql = `delete from cart_items where cartId = ${cartId}`;
  await dal.executeAsync(sql);
}

// fetch cartId details
async function getCartByIdAsync(userId) {
  const sql = `select * from shopping_cart where userId = ${userId}`;
  const cart = await dal.executeAsync(sql);
  if (cart.length === 0) return null;
  return cart;
}

//add cart to user
async function addCartByUserAsync(cart, userId, date) {
  const sql = `insert into shopping_cart values(DEFAULT, ?, ?, DEFAULT) `;
  const info = await dal.executeAsync(sql, [userId, date]);
  cart.userId = userId;
  cart.date = date;
  cart.cartId = info.insertId;
  return cart;
}

//update cartStatus 0 or 1
async function updateCartStatusAsync(cart, cart_status, cartId) {
  const sql = `update shopping_cart set cart_status = '${cart_status}', date =${(new Date()).toISOString().split('T')[0]} where cartId = ${cartId} `;
  const info = await dal.executeAsync(sql);
  return info.affectedRows === 0 ? null : cart;
}

module.exports = {
  getAllCartItemsByIdAsync,
  addItemAsync,
  updateItemQuantityAsync,
  deleteItemAsync,
  getCartByIdAsync,
  addCartByUserAsync,
  updateCartStatusAsync,
  deleteAllCartItemsAsync,
};
