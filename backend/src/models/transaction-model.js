const TransactionModel = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('transaction', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    trs_number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  return Transaction;
};

export default TransactionModel;
