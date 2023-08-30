const baseUrl = 'http://localhost:3000/frontend';

export const getProductHome = async () => {
  const response = await fetch(baseUrl);
  const result = await response.json();

  return result.data;
};

export const getAllProducts = async () => {
  const response = await fetch(`${baseUrl}/product`);
  const result = await response.json();

  return result.data;
};

export const getProductDetail = async (url) => {
  const response = await fetch(`${baseUrl}/product/detail/${url}`);
  const result = await response.json();

  return result.data;
};

export const searchProducts = async (keyword) => {
  const response = await fetch(`${baseUrl}/product/?keyword=${keyword}`);
  const result = await response.json();

  return result.data;
};

export const addToCart = async (productId) => {
  const requestData = {
    product_id: productId,
    qty: 1,
    session_id: 12345
  };

  await fetch(`${baseUrl}/cart`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestData)
  });
};

export const getCart = async (sessionId) => {
  const response = await fetch(`${baseUrl}/cart/?session_id=${sessionId}`);
  const result = await response.json();

  return result.data;
};

export const removeCartItem = async (id) => {
  const response = await fetch(`${baseUrl}/cart/${id}`, {
    method: 'delete'
  });
  const result = await response.json();

  return result.data;
};

export const updateCarts = async (id, qty) => {
  const response = await fetch(`${baseUrl}/cart/${id}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      qty: qty
    })
  });

  const result = response.json();

  return result;
};

export const orderNow = async (request, sessionId) => {
  const response = await fetch(`${baseUrl}/checkout/?session_id=${sessionId}`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
  });

  const result = await response.json();
  return result.data;
};
