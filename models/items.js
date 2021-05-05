const Joi = require("joi");

class Items {
    constructor(existingItem) {
        this.itemId = existingItem.itemId;
        this.productId = existingItem.productId;
        this.quantity = existingItem.quantity;
        this.price = existingItem.price;
        this.totalPrice = existingItem.totalPrice;
        this.cartId = existingItem.cartId;
    }

    static #postValidationSchema = Joi.object({
        itemId: Joi.number().optional(),
        productId: Joi.number().required(),
        quantity: Joi.number().required().min(0.5).max(100),
        totalPrice: Joi.number().optional(),
        price: Joi.number().required().min(0),
        cartId: Joi.number().optional(),
    });
    static #putValidationSchema = Joi.object({
        itemId: Joi.number().optional(),
        productId: Joi.number().optional(),
        quantity: Joi.number().optional().min(0.5).max(100),
        totalPrice: Joi.number().optional(),
        cartId: Joi.number().optional(),
        price: Joi.number().optional().min(0),

    });
    validatePost() {
        const result = Items.#postValidationSchema.validate(this, { abortEarly: false });
        return result.error ? result.error.message : null; 
    }
    validatePut() {
        const result = Items.#putValidationSchema.validate(this, { abortEarly: false });
        return result.error ? result.error.message : null; 
    }

}
module.exports = Items;