const express = require("express");
const productsLogic = require("../business-logic-layer/products-logic");
const verifyLoggedIn = require("../middleware/verify-logged-in");
const verifyAdmin = require("../middleware/verify-admin");
const path = require("path");
const Product = require("../models/products");

const router = express.Router();

//get all products
router.get("/",verifyLoggedIn, async (request, response) => {
    try {
      const products = await productsLogic.getAllProductsAsync();
      response.json(products);
    } catch (err) {
      response.status(500).send(err.message);
    }
  });
//get all categories
  router.get("/categories",verifyLoggedIn, async (request, response) => {
    try {
      const categories = await productsLogic.getAllCategoriesAsync();
      response.json(categories);
    } catch (err) {
      response.status(500).send(err.message);
    }
  });

//products count
router.get("/count", async (request, response) => {
    try {
      const products = await productsLogic.getAllProductsAsync();
      response.json(products.length);
    } catch (err) {
      response.status(500).send(err.message);
    }
  });


//get product by id
router.get("/:productId", verifyLoggedIn, async (request, response) => {
  try {
    const productId = +request.params.productId;
    const product = await productsLogic.getProductByIdAsync(productId);
    response.json(product);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

//get all products by categoryId
router.get("/category/:categoryId", verifyLoggedIn, async (request, response) => {
    try {
      const categoryId = +request.params.categoryId;
      const products = await productsLogic.getProductsByCategoryIdAsync(categoryId);
      response.json(products);
    } catch (err) {
      response.status(500).send(err.message);
    }
  });

  //add new product - admin only!
  router.post("/", verifyAdmin, async (request, response) => {
    try {
      const product = new Product(request.body);
      const error = product.validatePost();
      if(error) {
          response.status(400).send(error);
          return;
      }
      const addedProduct = await productsLogic.addProductAsync(
        product,
        request.files ? request.files.image : null
      );
      response.status(201).send(addedProduct);
    } catch (err) {
      response.status(500).send(err.message);
    }
  });

//edit product - admin only!
  router.put("/:productId", verifyAdmin, async (request, response) => {
    try {
        const product = new Product(request.body);
        product.productId = +request.params.productId;
      const error = product.validatePut();
      if(error) {
          response.status(400).send(error);
          return;
      }
      const updatedProduct = await productsLogic.updateFullProductAsync(
        product,
        request.files ? request.files.image : null
      );
      if (!updatedProduct) {
        response.status(404).send(`id ${product.productId} not found.`);
        return;
      }
      response.json(updatedProduct);
    } catch (err) {
      response.status(500).send(err.message);
    }
  });


router.get("/images/:ImageFileName", (request, response) => {
  const ImageFileName = request.params.ImageFileName;
  let reqPath = path.join(__dirname, "../");
  response.sendFile(reqPath + "/images/" + ImageFileName);
});

module.exports = router;
