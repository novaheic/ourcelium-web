import { Suspense } from 'react'
import CliAuth from '@/components/CliAuth'

export default function CliAuthPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-6">
      <Suspense fallback={<p className="text-white/60 text-sm">Loading...</p>}>
        <CliAuth />
      </Suspense>
    </div>
  )
}
