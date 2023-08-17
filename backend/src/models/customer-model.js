const CustomerModel = (sequelize, DataTypes) => {
  const Customer = sequelize.define('customer', {
    first_name: {
      type: DataTypes.STRING
    },
    last_name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    address: {
      type: DataTypes.STRING
    },
    number_phone: {
      type: DataTypes.TEXT
    }
  });
  return Customer;
};

export default CustomerModel;
