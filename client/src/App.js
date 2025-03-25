import React, { useState } from 'react';

function App() {
  const [coupon, setCoupon] = useState('');
  const [error, setError] = useState('');

  const handleClaim = async () => {
    try {
      const response = await fetch('/api/claim', { method: 'POST' });
      const data = await response.json();
      if (data.error) setError(data.error);
      else setCoupon(data.coupon);
    } catch (err) {
      setError('Failed to connect to server');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={handleClaim}>Claim Coupon</button>
      {coupon && <p>Your coupon: {coupon}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default App;