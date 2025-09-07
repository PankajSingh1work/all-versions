import React from 'react';
import { Badge } from './ui/badge';
import { AlertCircle, Database } from 'lucide-react';

export function DemoModeIndicator() {
  const isDemoMode = !window.location.hostname.includes('supabase.co');
  
  if (!isDemoMode) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      <Badge 
        variant="outline" 
        className="bg-orange-50 border-orange-200 text-orange-700 dark:bg-orange-950 dark:border-orange-800 dark:text-orange-300 shadow-sm"
      >
        <AlertCircle className="w-3 h-3 mr-1" />
        Demo Mode
      </Badge>
    </div>
  );
}