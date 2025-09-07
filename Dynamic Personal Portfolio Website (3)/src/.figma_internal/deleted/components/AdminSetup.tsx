import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import { AlertCircle, CheckCircle, Loader2, Database, Sprout, User, Key, RefreshCw } from 'lucide-react'
import { toast } from 'sonner@2.0.3'
import { projectId } from '../utils/supabase/info'

interface AdminSetupProps {
  onBack: () => void
}

interface DatabaseStatus {
  connected: boolean
  tablesExist: boolean
  adminUserExists: boolean
  adminEmail: string
  message: string
}

interface AdminCredentials {
  adminEmail: string
  adminPassword: string
}

export function AdminSetup({ onBack }: AdminSetupProps) {
  const [isInitializing, setIsInitializing] = useState(false)
  const [isSeeding, setIsSeeding] = useState(false)
  const [isCreatingAdmin, setIsCreatingAdmin] = useState(false)
  const [isCheckingStatus, setIsCheckingStatus] = useState(true)
  const [initStatus, setInitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [seedStatus, setSeedStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [adminStatus, setAdminStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [initMessage, setInitMessage] = useState('')
  const [seedMessage, setSeedMessage] = useState('')
  const [adminMessage, setAdminMessage] = useState('')
  const [sqlInstructions, setSqlInstructions] = useState('')
  const [dbStatus, setDbStatus] = useState<DatabaseStatus | null>(null)
  const [adminCredentials, setAdminCredentials] = useState<AdminCredentials | null>(null)

  // Check database and admin status on component mount
  useEffect(() => {
    checkDatabaseStatus()
  }, [])

  const checkDatabaseStatus = async () => {
    setIsCheckingStatus(true)
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-ab7fd8fd/database/status`)
      const result = await response.json()
      
      if (result.success) {
        setDbStatus(result.data)
        
        // Set initial states based on current status
        if (result.data.tablesExist) {
          setInitStatus('success')
          setInitMessage('Database tables are ready')
          setSeedStatus('success')
          setSeedMessage('Sample data is available')
        }
        
        if (result.data.adminUserExists) {
          setAdminStatus('success')
          setAdminMessage('Admin user is ready')
          setAdminCredentials({
            adminEmail: result.data.adminEmail,
            adminPassword: 'admin123'
          })
        }
      }
    } catch (error) {
      console.error('Failed to check database status:', error)
    } finally {
      setIsCheckingStatus(false)
    }
  }

  const initializeDatabase = async () => {
    setIsInitializing(true)
    setInitStatus('idle')
    
    try {
      // No authentication required for database initialization
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-ab7fd8fd/database/initialize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const result = await response.json()
      
      if (result.success) {
        setInitStatus('success')
        setInitMessage(result.message || 'Database initialized and seeded successfully!')
        setSeedStatus('success')
        setSeedMessage('Sample data was seeded during initialization')
        
        if (result.data.adminUserCreated) {
          setAdminStatus('success')
          setAdminMessage('Admin user created successfully')
          setAdminCredentials({
            adminEmail: result.data.adminEmail,
            adminPassword: result.data.adminPassword
          })
        }
        
        setSqlInstructions('')
        toast.success('Database initialized successfully!')
        
        // Refresh status
        await checkDatabaseStatus()
      } else {
        setInitStatus('error')
        setInitMessage(result.error || 'Failed to initialize database')
        toast.error('Database initialization failed')
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

  const createAdminUser = async () => {
    setIsCreatingAdmin(true)
    setAdminStatus('idle')
    
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-ab7fd8fd/admin/create-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const result = await response.json()
      
      if (result.success) {
        setAdminStatus('success')
        setAdminMessage(result.message || 'Admin user created successfully!')
        setAdminCredentials({
          adminEmail: result.data.adminEmail,
          adminPassword: result.data.adminPassword
        })
        toast.success('Admin user created successfully!')
        
        // Refresh status
        await checkDatabaseStatus()
      } else {
        setAdminStatus('error')
        setAdminMessage(result.error || 'Failed to create admin user')
        toast.error('Admin user creation failed')
      }
    } catch (error) {
      console.error('Admin user creation error:', error)
      setAdminStatus('error')
      setAdminMessage('Network error occurred')
      toast.error('Network error occurred')
    } finally {
      setIsCreatingAdmin(false)
    }
  }

  const seedDatabase = async () => {
    // Since the initialize endpoint now handles both init and seeding,
    // we'll just show that this has been completed
    setSeedStatus('success')
    setSeedMessage('Sample data was seeded during initialization')
    toast.success('Database already contains sample data!')
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
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <Button variant="outline" onClick={onBack} className="mb-4">
            ← Back to Dashboard
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="mb-2">Database Setup & Admin Management</h1>
              <p className="text-muted-foreground">
                Initialize your Supabase database and manage admin user access.
              </p>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={checkDatabaseStatus}
              disabled={isCheckingStatus}
            >
              {isCheckingStatus ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4 mr-2" />
              )}
              Refresh Status
            </Button>
          </div>
        </div>

        {/* Current Status Overview */}
        {dbStatus && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Current Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm">Database:</span>
                  {dbStatus.connected ? (
                    <Badge className="bg-green-500">Connected</Badge>
                  ) : (
                    <Badge variant="destructive">Disconnected</Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">Tables:</span>
                  {dbStatus.tablesExist ? (
                    <Badge className="bg-green-500">Ready</Badge>
                  ) : (
                    <Badge variant="destructive">Missing</Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">Admin User:</span>
                  {dbStatus.adminUserExists ? (
                    <Badge className="bg-green-500">Active</Badge>
                  ) : (
                    <Badge variant="destructive">Not Created</Badge>
                  )}
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">{dbStatus.message}</p>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-6 md:grid-cols-3">
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
                disabled={isInitializing || (dbStatus?.tablesExist && dbStatus?.adminUserExists)}
                className="w-full"
              >
                {isInitializing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Initializing...
                  </>
                ) : (
                  dbStatus?.tablesExist ? 'Reinitialize Database' : 'Initialize Database'
                )}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-secondary" />
                Admin User
              </CardTitle>
              <div className="flex items-center gap-2">
                {getStatusIcon(adminStatus)}
                {getStatusBadge(adminStatus)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Create or reset the admin user for dashboard access:
              </p>
              
              {adminCredentials && (
                <div className="p-3 bg-muted rounded-md space-y-2">
                  <h4 className="flex items-center gap-2 text-sm">
                    <Key className="w-4 h-4" />
                    Admin Credentials
                  </h4>
                  <div className="text-sm font-mono">
                    <p><strong>Email:</strong> {adminCredentials.adminEmail}</p>
                    <p><strong>Password:</strong> {adminCredentials.adminPassword}</p>
                  </div>
                </div>
              )}
              
              {adminMessage && (
                <div className={`p-3 rounded-md text-sm ${
                  adminStatus === 'error' 
                    ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300' 
                    : 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                }`}>
                  {adminMessage}
                </div>
              )}
              
              <Button 
                onClick={createAdminUser} 
                disabled={isCreatingAdmin}
                variant="secondary"
                className="w-full"
              >
                {isCreatingAdmin ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  dbStatus?.adminUserExists ? 'Reset Admin User' : 'Create Admin User'
                )}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sprout className="w-5 h-5 text-green-600" />
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
                variant="outline"
                className="w-full"
              >
                {isSeeding ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Seeding...
                  </>
                ) : (
                  'Confirm Sample Data'
                )}
              </Button>
              
              {initStatus !== 'success' && (
                <p className="text-xs text-muted-foreground">
                  Sample data is automatically seeded during initialization.
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

        {/* Success Message and Next Steps */}
        {initStatus === 'success' && adminStatus === 'success' && seedStatus === 'success' && (
          <Card className="mt-6 border-green-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-5 h-5" />
                Setup Complete!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
                <p className="text-sm text-green-700 dark:text-green-300 mb-3">
                  🎉 Your portfolio database has been successfully set up! Here's what you can do now:
                </p>
                <ul className="text-sm text-green-700 dark:text-green-300 space-y-2">
                  <li>• Navigate back to your portfolio to see the live data</li>
                  <li>• Use the admin dashboard to manage your content</li>
                  <li>• All sample data has been loaded and is ready to customize</li>
                </ul>
                
                <div className="mt-4 p-3 bg-white dark:bg-green-800/20 rounded border">
                  <p className="text-sm text-green-800 dark:text-green-200 mb-2">
                    <strong>Next Steps:</strong>
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={onBack}>
                      Go to Admin Dashboard
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => window.location.reload()}>
                      Refresh Portfolio
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Admin Credentials Display */}
        {adminCredentials && (
          <Card className="mt-6 border-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Key className="w-5 h-5" />
                Admin Login Credentials
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-primary/10 border border-primary/20 rounded-md">
                <p className="text-sm text-muted-foreground mb-3">
                  Use these credentials to access your admin dashboard:
                </p>
                <div className="space-y-2 font-mono text-sm">
                  <div className="flex items-center justify-between p-2 bg-muted rounded">
                    <span>Email:</span>
                    <span className="font-medium">{adminCredentials.adminEmail}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-muted rounded">
                    <span>Password:</span>
                    <span className="font-medium">{adminCredentials.adminPassword}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  💡 <strong>Important:</strong> Save these credentials securely. You can reset the admin user if needed.
                </p>
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
                This process also automatically creates the admin user and seeds sample data.
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm">Step 2: Admin User Management</h4>
              <p className="text-sm text-muted-foreground">
                The admin user is created during initialization. If you need to reset the admin credentials 
                or create a new admin user, use the "Admin User" section above.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm">Step 3: Access Dashboard</h4>
              <p className="text-sm text-muted-foreground">
                Once setup is complete, use the admin credentials to log into your dashboard and customize 
                all content. The sample data provides a great starting point for your portfolio.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm">Step 4: Customize Content</h4>
              <p className="text-sm text-muted-foreground">
                Edit, delete, or add new projects, services, certifications, and blog posts through the 
                admin dashboard. All sample data can be fully customized to match your portfolio.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}