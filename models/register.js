const Joi = require("joi"); // npm i joi

class Register{
    constructor(existingUser) {
        this.userId = existingUser.userId;
        this.id = existingUser.id;
        this.username = existingUser.username;
        this.password = existingUser.password;
        this.isAdmin = existingUser.isAdmin;
        this.firstName = existingUser.firstName;
        this.lastName = existingUser.lastName;
        this.city = existingUser.city;
        this.street = existingUser.street;
    }

    static #RegisterValidationSchema = Joi.object({
        userId: Joi.number().optional(),
        id: Joi.number().required(),
        username: Joi.string().required(),
        password: Joi.string().required(),
        isAdmin: Joi.number().optional(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        city: Joi.string().required(),
        street: Joi.string().required()
    });

 
    validateRegister() {
        const result = Register.#RegisterValidationSchema.validate(this, { abortEarly: false });
        return result.error ? result.error.message : null; 
    }

}

module.exports = Register;