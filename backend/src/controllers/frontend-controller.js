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
    const userId = req.user.id;
    const result = await frontendService.addToCart(userId, request);

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
    const userId = req.user.id;
    const result = await frontendService.getCart(userId);

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
    const result = await frontendService.checkout(req.user);

    res.status(200).json({ data: result });
  } catch (e) {
    next(e);
  }
};

const getImage = async (req, res, next) => {
  try {
    const name = req.params.imageName;
    const result = await frontendService.getImage(name);

    res.status(200).sendFile(result);
  } catch (e) {
    next(e);
  }
};

export { getProductHomepage, productDetails, searchProducts, addToCart, getCart, updateCart, deleteCart, checkout, getImage };
