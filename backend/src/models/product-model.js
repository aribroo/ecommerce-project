const ProductModel = (sequelize, DataTypes) => {
  const Product = sequelize.define('product', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING
    },
    desc: {
      type: DataTypes.STRING
    },
    full_desc: {
      type: DataTypes.TEXT
    },
    image: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.INTEGER
    },
    url: {
      type: DataTypes.STRING
    }
  });
  return Product;
};

export default ProductModel;
