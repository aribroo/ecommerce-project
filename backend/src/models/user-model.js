const UserModel = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false
    },

    phone_number: {
      type: DataTypes.STRING,
      allowNull: false
    },

    address: {
      type: DataTypes.TEXT,
      allowNull: false
    },

    refresh_token: {
      type: DataTypes.TEXT
    }
  });

  return User;
};

export default UserModel;
