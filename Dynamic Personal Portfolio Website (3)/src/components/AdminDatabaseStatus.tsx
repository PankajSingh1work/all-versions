import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Alert, AlertDescription } from './ui/alert'
import { Database, AlertTriangle, CheckCircle, Settings, Loader2 } from 'lucide-react'
import { useDatabaseStatus } from '../hooks/useDatabaseStatus'

interface AdminDatabaseStatusProps {
  onNavigateToSetup: () => void
}

export function AdminDatabaseStatus({ onNavigateToSetup }: AdminDatabaseStatusProps) {
  const { status, isConnected, needsSetup, isChecking, checkStatus, lastChecked } = useDatabaseStatus()

  const getStatusBadge = () => {
    switch (status) {
      case 'checking':
        return <Badge variant="secondary">Checking...</Badge>
      case 'connected':
        return <Badge className="bg-green-500">Connected</Badge>
      case 'setup-needed':
        return <Badge variant="destructive">Setup Required</Badge>
      case 'error':
        return <Badge variant="destructive">Error</Badge>
    }
  }

  const getStatusIcon = () => {
    switch (status) {
      case 'checking':
        return <Loader2 className="w-5 h-5 text-muted-foreground animate-spin" />
      case 'connected':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'setup-needed':
        return <AlertTriangle className="w-5 h-5 text-red-500" />
      case 'error':
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
        {needsSetup && (
          <Alert className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Your database tables haven't been created yet. The system is currently using mock data for demonstration. 
              Set up your database to start managing real content.
            </AlertDescription>
          </Alert>
        )}
        
        {isConnected && (
          <Alert className="mb-4 bg-green-50 dark:bg-green-950/50 border-green-200 dark:border-green-800">
            <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
            <AlertDescription className="text-green-700 dark:text-green-300">
              Database is properly configured and all tables are accessible. You can now manage your portfolio content.
            </AlertDescription>
          </Alert>
        )}

        {status === 'error' && (
          <Alert className="mb-4" variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Unable to connect to the database. Please check your connection and try again.
            </AlertDescription>
          </Alert>
        )}

        <div className="flex gap-3 items-center">
          <Button
            onClick={checkStatus}
            variant="outline"
            disabled={isChecking}
          >
            {isChecking ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Checking...
              </>
            ) : (
              'Check Status'
            )}
          </Button>
          
          {needsSetup && (
            <Button
              onClick={onNavigateToSetup}
              className="flex items-center gap-2"
            >
              <Settings className="w-4 h-4" />
              Setup Database
            </Button>
          )}
          
          {lastChecked && (
            <span className="text-xs text-muted-foreground">
              Last checked: {lastChecked.toLocaleTimeString()}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}