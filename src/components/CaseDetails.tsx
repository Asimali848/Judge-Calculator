import { Plus, Trash2, TriangleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatCurrency, formatDate } from "@/lib/calculations";
import { CaseData } from "@/types/case";
import { DialogAction, DialogCancel } from "./ui/alert-dialog";

interface CaseDetailsProps {
  case: CaseData;
  onAddTransaction: () => void;
  onDeleteCase: (caseId: string) => void;
}

const CaseDetails = ({
  case: caseData,
  onAddTransaction,
  onDeleteCase,
}: CaseDetailsProps) => {
  return (
    <Card className="h-full dark:bg-white/10">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl font-bold">Case Details</CardTitle>
        <div className="flex space-x-2">
          <Button
            onClick={onAddTransaction}
            className="bg-primary text-white hover:bg-primary/80"
            size="sm"
          >
            <Plus className="mr-2 h-4 w-4" />
            Cost/Payment
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash2 className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogPortal>
              <DialogOverlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-xl font-semibold text-destructive">
                    Delete Case
                  </DialogTitle>
                  <DialogDescription asChild>
                    <div className="flex flex-col items-center gap-3 text-sm text-muted-foreground">
                      <TriangleAlert className="size-16 text-red-500" />
                      Are you sure you want to delete{" "}
                      <span className="text-center font-semibold text-destructive">
                        "{caseData.caseName}"
                      </span>
                      ?<br />
                      This action cannot be undone and will remove all
                      associated transactions.
                    </div>
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-4">
                  <DialogCancel>Cancel</DialogCancel>
                  <DialogAction
                    onClick={() => onDeleteCase(caseData.id)}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Delete Case
                  </DialogAction>
                </DialogFooter>
              </DialogContent>
            </DialogPortal>
          </Dialog>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="mb-6 py-5 text-center">
          <h2 className="mb-2 text-2xl font-bold text-primary">
            {caseData.caseName}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {/* First group */}
          <div className="space-y-4">
            {[
              {
                label: "LA Superior Court Case No.",
                value: caseData.courtCaseNumber,
              },
              {
                label: "Judgment Amount",
                value: formatCurrency(caseData.judgmentAmount),
              },
              {
                label: "Judgment Date",
                value: formatDate(caseData.judgmentDate),
              },
              {
                label: "Last Payment Date",
                value: formatDate(caseData.lastPaymentDate),
              },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex justify-between border-b border-muted-foreground/20 pb-1"
              >
                <span className="text-muted-foreground">{label}</span>
                <span className="font-medium">{value}</span>
              </div>
            ))}
          </div>

          {/* Second group */}
          <div className="space-y-4">
            {[
              {
                label: "Total Payments to Date",
                value: formatCurrency(caseData.totalPayments),
              },
              {
                label: "Accrued Interest",
                value: formatCurrency(caseData.accruedInterest),
              },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex justify-between border-b border-muted-foreground/20 pb-1"
              >
                <span className="text-muted-foreground">{label}</span>
                <span className="font-medium">{value}</span>
              </div>
            ))}

            <div className="flex justify-between pt-10 text-lg font-bold">
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
};

export default CaseDetails;
