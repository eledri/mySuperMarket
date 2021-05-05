const Joi = require("joi"); // npm i joi

class User {

    constructor(existingUser) {
        this.userId = existingUser.userId;
        this.id = existingUser.id;
        this.username = existingUser.username;
        this.password = existingUser.password;
        this.isAdmin = existingUser.isAdmin;
        this.token = existingUser.token;
        this.isAdmin = existingUser.isAdmin;
        this.firstName = existingUser.firstName;
        this.lastName = existingUser.lastName;
        this.city = existingUser.city;
        this.street = existingUser.street;
    }

    static #LoginValidationSchema = Joi.object({
        userId: Joi.number().optional(),
        id: Joi.number().optional(),
        username: Joi.string().required(),
        password: Joi.string().required(),
        token: Joi.number().optional(),
        isAdmin: Joi.boolean().optional(),
        firstName: Joi.string().optional(),
        lastName: Joi.string().optional(),
        city: Joi.string().optional(),
        street: Joi.string().optional()
    });

    static #RegisterValidationSchema = Joi.object({
        userId: Joi.number().optional(),
        id: Joi.number().required(),
        username: Joi.string().required(),
        password: Joi.string().required(),
        token: Joi.number().optional(),
        isAdmin: Joi.boolean().optional(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        city: Joi.string().required(),
        street: Joi.string().required()
    });

 
    validateLogin() {
        const result = User.#LoginValidationSchema.validate(this, { abortEarly: false });
        return result.error ? result.error.message : null; 
    }

    validateRegister() {
        const result = User.#RegisterValidationSchema.validate(this, { abortEarly: false });
        return result.error ? result.error.message : null; 
    }

}

module.exports = User;