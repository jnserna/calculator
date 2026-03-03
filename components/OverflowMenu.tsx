'use client'

import { useState, useRef, useEffect } from 'react'
import { MoreVertical, Star, Shield } from 'lucide-react'
import { PRIVACY_POLICY_URL, PLAY_STORE_URL } from '@/lib/constants'

export default function OverflowMenu() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  function handleRateApp() {
    setOpen(false)
    window.open(PLAY_STORE_URL, '_blank')
  }

  function handlePrivacyPolicy() {
    setOpen(false)
    window.open(PRIVACY_POLICY_URL, '_blank')
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Menú de opciones"
        aria-haspopup="true"
        aria-expanded={open}
        className="p-2 rounded-full text-white hover:bg-white/20 active:bg-white/30 transition-colors"
      >
        <MoreVertical size={22} />
      </button>

      {open && (
        <div className="absolute right-0 top-11 z-50 min-w-[200px] bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <button
            onClick={handleRateApp}
            className="flex items-center gap-3 w-full px-4 py-3 text-sm text-dark hover:bg-light transition-colors"
          >
            <Star size={18} className="text-amber" />
            Calificar App
          </button>
          <div className="h-px bg-gray-100" />
          <button
            onClick={handlePrivacyPolicy}
            className="flex items-center gap-3 w-full px-4 py-3 text-sm text-dark hover:bg-light transition-colors"
          >
            <Shield size={18} className="text-teal" />
            Política de Privacidad
          </button>
        </div>
      )}
    </div>
  )
}
