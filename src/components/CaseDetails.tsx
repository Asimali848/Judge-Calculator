import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Plus, Trash2, TriangleAlert } from "lucide-react";
import { CaseData } from "@/types/case";
import { formatCurrency, formatDate } from "@/lib/calculations";

interface CaseDetailsProps {
  case: CaseData;
  onAddTransaction: () => void;
  onDeleteCase: (caseId: string) => void;
}

export function CaseDetails({
  case: caseData,
  onAddTransaction,
  onDeleteCase,
}: CaseDetailsProps) {
  return (
    <Card className="h-full dark:bg-white/10">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl font-bold">Case Details</CardTitle>
        <div className="flex space-x-2">
          <Button
            onClick={onAddTransaction}
            className="bg-primary hover:bg-primary/80 text-white"
            size="sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            Cost/Payment
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="h-[300px] space-y-5">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-destructive font-semibold text-xl">
                  Delete Case
                </AlertDialogTitle>
                <AlertDialogDescription>
                  <div className="w-full flex flex-col items-center justify-center gap-2.5">
                    <TriangleAlert className="size-16 text-red-500" />
                    <span className="text-muted-foreground text-center">
                      Are you sure you want to delete{" "}
                      <span className="text-destructive font-semibold">
                        "{caseData.caseName}"
                      </span>
                      ? This action cannot be undone and will remove all
                      associated transactions.
                    </span>
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => onDeleteCase(caseData.id)}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete Case
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center mb-6 py-5">
          <h2 className="text-2xl font-bold text-primary mb-2">
            {caseData.caseName}
          </h2>
        </div>

        <div className="grid grid-cols-1  gap-4">
          <div className="space-y-4">
            <div className="flex justify-between border-b border-muted-foreground/20 pb-1 dark:border-b dark:border-muted-foreground/20">
              <span className="text-muted-foreground">
                LA Superior Court Case No.
              </span>
              <span className="font-medium">{caseData.courtCaseNumber}</span>
            </div>

            <div className="flex justify-between border-b border-muted-foreground/20 pb-1 dark:border-b dark:border-muted-foreground/20">
              <span className="text-muted-foreground">Judgment Amount</span>
              <span className="font-medium">
                {formatCurrency(caseData.judgmentAmount)}
              </span>
            </div>

            <div className="flex justify-between border-b border-muted-foreground/20 pb-1 dark:border-b dark:border-muted-foreground/20">
              <span className="text-muted-foreground">Judgment Date</span>
              <span className="font-medium">
                {formatDate(caseData.judgmentDate)}
              </span>
            </div>

            <div className="flex justify-between border-b border-muted-foreground/20 pb-1 dark:border-b dark:border-muted-foreground/20">
              <span className="text-muted-foreground">Last Payment Date</span>
              <span className="font-medium">
                {formatDate(caseData.lastPaymentDate)}
              </span>
            </div>
          </div>

          <div className="space-y-4 ">
            <div className="flex justify-between border-b border-muted-foreground/20 pb-1 dark:border-b dark:border-muted-foreground/20">
              <span className="text-muted-foreground">
                Total Payments to Date
              </span>
              <span className="font-medium">
                {formatCurrency(caseData.totalPayments)}
              </span>
            </div>

            <div className="flex justify-between border-b border-muted-foreground/20 pb-1 dark:border-b dark:border-muted-foreground/20">
              <span className="text-muted-foreground">Accrued Interest</span>
              <span className="font-medium">
                {formatCurrency(caseData.accruedInterest)}
              </span>
            </div>

            <div className="flex justify-between dark:border-b dark:border-muted-foreground/20 font-bold text-lg pt-10 ">
              <span className="text-muted-foreground">Today's Payoff</span>
              <span className="text-primary">
                {formatCurrency(caseData.payoffAmount)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
