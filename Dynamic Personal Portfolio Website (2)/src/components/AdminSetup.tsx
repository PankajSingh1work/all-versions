import { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import { AlertCircle, CheckCircle, Loader2, Database, Sprout } from 'lucide-react'
import { toast } from 'sonner@2.0.3'
import { projectId } from '../utils/supabase/info'

interface AdminSetupProps {
  onBack: () => void
}

export function AdminSetup({ onBack }: AdminSetupProps) {
  const [isInitializing, setIsInitializing] = useState(false)
  const [isSeeding, setIsSeeding] = useState(false)
  const [initStatus, setInitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [seedStatus, setSeedStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [initMessage, setInitMessage] = useState('')
  const [seedMessage, setSeedMessage] = useState('')
  const [sqlInstructions, setSqlInstructions] = useState('')

  const initializeDatabase = async () => {
    setIsInitializing(true)
    setInitStatus('idle')
    
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-ab7fd8fd/init-database`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      const result = await response.json()
      
      if (result.success) {
        setInitStatus('success')
        setInitMessage(result.message)
        setSqlInstructions('')
        toast.success('Database initialized successfully!')
      } else {
        setInitStatus('error')
        setInitMessage(result.message || 'Failed to initialize database')
        setSqlInstructions(result.sqlInstructions || '')
        if (result.sqlInstructions) {
          toast.error('Manual database setup required')
        } else {
          toast.error('Database initialization failed')
        }
      }
    } catch (error) {
      console.error('Database initialization error:', error)
      setInitStatus('error')
      setInitMessage('Network error occurred')
      toast.error('Network error occurred')
    } finally {
      setIsInitializing(false)
    }
  }

  const seedDatabase = async () => {
    setIsSeeding(true)
    setSeedStatus('idle')
    
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-ab7fd8fd/seed`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      const result = await response.json()
      
      if (result.success) {
        setSeedStatus('success')
        setSeedMessage(`${result.message} (${result.totalInserted || 0} items added)`)
        toast.success('Database seeded successfully!')
      } else {
        setSeedStatus('error')
        setSeedMessage(result.error || 'Failed to seed database')
        toast.error('Database seeding failed')
      }
    } catch (error) {
      console.error('Database seeding error:', error)
      setSeedStatus('error')
      setSeedMessage('Network error occurred')
      toast.error('Network error occurred')
    } finally {
      setIsSeeding(false)
    }
  }

  const getStatusIcon = (status: 'idle' | 'success' | 'error') => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: 'idle' | 'success' | 'error') => {
    switch (status) {
      case 'success':
        return <Badge className="bg-green-500">Success</Badge>
      case 'error':
        return <Badge variant="destructive">Error</Badge>
      default:
        return <Badge variant="secondary">Not Started</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button variant="outline" onClick={onBack} className="mb-4">
            ← Back to Dashboard
          </Button>
          <h1 className="mb-2">Database Setup</h1>
          <p className="text-muted-foreground">
            Initialize and populate your Supabase database with tables and sample data.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5 text-primary" />
                Initialize Database
              </CardTitle>
              <div className="flex items-center gap-2">
                {getStatusIcon(initStatus)}
                {getStatusBadge(initStatus)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Creates the necessary database tables and functions for your portfolio:
              </p>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Projects table</li>
                <li>• Services table</li>
                <li>• Certifications table</li>
                <li>• Blog posts table</li>
                <li>• About me table</li>
                <li>• Helper functions</li>
              </ul>
              
              {initMessage && (
                <div className={`p-3 rounded-md text-sm ${
                  initStatus === 'error' 
                    ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300' 
                    : 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                }`}>
                  {initMessage}
                </div>
              )}
              
              <Button 
                onClick={initializeDatabase} 
                disabled={isInitializing}
                className="w-full"
              >
                {isInitializing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Initializing...
                  </>
                ) : (
                  'Initialize Database'
                )}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sprout className="w-5 h-5 text-secondary" />
                Seed Sample Data
              </CardTitle>
              <div className="flex items-center gap-2">
                {getStatusIcon(seedStatus)}
                {getStatusBadge(seedStatus)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Populates your database with comprehensive sample content:
              </p>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• 7 Professional services</li>
                <li>• 16 Portfolio projects</li>
                <li>• 8 Certifications</li>
                <li>• 16 Blog articles</li>
                <li>• Sample about page content</li>
              </ul>
              
              {seedMessage && (
                <div className={`p-3 rounded-md text-sm ${
                  seedStatus === 'error' 
                    ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300' 
                    : 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                }`}>
                  {seedMessage}
                </div>
              )}
              
              <Button 
                onClick={seedDatabase} 
                disabled={isSeeding || initStatus !== 'success'}
                variant="secondary"
                className="w-full"
              >
                {isSeeding ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Seeding...
                  </>
                ) : (
                  'Seed Sample Data'
                )}
              </Button>
              
              {initStatus !== 'success' && (
                <p className="text-xs text-muted-foreground">
                  Please initialize the database first before seeding data.
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {sqlInstructions && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
                <AlertCircle className="w-5 h-5" />
                Manual Database Setup Required
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-md">
                <p className="text-sm text-orange-700 dark:text-orange-300 mb-4">
                  The database tables need to be created manually. Please follow these steps:
                </p>
                <ol className="text-sm text-orange-700 dark:text-orange-300 space-y-2 list-decimal list-inside">
                  <li>Go to your Supabase project dashboard</li>
                  <li>Navigate to the SQL Editor</li>
                  <li>Copy and paste the SQL code below</li>
                  <li>Click "Run" to execute the SQL</li>
                  <li>Return here and click "Initialize Database" again to verify</li>
                </ol>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="sql-code">SQL Setup Script</Label>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      navigator.clipboard.writeText(sqlInstructions)
                      toast.success('SQL code copied to clipboard!')
                    }}
                  >
                    Copy to Clipboard
                  </Button>
                </div>
                <textarea
                  id="sql-code"
                  value={sqlInstructions}
                  readOnly
                  className="w-full h-64 p-3 text-xs font-mono bg-muted border rounded-md resize-none"
                />
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Setup Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-sm">Step 1: Initialize Database</h4>
              <p className="text-sm text-muted-foreground">
                Run the database initialization to create all necessary tables, indexes, and functions. 
                This is a safe operation that won't overwrite existing data.
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm">Step 2: Seed Sample Data</h4>
              <p className="text-sm text-muted-foreground">
                Populate your database with comprehensive sample content. This will only add data if 
                the tables are empty, so existing content is preserved.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm">Step 3: Customize Content</h4>
              <p className="text-sm text-muted-foreground">
                After seeding, you can edit, delete, or add new content through the admin dashboard. 
                All sample data can be customized to match your portfolio.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}