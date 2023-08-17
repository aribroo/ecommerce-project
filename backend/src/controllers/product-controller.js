import productService from '../services/product-service.js';

const createProduct = async (req, res, next) => {
  try {
    const file = req.file;
    const request = req.body;

    const result = await productService.createProduct(file, request);

    res.status(200).json({ data: result });
  } catch (e) {
    next(e);
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    const result = await productService.getAllProducts(req.query);

    res.status(200).json({ data: result });
  } catch (e) {
    next(e);
  }
};

const getOneProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await productService.getOneProduct(id);

    res.status(200).json({ data: result });
  } catch (e) {
    next(e);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const file = req.file;
    const request = req.body;

    const result = await productService.updateProduct(id, file, request);

    res.status(200).json({ data: result });
  } catch (e) {
    next(e);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    await productService.deleteProduct(id);

    res.status(200).json({ data: 'OK' });
  } catch (e) {
    next(e);
  }
};

export { createProduct, getAllProducts, getOneProduct, updateProduct, deleteProduct };
