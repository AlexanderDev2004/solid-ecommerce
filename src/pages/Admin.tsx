import { createSignal, createResource } from "solid-js";
import Navbar from "../components/navbar";

type Package = {
  id: number;
  name: string;
  price: number;
};

type Transaction = {
  id: number;
  userId: number;
  packageName: string;
  price: number;
  date: string;
};

const fetchPackages = async (): Promise<Package[]> => {
  const res = await fetch("http://localhost:5000/packages");
  return res.json();
};

const fetchTransactions = async (): Promise<Transaction[]> => {
  const res = await fetch("http://localhost:5000/transactions");
  return res.json();
};

export default function Admin() {
  const [packages, { refetch: refetchPackages }] = createResource<Package[]>(fetchPackages);
  const [transactions, { refetch: refetchTransactions }] =
    createResource<Transaction[]>(fetchTransactions);

  const [name, setName] = createSignal("");
  const [price, setPrice] = createSignal("");

  const addPackage = async () => {
    if (!name() || !price()) return alert("Isi semua field!");
    await fetch("http://localhost:5000/packages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name(), price: parseInt(price()) }),
    });
    setName("");
    setPrice("");
    refetchPackages();
  };

  const deletePackage = async (id: number) => {
    if (!confirm("Yakin hapus paket ini?")) return;
    await fetch(`http://localhost:5000/packages/${id}`, { method: "DELETE" });
    refetchPackages();
  };

  return (
    <div>
      <Navbar />
      <div class="p-6">
        <h2 class="text-2xl font-bold mb-4">Kelola Paket Data</h2>
        <div class="flex gap-2 mb-4">
          <input
            class="border p-2 rounded w-40"
            placeholder="Nama paket"
            value={name()}
            onInput={(e) => setName(e.currentTarget.value)}
          />
          <input
            type="number"
            class="border p-2 rounded w-32"
            placeholder="Harga"
            value={price()}
            onInput={(e) => setPrice(e.currentTarget.value)}
          />
          <button
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={addPackage}
          >
            Tambah
          </button>
        </div>

        <table class="min-w-full bg-white border rounded-lg shadow mb-8">
          <thead class="bg-gray-100 text-gray-700">
            <tr>
              <th class="p-2 text-left">Nama Paket</th>
              <th class="p-2 text-left">Harga</th>
              <th class="p-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {packages()?.map((p: Package) => (
              <tr class="border-t">
                <td class="p-2">{p.name}</td>
                <td class="p-2">Rp {p.price.toLocaleString()}</td>
                <td class="p-2 text-center">
                  <button
                    class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    onClick={() => deletePackage(p.id)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 class="text-2xl font-bold mb-3">💰 Semua Transaksi</h2>
        <table class="min-w-full bg-white border rounded-lg shadow">
          <thead class="bg-gray-100 text-gray-700">
            <tr>
              <th class="p-2 text-left">User ID</th>
              <th class="p-2 text-left">Paket</th>
              <th class="p-2 text-left">Harga</th>
              <th class="p-2 text-left">Tanggal</th>
            </tr>
          </thead>
          <tbody>
            {transactions()?.map((t: Transaction) => (
              <tr class="border-t">
                <td class="p-2">{t.userId}</td>
                <td class="p-2">{t.packageName}</td>
                <td class="p-2">Rp {t.price.toLocaleString()}</td>
                <td class="p-2">{new Date(t.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
