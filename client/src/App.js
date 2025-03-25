import { useState } from 'react'
import { supabase } from './supabaseClient'
import FingerprintJS from '@fingerprintjs/fingerprintjs'

const fpPromise = FingerprintJS.load()

function App() {
  const [coupon, setCoupon] = useState('')
  const [error, setError] = useState('')

  const getBrowserHash = async () => {
    const fp = await fpPromise
    const { visitorId } = await fp.get()
    return visitorId
  }

  const getIpHash = async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json')
      const { ip } = await response.json()
      return btoa(ip).slice(0, 10)
    } catch {
      return 'fallback-ip'
    }
  }

  const claimCoupon = async () => {
    try {
      setError('')
      const ipHash = await getIpHash()
      const browserHash = await getBrowserHash()

      const { data, error } = await supabase.rpc('claim_coupon', {
        ip: ipHash,
        browser_hash: browserHash
      })

      if (error) throw error
      setCoupon(data)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div>
      <button onClick={claimCoupon}>Claim Coupon</button>
      {coupon && <p>Coupon: {coupon}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}

export default App