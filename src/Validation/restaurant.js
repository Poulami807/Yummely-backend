import joi from 'joi';

export const validateRestaurantCity= (resObj) => {
    const schema = joi.object({
        city: joi.string().required()
    })

    return schema.validateAsync(resObj);
};

export const validateRestaurantSearchString = (resObj) => {
    const schema = joi.object({
        searchString: joi.string().required()
    })

    return schema.validateAsync(resObj);
};