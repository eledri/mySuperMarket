const Joi = require("joi"); // npm i joi

class Cart {

    constructor(existingCart) {
        this.cartId = existingCart.cartId;
        this.userId = existingCart.userId;
        this.cart_status = existingCart.cart_status;
        this.date = existingCart.date;
    }

    static #postValidationSchema = Joi.object({
        cartId: Joi.number().optional(),
        userId: Joi.number().optional(),
        date: Joi.date().required(),

    });

    static #patchValidationSchema = Joi.object({
        cartId: Joi.number().optional(),
        userId: Joi.number().optional(),
        cart_status: Joi.number().optional(),
        date: Joi.date().optional(),
    });
 
    validatePost() {
        const result = Cart.#postValidationSchema.validate(this, { abortEarly: false });
        return result.error ? result.error.message : null; 
    }
    validatePut() {
        const result = Cart.#patchValidationSchema.validate(this, { abortEarly: false });
        return result.error ? result.error.message : null; 
    }

}

module.exports = Cart;