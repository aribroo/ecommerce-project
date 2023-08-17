import { createCategoryValidation, getCategoryValidation } from '../validation/category-schema.js';
import { validate } from '../validation/validation.js';
import db from '../models/bundle-model.js';
import { ResponseError } from '../error/response-error.js';

const createCategory = async (request) => {
  request = validate(createCategoryValidation, request);

  return db.category.create(
    {
      name: request
    },
    {
      attributes: ['id', 'name']
    }
  );
};

const getAllCategory = async () => {
  return db.category.findAll({
    attributes: ['id', 'name']
  });
};

const getOneCategory = async (id) => {
  id = validate(getCategoryValidation, id);

  const category = await db.category.findOne({
    where: { id },
    attributes: ['id', 'name']
  });

  if (!category) throw new ResponseError(404, 'Category is not found');

  return category;
};

const updateCategory = async (request, id) => {
  request = validate(createCategoryValidation, request);
  id = validate(getCategoryValidation, id);

  const category = await db.category.update(
    {
      name: request
    },
    {
      where: { id }
    }
  );

  if (category[0] === 0) throw new ResponseError(404, 'Category is not found');

  return {
    id: id,
    name: request
  };
};

const deleteCategory = async (id) => {
  id = validate(getCategoryValidation, id);

  const category = await db.category.destroy({
    where: { id }
  });

  if (category === 0) throw new ResponseError(404, 'Category is not found');
};

export default { createCategory, getAllCategory, getOneCategory, updateCategory, deleteCategory };
