// src/api.js
export const claimCoupon = async () => {
    const ipHash = await getIpHash(); // Implement IP hashing
    const browserHash = getBrowserFingerprint(); // Browser fingerprint lib
    
    const { data, error } = await supabase.rpc('claim_coupon', {
      ip: ipHash,
      browser_hash: browserHash
    });
  
    return { data, error };
  };