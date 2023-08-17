import frontendService from '../services/frontend-service.js';

const getProductHomepage = async (req, res, next) => {
  try {
    const result = await frontendService.getProductHomepage();

    res.status(200).json({ data: result });
  } catch (e) {
    next(e);
  }
};

const productDetails = async (req, res, next) => {
  try {
    const url = req.params.url;
    const result = await frontendService.productDetail(url);

    res.status(200).json({ data: result });
  } catch (e) {
    next(e);
  }
};

const searchProducts = async (req, res, next) => {
  try {
    const result = await frontendService.searchProducts(req.query);

    res.status(200).json({ data: result });
  } catch (e) {
    next(e);
  }
};

const addToCart = async (req, res, next) => {
  try {
    const request = req.body;
    const result = await frontendService.addToCart(request);

    res.status(200).json({ data: result });
  } catch (e) {
    next(e);
  }
};

const updateCart = async (req, res, next) => {
  try {
    const id = req.params.id;
    const request = req.body;
    const result = await frontendService.updateCart(id, request);

    res.status(200).json({ data: result });
  } catch (e) {
    next(e);
  }
};

const getCart = async (req, res, next) => {
  try {
    const query = req.query;
    const result = await frontendService.getCart(query);

    res.status(200).json({ data: result });
  } catch (e) {
    next(e);
  }
};

const deleteCart = async (req, res, next) => {
  try {
    const id = req.params.id;
    await frontendService.deleteCart(id);

    res.status(200).json({ data: 'OK' });
  } catch (e) {
    next(e);
  }
};

const checkout = async (req, res, next) => {
  try {
    const query = req.query;
    const request = req.body;
    const result = await frontendService.checkout(query, request);

    res.status(200).json({ data: result });
  } catch (e) {
    next(e);
  }
};

export { getProductHomepage, productDetails, searchProducts, addToCart, getCart, updateCart, deleteCart, checkout };
