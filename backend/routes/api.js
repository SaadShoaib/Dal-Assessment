const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
var express = require('express');
var router = express.Router();

router.get('/transactions/:id', async function(req, res, next) {
  const { id } = req.params;
  try {
    const transaction = await prisma.transaction.findUnique({
      where: { id: parseInt(id) },
    });
    if (!transaction) return res.status(404).json({ error: 'Transaction not found' });
    res.json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//Post API route
router.get('/transactions', async function(req,res,next) {
  try {
    const transactions = await prisma.transaction.findMany();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

router.post('/transactions', async function(req,res,next) {
  const { type, amount } = req.body;

  if (!['credit', 'debit'].includes(type)) {
    return res.status(400).json({ error: 'Invalid transaction type' });
  }
  
  try {
    const transaction = await prisma.transaction.create({
      data: {
        type,
        amount,
        date: new Date(),
      },
    });
    res.json(transaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})


module.exports = router;
