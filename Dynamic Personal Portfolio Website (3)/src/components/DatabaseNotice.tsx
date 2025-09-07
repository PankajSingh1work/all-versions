import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Alert, AlertDescription } from './ui/alert'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Database, X, Settings, Loader2 } from 'lucide-react'
import { useDatabaseStatus } from '../hooks/useDatabaseStatus'

interface DatabaseNoticeProps {
  onNavigateToSetup?: () => void
}

export function DatabaseNotice({ onNavigateToSetup }: DatabaseNoticeProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isDismissed, setIsDismissed] = useState(false)
  const { status, isConnected, needsSetup, isChecking } = useDatabaseStatus()

  useEffect(() => {
    // Check if user has already dismissed the notice
    const dismissed = localStorage.getItem('database-notice-dismissed')
    if (dismissed === 'true') {
      setIsVisible(false)
      setIsDismissed(true)
    }
  }, [])

  // Auto-hide if database is connected
  useEffect(() => {
    if (isConnected) {
      setIsVisible(false)
      setIsDismissed(true)
    }
  }, [isConnected])

  // Don't show if database is connected or still checking
  if (isConnected || isChecking) {
    return null
  }

  const handleDismiss = () => {
    setIsVisible(false)
    setIsDismissed(true)
    localStorage.setItem('database-notice-dismissed', 'true')
  }

  const handleShowAgain = () => {
    setIsVisible(true)
    setIsDismissed(false)
    localStorage.removeItem('database-notice-dismissed')
  }

  if (isDismissed) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={handleShowAgain}
          className="shadow-lg"
        >
          <Database className="w-4 h-4 mr-2" />
          Database Info
        </Button>
      </div>
    )
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-4 right-4 z-50 max-w-md"
        >
          <Alert className="bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800 shadow-lg">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <Database className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                      {needsSetup ? 'Database Setup Required' : 'Demo Mode Active'}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {needsSetup ? 'Setup Needed' : 'Mock Data'}
                    </Badge>
                  </div>
                  <AlertDescription className="text-sm text-blue-700 dark:text-blue-300">
                    {needsSetup 
                      ? 'Database tables need to be created. The portfolio is currently using sample data for demonstration.'
                      : 'The portfolio is using sample data. To use your own content, set up the database first.'
                    }
                  </AlertDescription>
                  <div className="flex gap-2 pt-1">
                    {onNavigateToSetup && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={onNavigateToSetup}
                        className="h-8 text-xs border-blue-300 hover:bg-blue-100 dark:border-blue-700 dark:hover:bg-blue-900"
                      >
                        <Settings className="w-3 h-3 mr-1" />
                        Setup Database
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={handleDismiss}
                      className="h-8 text-xs text-blue-600 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-900"
                    >
                      Got it
                    </Button>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDismiss}
                className="h-6 w-6 p-0 text-blue-600 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-900"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </Alert>
        </motion.div>
      )}
    </AnimatePresence>
  )
}