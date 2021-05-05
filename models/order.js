const Joi = require("joi"); // npm i joi
class Order {
    constructor(existingOrder) {
        this.orderId = existingOrder.orderId;
        this.userId = existingOrder.userId;
        this.cartId = existingOrder.cartId;
        this.finalPrice = existingOrder.finalPrice;
        this.shippingCity = existingOrder.shippingCity;
        this.shippingStreet = existingOrder.shippingStreet;
        this.shippingDate = existingOrder.shippingDate;
        this.orderDate = existingOrder.orderDate;
        this.creditCard = existingOrder.creditCard;
    }

    static #postValidationSchema = Joi.object({
        orderId: Joi.number().optional(),
        userId: Joi.number().optional(),
        cartId: Joi.number().optional(),
        finalPrice: Joi.number().required(),
        shippingCity: Joi.string().required(),
        shippingStreet: Joi.string().required(),
        shippingDate: Joi.date().required(),
        orderDate: Joi.date().optional(),
        creditCard: Joi.number().required().min(4)

    });

    static #putValidationSchema = Joi.object({
        orderId: Joi.number().optional(),
        userId: Joi.number().optional(),
        cartId: Joi.number().optional(),
        finalPrice: Joi.number().required(),
        shippingCity: Joi.string().required(),
        shippingStreet: Joi.string().required(),
        shippingDate: Joi.date().required(),
        orderDate: Joi.date().required(),
        creditCard: Joi.number().required().min(4)
    });
 
    validatePost() {
        const result = Order.#postValidationSchema.validate(this, { abortEarly: false });
        return result.error ? result.error.message : null; 
    }
    validatePut() {
        const result = Order.#putValidationSchema.validate(this, { abortEarly: false });
        return result.error ? result.error.message : null; 
    }

}
module.exports = Order;
