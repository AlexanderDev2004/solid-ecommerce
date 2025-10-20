export default function PackageCard(props: { name: string; price: number; onBuy: () => void }) {
  return (
    <div class="border rounded-lg p-4 shadow hover:shadow-lg transition">
      <h3 class="text-lg font-semibold">{props.name}</h3>
      <p class="text-gray-600 mb-3">Rp {props.price.toLocaleString()}</p>
      <button
        class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        onClick={props.onBuy}
      >
        Beli Paket
      </button>
    </div>
  );
}
