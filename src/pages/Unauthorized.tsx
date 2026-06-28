import { ShieldX, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream p-6">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
          <ShieldX className="w-10 h-10 text-red-500" />
        </div>
        <h1 className="text-2xl font-fraunces font-bold text-ink mb-3">
          Access Denied
        </h1>
        <p className="text-charcoal mb-8 leading-relaxed">
          You don't have permission to access this page. Please contact your administrator if you believe this is an error.
        </p>
        <Button
          onClick={() => window.history.back()}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </Button>
      </div>
    </div>
  )
}
