const CartModel = (sequelize, DataTypes) => {
  const Cart = sequelize.define('cart', {
    qty: {
      type: DataTypes.INTEGER
    }
  });
  return Cart;
};

export default CartModel;
