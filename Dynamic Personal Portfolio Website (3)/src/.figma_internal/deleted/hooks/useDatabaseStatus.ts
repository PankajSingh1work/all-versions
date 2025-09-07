import { useState, useEffect } from 'react'
import { projectId } from '../utils/supabase/info'

export type DatabaseStatus = 'checking' | 'connected' | 'setup-needed' | 'error'

export function useDatabaseStatus() {
  const [status, setStatus] = useState<DatabaseStatus>('checking')
  const [lastChecked, setLastChecked] = useState<Date | null>(null)

  const checkStatus = async () => {
    setStatus('checking')
    
    try {
      // Use the dedicated database status endpoint
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-ab7fd8fd/database/status`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        setStatus('error')
        return
      }

      const result = await response.json()
      
      if (result.success && result.data.connected && result.data.tablesExist) {
        setStatus('connected')
      } else if (result.success && result.data.connected && !result.data.tablesExist) {
        setStatus('setup-needed')
      } else {
        setStatus('error')
      }
    } catch (error) {
      console.log('Database status check failed:', error)
      setStatus('error')
    } finally {
      setLastChecked(new Date())
    }
  }

  useEffect(() => {
    // Check status on mount
    checkStatus()
  }, [])

  return {
    status,
    lastChecked,
    checkStatus,
    isConnected: status === 'connected',
    needsSetup: status === 'setup-needed',
    isChecking: status === 'checking'
  }
}