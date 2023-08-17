import transactionService from '../services/transaction-service.js';

const getAllTransaction = async (req, res, next) => {
  try {
    const result = await transactionService.getAllTransaction();

    res.status(200).json({ data: result });
  } catch (e) {
    next(e);
  }
};

const getOneTransaction = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await transactionService.getOneTransaction(id);

    res.status(200).json({ data: result });
  } catch (e) {
    next(e);
  }
};

export { getAllTransaction, getOneTransaction };
