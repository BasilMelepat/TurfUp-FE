import { useMemo } from "react";
import useTransactionData from "@hooks/admin/useTransactionData";
import TransactionSkeleton from "./TransactionSkeleton";
import Ledger from "@components/common/Ledger";

const TransactionSection = () => {
  const { transactions, loading, error } = useTransactionData();

  const rows = useMemo(
    () =>
      transactions.map((t) => ({
        id: t._id,
        name: t.user.name,
        sub: t.turf.name,
        meta: t.payment.paymentId,
        status: "Paid",
        amount: t.totalPrice,
        date: new Date(t.createdAt),
        order: new Date(t.createdAt).getTime(),
        extra: [
          ["Order ID", t.payment.orderId],
          ["Payment ID", t.payment.paymentId],
        ],
      })),
    [transactions]
  );

  if (loading) return <TransactionSkeleton />;
  if (error) return <div className="alert alert-error shadow-lg">{error}</div>;

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-4xl uppercase">Payments</h1>
        <p className="opacity-70">Razorpay transactions</p>
      </div>
      <Ledger rows={rows} noun="payment" headers={["Customer", "Payment ID"]} money tabs />
    </div>
  );
};

export default TransactionSection;
