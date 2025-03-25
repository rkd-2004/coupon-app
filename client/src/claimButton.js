const claimCoupon = async () => {
    // Get user's IP/browser fingerprint (simplified)
    const ipHash = await generateIpHash(); 
    const browserHash = generateBrowserHash();
    
    const { data, error } = await supabase
      .rpc('claim_coupon', { 
        ip_hash: ipHash, 
        browser_hash: browserHash 
      });
    
    if (data) setCoupon(data);
    if (error) setError(error.message);
  };