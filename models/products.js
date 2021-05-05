const Joi = require("joi"); // npm i joi

class Products {

    constructor(existingProduct) {
        this.productId = existingProduct.productId;
        this.productName = existingProduct.productName;
        this.categoryId = existingProduct.categoryId;
        this.price = existingProduct.price;
        this.imageFileName = existingProduct.imageFileName;

    }

    static #postValidationSchema = Joi.object({
        productId: Joi.number().optional(),
        productName: Joi.string().required(),
        categoryId: Joi.number().optional(),
        price: Joi.number().required().min(0.1),
        imageFileName: Joi.string().optional(),
    });

    static #putValidationSchema = Joi.object({
        productId: Joi.number().optional(),
        productName: Joi.string().required(),
        categoryId: Joi.number().required(),
        price: Joi.number().required().min(0.1),
        imageFileName: Joi.string().optional(),
    });
 
    validatePost() {
        const result = Products.#postValidationSchema.validate(this, { abortEarly: false });
        return result.error ? result.error.message : null; 
    }
    validatePut() {
        const result = Products.#putValidationSchema.validate(this, { abortEarly: false });
        return result.error ? result.error.message : null; 
    }

}

module.exports = Products;