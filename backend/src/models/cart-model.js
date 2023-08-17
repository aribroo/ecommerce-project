const CartModel = (sequelize, DataTypes) => {
  const Cart = sequelize.define('cart', {
    qty: {
      type: DataTypes.INTEGER
    },
    session_id: {
      type: DataTypes.STRING
    }
  });
  return Cart;
};

export default CartModel;
