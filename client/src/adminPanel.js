// src/AdminPanel.js
const AdminPanel = () => {
    const [coupons, setCoupons] = useState([]);
  
    useEffect(() => {
      supabase.from('coupons').select('*')
        .then(({ data }) => setCoupons(data));
    }, []);
  
    return (
      <div>
        <h2>All Coupons</h2>
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Status</th>
              <th>Claimed By</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map(coupon => (
              <tr key={coupon.id}>
                <td>{coupon.code}</td>
                <td>{coupon.is_claimed ? '✅ Claimed' : '🟢 Available'}</td>
                <td>{coupon.claimed_by || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };