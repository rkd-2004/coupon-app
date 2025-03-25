import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import publicIp from 'public-ip';

const fpPromise = FingerprintJS.load();

function App() {
  const [coupon, setCoupon] = useState('');
  const [error, setError] = useState('');

  const getBrowserHash = async () => {
    const fp = await fpPromise;
    const { visitorId } = await fp.get();
    return visitorId;
  };

  const getIpHash = async () => {
    const ip = await publicIp.v4();
    return btoa(ip).slice(0, 10);
  };

  const handleClaim = async () => {
    try {
      setError('');
      const ipHash = await getIpHash();
      const browserHash = await getBrowserHash();
      
      const { data, error } = await supabase.rpc('claim_coupon', {
        ip: ipHash,
        browser_hash: browserHash
      });

      if (error) throw error;
      setCoupon(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="App">
      <button onClick={handleClaim}>Claim Coupon</button>
      {coupon && <p>Your coupon: {coupon}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default App;