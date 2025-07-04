import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Plus, Scale } from 'lucide-react';

interface EmptyStateProps {
  onAddNewCase: () => void;
}

export function EmptyState({ onAddNewCase }: EmptyStateProps) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-8">
      <Card className="w-full max-w-md mx-auto border-dashed border-2 border-muted-foreground/25">
        <CardContent className="flex flex-col items-center justify-center text-center p-8 space-y-6">
          <div className="relative">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
              <Scale className="w-10 h-10 text-primary/80" />
            </div>
            <div className="absolute -top-1 -right-1 w-8 h-8 bg-muted rounded-full flex items-center justify-center">
              <FileText className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-foreground">
              No Cases Yet
            </h3>
            <p className="text-muted-foreground text-sm max-w-sm">
              Start managing your legal cases by creating your first case. Track payments, calculate interest, and manage all case details in one place.
            </p>
          </div>
          
          <div className="space-y-3 w-full">
            <Button 
              onClick={onAddNewCase}
              className="w-full bg-primary hover:bg-primary/80 text-white"
              size="lg"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Your First Case
            </Button>
            
            <div className="text-xs text-muted-foreground">
              Get started with case management
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 w-full pt-4 border-t border-border">
            <div className="text-center">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-2">
                <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-xs text-muted-foreground">Track Cases</div>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Plus className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <div className="text-xs text-muted-foreground">Add Payments</div>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Scale className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="text-xs text-muted-foreground">Calculate Interest</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}