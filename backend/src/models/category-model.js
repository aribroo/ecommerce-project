const CategoryModel = (sequelize, DataTypes) => {
  const Category = sequelize.define('category', {
    name: {
      type: DataTypes.STRING
    }
  });
  return Category;
};

export default CategoryModel;
