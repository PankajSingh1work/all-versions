import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Alert, AlertDescription } from './ui/alert'
import { Database, AlertTriangle, CheckCircle, Settings } from 'lucide-react'
import { projectId } from '../utils/supabase/info'

interface AdminDatabaseStatusProps {
  onNavigateToSetup: () => void
}

export function AdminDatabaseStatus({ onNavigateToSetup }: AdminDatabaseStatusProps) {
  const [databaseStatus, setDatabaseStatus] = useState<'checking' | 'connected' | 'setup-needed'>('checking')
  const [isCheckingDatabase, setIsCheckingDatabase] = useState(false)

  useEffect(() => {
    checkDatabaseStatus()
  }, [])

  const checkDatabaseStatus = async () => {
    setIsCheckingDatabase(true)
    
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-ab7fd8fd/init-database`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token || 'mock-token'}`
        }
      })

      const result = await response.json()
      
      if (result.success) {
        setDatabaseStatus('connected')
      } else {
        setDatabaseStatus('setup-needed')
      }
    } catch (error) {
      console.log('Database check failed, likely needs setup:', error)
      setDatabaseStatus('setup-needed')
    } finally {
      setIsCheckingDatabase(false)
    }
  }

  const getStatusBadge = () => {
    switch (databaseStatus) {
      case 'checking':
        return <Badge variant="secondary">Checking...</Badge>
      case 'connected':
        return <Badge className="bg-green-500">Connected</Badge>
      case 'setup-needed':
        return <Badge variant="destructive">Setup Required</Badge>
    }
  }

  const getStatusIcon = () => {
    switch (databaseStatus) {
      case 'checking':
        return <Database className="w-5 h-5 text-muted-foreground animate-pulse" />
      case 'connected':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'setup-needed':
        return <AlertTriangle className="w-5 h-5 text-red-500" />
    }
  }

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3">
          {getStatusIcon()}
          Database Status
          {getStatusBadge()}
        </CardTitle>
        <CardDescription>
          Current status of your Supabase database connection and tables
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        {databaseStatus === 'setup-needed' && (
          <Alert className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Your database tables haven't been created yet. The system is currently using mock data for demonstration. 
              Set up your database to start managing real content.
            </AlertDescription>
          </Alert>
        )}
        
        {databaseStatus === 'connected' && (
          <Alert className="mb-4 bg-green-50 dark:bg-green-950/50 border-green-200 dark:border-green-800">
            <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
            <AlertDescription className="text-green-700 dark:text-green-300">
              Database is properly configured and all tables are accessible. You can now manage your portfolio content.
            </AlertDescription>
          </Alert>
        )}

        <div className="flex gap-3">
          <Button
            onClick={checkDatabaseStatus}
            variant="outline"
            disabled={isCheckingDatabase}
          >
            {isCheckingDatabase ? 'Checking...' : 'Check Status'}
          </Button>
          
          {databaseStatus === 'setup-needed' && (
            <Button
              onClick={onNavigateToSetup}
              className="flex items-center gap-2"
            >
              <Settings className="w-4 h-4" />
              Setup Database
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}