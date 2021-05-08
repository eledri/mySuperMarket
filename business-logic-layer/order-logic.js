const dal = require("../data-access-layer/dal");

// fetch all orders date by user
async function getAllOrdersByUserAsync(userId) {
  const sql = `select orderDate from orders where userId = ${userId} ORDER BY orderDate desc`;
  const orderDate = await dal.executeAsync(sql);
  return orderDate;
}

// fetch shipping dates
async function getAllOrdersAsync() {
    const sql = `select DATE_FORMAT(shippingDate,'%Y-%m-%d') as shippingDate  from orders`;
    const orders = await dal.executeAsync(sql);
    return orders;
  }

//add new order
async function addNewOrderAsync(order, cartId, userId) {
  const sql = `insert into orders values(DEFAULT, ?, ?, ?, ?, ?, ?, ?, ?) `;
  const info = await dal.executeAsync(sql, [
    userId,
    cartId,
    order.finalPrice,
    order.shippingCity,
    order.shippingStreet,
    new Date(order.shippingDate).toLocaleDateString(),
    new Date().toLocaleDateString("fr-CA"),
    order.creditCard,
  ]);
  order.userId = userId;
  order.cartId = cartId;
  order.orderId = info.insertId;
  return order;
}

module.exports = {
  addNewOrderAsync,
  getAllOrdersAsync,
  getAllOrdersByUserAsync
};
