import { ArrowDownLeft, ArrowUpRight } from "lucide-react"

const transactions = [
  {
    id: "1",
    description: "Deposit",
    amount: 1250.0,
    type: "credit",
    date: "Today, 2:34 PM",
  },
  {
    id: "2",
    description: "Withdrawal",
    amount: 350.5,
    type: "debit",
    date: "Today, 11:15 AM",
  },
  {
    id: "3",
    description: "Transfer",
    amount: 750.0,
    type: "debit",
    date: "Yesterday, 4:45 PM",
  },
  {
    id: "4",
    description: "Payment Received",
    amount: 1800.0,
    type: "credit",
    date: "Yesterday, 2:20 PM",
  },
]

export function RecentTransactions() {
  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center justify-between py-2">
          <div className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                transaction.type === "credit" ? "bg-success/10" : "bg-danger/10"
              }`}
            >
              {transaction.type === "credit" ? (
                <ArrowUpRight size={16} className="text-success" />
              ) : (
                <ArrowDownLeft size={16} className="text-danger" />
              )}
            </div>
            <div>
              <p className="font-medium">{transaction.description}</p>
              <p className="text-xs text-muted-foreground">{transaction.date}</p>
            </div>
          </div>
          <div className={`font-medium ${transaction.type === "credit" ? "text-success" : "text-danger"}`}>
            {transaction.type === "credit" ? "+" : "-"}${transaction.amount.toFixed(2)}
          </div>
        </div>
      ))}
    </div>
  )
}

