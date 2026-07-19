import Joi from "joi";

const itemScheme = Joi.object({
    name: Joi.string().min(3).required(),
    description: Joi.string().min(10).required(),
});

const validateItem = (req, res, next) => {
    const { error } = itemScheme.validate(req.body);
    if (error) return res.status(400).json({
        status: 400,
        message: error.details[0].message
    });
    next();
};

export default validateItem;