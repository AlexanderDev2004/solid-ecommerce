import { createSignal, Show } from "solid-js";

export default function TransactionList(props: { transactions: any[]; onEdit: (t: any) => void; onDelete: (id: number) => void }) {
  const [editing, setEditing] = createSignal<any>(null);
  const [packageName, setPackageName] = createSignal("");
  const [price, setPrice] = createSignal(0);

  const startEdit = (t: any) => {
    setEditing(t);
    setPackageName(t.packageName);
    setPrice(t.price);
  };

  const saveEdit = () => {
    props.onEdit({ ...editing(), packageName: packageName(), price: price() });
    setEditing(null);
  };

  return (
    <div class="relative">
      <table class="min-w-full bg-white border rounded-lg shadow">
        <thead class="bg-gray-100 text-gray-700">
          <tr>
            <th class="p-2 text-left">#</th>
            <th class="p-2 text-left">Paket</th>
            <th class="p-2 text-left">Harga</th>
            <th class="p-2 text-left">Tanggal</th>
            <th class="p-2 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {props.transactions.map((t, i) => (
            <tr class="border-t hover:bg-gray-50">
              <td class="p-2">{i + 1}</td>
              <td class="p-2">{t.packageName}</td>
              <td class="p-2">Rp {t.price.toLocaleString()}</td>
              <td class="p-2">{new Date(t.date).toLocaleString()}</td>
              <td class="p-2 space-x-2">
                <button
                  class="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  onClick={() => startEdit(t)}
                >
                  Edit
                </button>
                <button
                  class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  onClick={() => props.onDelete(t.id)}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal edit */}
      <Show when={editing()}>
        <div class="fixed inset-0 flex items-center justify-center bg-black/50">
          <div class="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 class="text-lg font-semibold mb-3">Edit Transaksi</h3>
            <input
              class="border p-2 w-full mb-3"
              value={packageName()}
              onInput={(e) => setPackageName(e.currentTarget.value)}
            />
            <input
              type="number"
              class="border p-2 w-full mb-3"
              value={price()}
              onInput={(e) => setPrice(parseInt(e.currentTarget.value))}
            />
            <div class="flex justify-end space-x-2">
              <button
                class="bg-gray-300 px-3 py-1 rounded"
                onClick={() => setEditing(null)}
              >
                Batal
              </button>
              <button
                class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                onClick={saveEdit}
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      </Show>
    </div>
  );
}
