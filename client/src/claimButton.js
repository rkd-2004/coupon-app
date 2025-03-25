import publicIp from 'public-ip';

const generateIpHash = async () => {
  const ip = await publicIp.v4(); // Gets user's public IP
  return hashString(ip); // Hash the IP for privacy
};
import FingerprintJS from '@fingerprintjs/fingerprintjs';

const generateBrowserHash = async () => {
  const fp = await FingerprintJS.load();
  const { visitorId } = await fp.get();
  return visitorId; // Already hashed
};
// Simple hash function (or use crypto-js)
const hashString = (str) => {
  return btoa(str).slice(0, 10); // Basic obfuscation
};
const claimCoupon = async () => {
    try {
      const ipHash = await generateIpHash();
      const browserHash = await generateBrowserHash();
      
      const { data, error } = await supabase
        .rpc('claim_coupon', { 
          ip_hash: ipHash, 
          browser_hash: browserHash 
        });
  
      if (error) throw error;
      if (data) {
        setCoupon(data);
        // Set a cookie to prevent repeat claims
        document.cookie = `claimed=true; max-age=${24*60*60}`; 
      }
    } catch (err) {
      setError(err.message || 'Failed to claim coupon');
    }
  };
  const response = await fetch(
    'https://[YOUR-SUPABASE-REF].supabase.co/rest/v1/rpc/claim_coupon', 
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9sY2Jpa21sZ3RreGp4bnl1aG9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4OTY3ODMsImV4cCI6MjA1ODQ3Mjc4M30.jBtQlEJZnLuFQWTFF7GIrGwqu0_hKLvwXfX_odW02cQ' // From Supabase → Settings → API
      },
      body: JSON.stringify({
        ip: 'user-ip-hash', // Replace with actual IP hash
        browser_hash: 'browser-fingerprint' // Replace with fingerprint
      })
    }
  );