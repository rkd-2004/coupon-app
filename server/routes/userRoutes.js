const express = require('express');
const router = express.Router();
const { Coupon } = require('../models');

router.post('/claim', async (req, res) => {
  try {
    const coupon = await Coupon.findOne({ 
      where: { isClaimed: false },
      attributes: ['id', 'code']  // Only return these fields
    });
    
    if (!coupon) {
      return res.status(404).json({ error: 'No coupons available' });
    }
    
    await coupon.update({ isClaimed: true, claimedBy: req.ip });
    res.json({ 
      success: true,
      code: coupon.code,
      message: 'Coupon claimed successfully' 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;