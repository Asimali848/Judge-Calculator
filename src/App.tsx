import { useState } from "react";
import { CaseList } from "@/components/CaseList";
import { CaseDetails } from "@/components/CaseDetails";
import { TransactionsTable } from "@/components/TransactionsTable";
import { TransactionForm } from "@/components/TransactionForm";
import { AddCaseModal } from "@/components/AddCaseModal";
import { ThemeToggle } from "@/components/theme-toggle";
import { EmptyState } from "@/components/EmptyState";
import { mockCases, mockTransactions } from "@/data/mockData";
import { CaseData, Transaction, TransactionFormData } from "@/types/case";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import logo from "@/assets/logo.jpeg";

function App() {
  const [cases, setCases] = useState<CaseData[]>(mockCases);
  const [transactions, setTransactions] =
    useState<Transaction[]>(mockTransactions);
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>("1");
  const [isTransactionFormOpen, setIsTransactionFormOpen] = useState(false);
  const [isAddCaseModalOpen, setIsAddCaseModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<
    Transaction | undefined
  >();

  const selectedCase = cases.find((c) => c.id === selectedCaseId);
  const caseTransactions = transactions.filter(
    (t) => t.caseId === selectedCaseId
  );

  const handleCaseSelect = (caseId: string) => {
    setSelectedCaseId(caseId);
  };

  const handleAddNewCase = () => {
    setIsAddCaseModalOpen(true);
  };

  const handleDeleteCase = (caseId: string) => {
    setCases((prev) => prev.filter((c) => c.id !== caseId));
    setTransactions((prev) => prev.filter((t) => t.caseId !== caseId));

    if (selectedCaseId === caseId) {
      const remainingCases = cases.filter((c) => c.id !== caseId);
      setSelectedCaseId(
        remainingCases.length > 0 ? remainingCases[0].id : null
      );
    }

    toast.success("Case deleted successfully");
  };

  const handleAddCaseSubmit = (newCase: CaseData) => {
    setCases((prev) => [newCase, ...prev]);
    setSelectedCaseId(newCase.id);
    toast.success("Case added successfully");
  };

  const handleAddTransaction = () => {
    setEditingTransaction(undefined);
    setIsTransactionFormOpen(true);
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsTransactionFormOpen(true);
  };

  const handleDeleteTransaction = (transactionId: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== transactionId));
    toast.success("Transaction deleted successfully");
  };

  const handleTransactionSubmit = (data: TransactionFormData) => {
    if (editingTransaction) {
      // Update existing transaction
      setTransactions((prev) =>
        prev.map((t) =>
          t.id === editingTransaction.id
            ? {
                ...t,
                type: data.type,
                amount: data.amount,
                date: data.date,
                description: data.description,
                accruedInterest: data.calculatedInterest,
                principalBalance: data.newBalance,
              }
            : t
        )
      );
      toast.success("Transaction updated successfully");
    } else {
      // Add new transaction
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        caseId: selectedCaseId!,
        type: data.type,
        amount: data.amount,
        date: data.date,
        description: data.description,
        accruedInterest: data.calculatedInterest,
        principalBalance: data.newBalance,
      };
      setTransactions((prev) => [newTransaction, ...prev]);
      toast.success("Transaction added successfully");
    }

    // Update case data with new calculations
    if (selectedCase) {
      setCases((prev) =>
        prev.map((c) =>
          c.id === selectedCaseId
            ? {
                ...c,
                principalBalance: data.newBalance,
                accruedInterest: data.calculatedInterest,
                payoffAmount: data.newBalance + data.calculatedInterest,
                lastPaymentDate:
                  data.type === "PAYMENT" ? data.date : c.lastPaymentDate,
                totalPayments:
                  data.type === "PAYMENT"
                    ? c.totalPayments + data.amount
                    : c.totalPayments,
              }
            : c
        )
      );
    }
  };

  // Show empty state when no cases exist
  if (cases.length === 0) {
    return (
      <div className="min-h-screen bg-background p-4 sm:p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <header className="text-center mb-8">
            <div className="hidden md:block flex-col leaing-0 md:leading-3">
              <h1 className="  md:text-3xl font-bold text-foreground">
                <span className="text-primary">Judgment</span> Calc
              </h1>
              <p className="text-sm md:text-md text-muted-foreground md:mt-2">
                Manage cases, track payments, and calculate interest
              </p>
            </div>
          </header>

          <EmptyState onAddNewCase={handleAddNewCase} />

          <AddCaseModal
            open={isAddCaseModalOpen}
            onOpenChange={setIsAddCaseModalOpen}
            onSubmit={handleAddCaseSubmit}
          />
        </div>
        <Toaster />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="text-center mb-8">
          <div className="flex justify-between items-center mb-4"> 
            <div className="hidden md:flex items-start justify-center gap-2.5">
              <img src={logo} alt="" className="size-20 rounded-xl" />
              <div className="flex flex-col items-start justify-center">
                <h1 className="  md:text-3xl font-bold text-foreground">
                  <span className="text-primary">Judgment</span> Calc
                </h1>
                <p className="text-sm md:text-md text-muted-foreground md:mt-2">
                  Manage cases, track payments, and calculate interest
                </p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <CaseList
            cases={cases}
            selectedCaseId={selectedCaseId}
            onCaseSelect={handleCaseSelect}
            onAddNewCase={handleAddNewCase}
            onDeleteCase={handleDeleteCase}
          />

          {selectedCase && (
            <CaseDetails
              case={selectedCase}
              onAddTransaction={handleAddTransaction}
              onDeleteCase={handleDeleteCase}
            />
          )}
        </div>

        {selectedCase && (
          <TransactionsTable
            transactions={caseTransactions}
            caseName={selectedCase.caseName}
            onEditTransaction={handleEditTransaction}
            onDeleteTransaction={handleDeleteTransaction}
          />
        )}

        {selectedCase && (
          <TransactionForm
            open={isTransactionFormOpen}
            onOpenChange={setIsTransactionFormOpen}
            onSubmit={handleTransactionSubmit}
            caseData={selectedCase}
            editTransaction={editingTransaction}
          />
        )}

        <AddCaseModal
          open={isAddCaseModalOpen}
          onOpenChange={setIsAddCaseModalOpen}
          onSubmit={handleAddCaseSubmit}
        />
      </div>
      <Toaster />
    </div>
  );
}

export default App;
