import { createResource } from "solid-js";
import Navbar from "../components/navbar";
import CustomerDashboard from "../components/CustomerDashboard";

const fetchPackages = async () => (await fetch("http://localhost:5000/packages")).json();

export default function Customer() {
  const [packages] = createResource(fetchPackages);

  const handleBuy = async (pkg: any) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    await fetch("http://localhost:5000/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
        packageName: pkg.name,
        price: pkg.price,
        date: new Date().toISOString(),
      }),
    });
    alert(`Berhasil membeli ${pkg.name}!`);
  };

  return (
    <div>
      <Navbar />
      <h2 class="text-2xl font-bold text-center mt-6 mb-4">Pilih Paket Internet</h2>
      {packages.loading ? (
        <p class="text-center">Memuat paket...</p>
      ) : (
        <CustomerDashboard packages={packages()} onBuy={handleBuy} />
      )}
    </div>
  );
}
