const express = require("express");
const authLogic = require("../business-logic-layer/auth-logic");
const router = express.Router();
const User = require("../models/login");
const cartLogic = require("../business-logic-layer/customer-logic");
const Cart = require("../models/cart");

router.post("/register/", async (request, response) => {
  try {
    const user = new User(request.body);
    const cart = new Cart(request.body)
    const error = user.validateRegister();
    if (error) {
      response.status(400).send(error);
      return;
    }
    const addedUser = await authLogic.registerAsync(user);
    await cartLogic.addCartByUserAsync(cart,user.userId, new Date().toLocaleDateString())
    response.status(201).json(addedUser);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

router.post("/login", async (request, response) => {
  try {
    const user = new User(request.body);
    const error = user.validateLogin();
    if (error) {
      response.status(400).send(error);
      return;
    }
    const loggedInUser = await authLogic.loginAsync(user);
    if (!loggedInUser)
      return response.status(401).send("שם משתמש או סיסמה אינם נכונים");
    response.json(loggedInUser);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

router.get("/duplicate/:value", async (request, response) => {
  try {
    const value = request.params.value;
    const result = await authLogic.getDuplicateAsync(value);
    response.json(result);
  } catch (err) {
    response.status(500).send(err.message);
  }
});



module.exports = router;
