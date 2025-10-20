import { createResource } from "solid-js";
import Navbar from "../components/navbar";
import TransactionList from "../components/TransactionList";

const fetchTransactions = async () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const res = await fetch(`http://localhost:5000/transactions?userId=${user.id}`);
  return res.json();
};

export default function Transactions() {
  const [transactions, { refetch }] = createResource(fetchTransactions);

  const handleEdit = async (t: any) => {
    await fetch(`http://localhost:5000/transactions/${t.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(t),
    });
    alert("Transaksi berhasil diperbarui!");
    refetch();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus transaksi ini?")) return;
    await fetch(`http://localhost:5000/transactions/${id}`, { method: "DELETE" });
    alert("Transaksi dihapus!");
    refetch();
  };

  return (
    <div>
      <Navbar />
      <h2 class="text-2xl font-bold text-center mt-6 mb-4">Riwayat Transaksi</h2>
      <div class="p-6">
        {transactions.loading ? (
          <p class="text-center">Memuat transaksi...</p>
        ) : (
          <TransactionList
            transactions={transactions()}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}
