const express = require("express");
const verifyLoggedIn = require("../middleware/verify-logged-in");
const customerLogic = require("../business-logic-layer/customer-logic");
const router = express.Router();
const Item = require("../models/items");
const Cart = require("../models/cart");

//get all cartItems by cartId
router.get("/:cartId", verifyLoggedIn, async (request, response) => {
  try {
    const cartId = +request.params.cartId;
    const items = await customerLogic.getAllCartItemsByIdAsync(cartId);
    response.json(items);
  } catch (err) {
    response.status(500).send(err.message);
  }
});



//delete all cart items
router.delete("/empty-cart/:cartId", verifyLoggedIn, async (request, response) => {
    try {
      const cartId = +request.params.cartId;
      await customerLogic.deleteAllCartItemsAsync(cartId);
      response.sendStatus(204);
    } catch (err) {
      response.status(500).send(err.message);
    }
  });

//delete item
router.delete("/:cartId/:productId", verifyLoggedIn, async (request, response) => {
    try {
      const cartId = +request.params.cartId;
      const productId = +request.params.productId;
      await customerLogic.deleteItemAsync(cartId,productId);
      response.sendStatus(204);
    } catch (err) {
      response.status(500).send(err.message);
    }
    
  });

//update items quantity
router.put("/update/:cartId/:productId", verifyLoggedIn, async (request, response) => {
  try {
    const productId = +request.params.productId;
    const cartId = +request.params.cartId;
    const item = new Item(request.body);
    const error = item.validatePut();
    if (error) {
      response.status(400).send(error);
      return;
    }
    const updatedItem = await customerLogic.updateItemQuantityAsync(
      item,
      cartId,
      productId
    );
    response.status(201).send(updatedItem);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

//update cartStatus
router.put("/cart-status/:cartId/:cart_status", verifyLoggedIn, async (request, response) => {
    try {
      const cartId = +request.params.cartId;
      const cart_status = +request.params.cart_status;
      const cartStatus = new Cart(request.body);
      const error = cartStatus.validatePut();
      if (error) {
        response.status(400).send(error);
        return;
      }
      const updatedStatus = await customerLogic.updateCartStatusAsync(
        cartStatus,
        cart_status,
        cartId,
      );
      response.status(201).send(updatedStatus);
    } catch (err) {
      response.status(500).send(err.message);
    }
  });


//add new cart item
router.post("/:cartId/", verifyLoggedIn, async (request, response) => {
    try {
      const cartId = +request.params.cartId;
      const item = new Item(request.body);
      const error = item.validatePost();
      if (error) {
        response.status(400).send(error);
        return;
      }
      const addedItem = await customerLogic.addItemAsync(item, cartId);
      response.status(201).send(addedItem[0]);
    } catch (err) {
      response.status(500).send(err.message);
    }
  });


//get sum of items
router.get("/:cartId", verifyLoggedIn, async (request, response) => {
  try {
    const cartId = +request.params.cartId;
    const items = await customerLogic.getAllOrderItemsByIdAsync(cartId);
    response.json(items);
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
    const addedOrder = await customerLogic.addNewOrderAsync(
      order,
      cartId,
      userId
    );
    response.status(201).send(addedOrder);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

router.get("/cartId/:userId", verifyLoggedIn, async (request, response) => {
  try {
    const userId = +request.params.userId;
    const cart = await customerLogic.getCartByIdAsync(userId);
    response.json(cart);
  } catch (err) {
    response.status(500).send(err.message);
  }
});


module.exports = router;
