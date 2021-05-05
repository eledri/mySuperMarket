const express = require("express");
const orderLogic = require("../business-logic-layer/order-logic");
const verifyLoggedIn = require("../middleware/verify-logged-in");
const Order = require("../models/order");
const router = express.Router();




//orders count
router.get("/count", async (request, response) => {
    try {
      const orders = await orderLogic.getAllOrdersAsync();
      response.json(orders.length);
    } catch (err) {
      response.status(500).send(err.message);
    }
  });

  router.get("/", async (request, response) => {
    try {
      const orders = await orderLogic.getAllOrdersAsync();
      response.json(orders);
    } catch (err) {
      response.status(500).send(err.message);
    }
  });




  //get cartId by user
router.get("/cartId/:userId", verifyLoggedIn, async (request, response) => {
    try {
      const userId = +request.params.userId;
      const cartId = await orderLogic.getCartIdAsync(userId);
      response.json(cartId);
    } catch (err) {
      response.status(500).send(err.message);
    }
  });
//get sum of items
router.get("/:cartId", verifyLoggedIn, async (request, response) => {
  try {
    const cartId = +request.params.cartId;
    const items = await orderLogic.getAllOrderItemsByIdAsync(cartId);
    response.json(items);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

router.delete("/:cartId/:productId", async (request, response) => {
    try {
      const cartId = request.params.cartId;
      const productId = request.params.productId;
       await orderLogic.deleteCartItemAsync(cartId,productId);
       response.sendStatus(204);
    } catch (err) {
      response.status(500).send(err.message);
    }
  });




//add new order
router.post("/:cartId/:userId", verifyLoggedIn, async (request, response) => {
  try {
    const cartId = +request.params.cartId;
    const userId = +request.params.userId;
    const order = new Order(request.body);
    const error = order.validatePost();
    if (error) {
      response.status(400).send(error);
      return;
    }
    const addedOrder = await orderLogic.addNewOrderAsync(order, cartId, userId);
    response.status(201).send(addedOrder);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

router.get("/last-order/:userId", async (request, response) => {
    try {
        const userId = +request.params.userId
      const orderDate = await orderLogic.getAllOrdersByUserAsync(userId);
      response.json(orderDate);
    } catch (err) {
      response.status(500).send(err.message);
    }
  });



module.exports = router;
