const express = require('express');
const router = express.Router();

router.get('/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId,
    name: 'Laptop',
    price: 3000
  });
});


module.exports = router;
