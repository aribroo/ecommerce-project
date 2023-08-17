const TransactionDetailModel = (sequelize, DataTypes) => {
  const Transaction_detail = sequelize.define('transaction_detail', {
    qty: {
      type: DataTypes.INTEGER
    }
  });
  return Transaction_detail;
};

export default TransactionDetailModel;
