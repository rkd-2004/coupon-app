// client/src/CouponClaim.js
import React, { useState } from 'react';

export default function CouponClaim() {
  const [message, setMessage] = useState('');
  
  const claimCoupon = async () => {
    try {
      const response = await fetch('/api/claim', {
        method: 'POST',
        credentials: 'include' // For cookies
      });
      const data = await response.json();
      setMessage(data.message);
    } catch (err) {
      setMessage('Error claiming coupon');
    }
  };

  return (
    <div>
      <button onClick={claimCoupon}>Claim Coupon</button>
      {message && <p>{message}</p>}
    </div>
  );
}