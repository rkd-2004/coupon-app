import { useState } from 'react'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import publicIp from 'public-ip'
import { supabase } from '../supabaseClient'

const fpPromise = FingerprintJS.load()

export default function ClaimButton() {
  const [coupon, setCoupon] = useState('')
  const [error, setError] = useState('')

  const getBrowserHash = async () => {
    try {
      const fp = await fpPromise
      const { visitorId } = await fp.get()
      return visitorId
    } catch (err) {
      console.error('Fingerprint error:', err)
      return 'fallback-browser-hash'
    }
  }

  const getIpHash = async () => {
    try {
      const ip = await publicIp.v4()
      return btoa(ip).slice(0, 10)
    } catch (err) {
      console.error('IP error:', err)
      return 'fallback-ip-hash'
    }
  }

  const claimCoupon = async () => {
    try {
      // Clear previous states
      setError('')
      setCoupon('')

      const ipHash = await getIpHash()
      const browserHash = await getBrowserHash()

      const { data, error } = await supabase.rpc('claim_coupon', {
        ip_hash: ipHash,
        browser_hash: browserHash
      })

      if (error) throw error
      setCoupon(data)
      localStorage.setItem('last_claim', Date.now())
    } catch (err) {
      setError(err.message || 'Failed to claim coupon')
    }
  }

  return (
    <div className="claim-container">
      <button onClick={claimCoupon} disabled={!!localStorage.getItem('last_claim')}>
        Claim Coupon
      </button>
      {coupon && <p className="success">Your coupon: {coupon}</p>}
      {error && <p className="error">Error: {error}</p>}
    </div>
  )
}