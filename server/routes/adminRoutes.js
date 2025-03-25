// server/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { Coupon } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Admin Login
router.post('/login', async (req, res) => {
  // Validate credentials
  // Return JWT token
});

// Protected routes
router.get('/coupons', authenticateAdmin, async (req, res) => {
  const coupons = await Coupon.findAll();
  res.json(coupons);
});

router.post('/coupons', authenticateAdmin, async (req, res) => {
  // Add new coupons
});