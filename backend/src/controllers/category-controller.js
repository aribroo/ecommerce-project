import categoryService from '../services/category-service.js';

const createCategory = async (req, res, next) => {
  try {
    const result = await categoryService.createCategory(req.body.name);

    res.status(200).json({ data: result });
  } catch (e) {
    next(e);
  }
};

const getAllCategory = async (req, res, next) => {
  try {
    const result = await categoryService.getAllCategory();

    res.status(200).json({ data: result });
  } catch (e) {
    next(e);
  }
};

const getOneCategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await categoryService.getOneCategory(id);

    res.status(200).json({ data: result });
  } catch (e) {
    next(e);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const request = req.body.name;
    const id = req.params.id;
    const result = await categoryService.updateCategory(request, id);

    res.status(200).json({ data: result });
  } catch (e) {
    next(e);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    await categoryService.deleteCategory(id);

    res.status(200).json({ data: 'OK' });
  } catch (e) {
    next(e);
  }
};

export { createCategory, getAllCategory, getOneCategory, updateCategory, deleteCategory };
