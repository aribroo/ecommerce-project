const TransactionModel = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('transaction', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    trs_number: {
      type: DataTypes.STRING
    }
  });
  return Transaction;
};

export default TransactionModel;
