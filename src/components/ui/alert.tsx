import * as React from "react"
import { AlertCircle, CheckCircle2, Info, XCircle } from "lucide-react"
import { cn } from "@/src/lib/utils"

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'destructive' | 'success' | 'warning'
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const icons = {
      default: <Info className="h-4 w-4" />,
      destructive: <XCircle className="h-4 w-4" />,
      success: <CheckCircle2 className="h-4 w-4" />,
      warning: <AlertCircle className="h-4 w-4" />,
    }

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          "relative w-full rounded-lg border p-4 flex items-start gap-3",
          {
            'bg-blue-50 border-blue-200 text-blue-800': variant === 'default',
            'bg-red-50 border-red-200 text-red-800': variant === 'destructive',
            'bg-green-50 border-green-200 text-green-800': variant === 'success',
            'bg-yellow-50 border-yellow-200 text-yellow-800': variant === 'warning',
          },
          className
        )}
        {...props}
      >
        {icons[variant]}
        <div className="flex-1">{children}</div>
      </div>
    )
  }
)
Alert.displayName = "Alert"

export { Alert }
