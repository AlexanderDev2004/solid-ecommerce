import { A } from "@solidjs/router";

export default function Navbar() {
  return (
    <nav class="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
      <h1 class="text-xl font-bold">DataMart</h1>
      <div class="space-x-4">
        <A href="/customer" class="hover:underline">Dashboard</A>
        <A href="/transactions" class="hover:underline">Transaksi</A>
        <A href="/login" class="hover:underline">Logout</A>
      </div>
    </nav>
  );
}
