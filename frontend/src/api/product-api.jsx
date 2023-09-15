const baseUrl = 'http://localhost:3000/frontend';

export const register = async (request) => {
  const response = await fetch('http://localhost:3000/api/user/register', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
  });

  const result = await response.json();
  return result;
};

export const login = async (request) => {
  const response = await fetch('http://localhost:3000/api/user/login', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request),
    credentials: 'include'
  });

  const result = await response.json();
  return result;
};

export const getProductHome = async () => {
  const response = await fetch(baseUrl);
  const result = await response.json();

  return result.data;
};

export const getAllProducts = async () => {
  const response = await fetch(`${baseUrl}/products`);
  const result = await response.json();

  return result;
};

export const getProductDetail = async (url) => {
  const response = await fetch(`${baseUrl}/product/${url}`);
  const result = await response.json();

  return result.data;
};

export const searchProducts = async (keyword) => {
  const response = await fetch(`${baseUrl}/products/?keyword=${keyword}`);
  const result = await response.json();

  return result;
};

export const addToCart = async (token, userId, productId) => {
  const requestData = {
    product_id: productId,
    qty: 1,
    user_id: userId
  };

  const response = await fetch(`${baseUrl}/cart`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(requestData)
  });

  const result = await response.json();
  return result;
};

export const getCart = async (token) => {
  const response = await fetch(`${baseUrl}/cart`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const result = await response.json();
  return result;
};

export const removeCartItem = async (id, token) => {
  const response = await fetch(`${baseUrl}/cart/${id}`, {
    method: 'delete',
    headers: {
      Authorization: `Bearer ${token}`
    }
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

export const checkout = async (token) => {
  const response = await fetch(`${baseUrl}/checkout`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });

  const result = await response.json();
  return result;
};

export const getTransactionHistories = async (token) => {
  const response = await fetch('http://localhost:3000/transactions', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const result = await response.json();

  return result;
};

export const getTransactionDetail = async (transactionId) => {
  const response = await fetch(`http://localhost:3000/transaction/${transactionId}`);
  const result = await response.json();

  return result.data;
};
