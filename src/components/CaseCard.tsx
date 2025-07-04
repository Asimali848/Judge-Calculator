import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { CaseData } from '@/types/case';
import { formatCurrency } from '@/lib/calculations';
import { cn } from '@/lib/utils';

interface CaseCardProps {
  case: CaseData;
  isSelected: boolean;
  onClick: () => void;
}

export function CaseCard({ case: caseData, isSelected, onClick }: CaseCardProps) {
  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all duration-200 hover:shadow-md border-2",
        isSelected 
          ? "border-primary bg-primary/5 shadow-md" 
          : "border-border hover:border-primary/50"
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <h3 className="font-semibold text-sm text-primary">
          {caseData.caseName}
        </h3>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground">Payoff Amount</span>
          <span className="text-sm font-bold text-foreground">
            {formatCurrency(caseData.payoffAmount)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}