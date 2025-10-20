import PackageCard from "./PackageCard";

export default function CustomerDashboard(props: { packages: any[]; onBuy: (pkg: any) => void }) {
  return (
    <div class="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {props.packages.map((pkg) => (
        <PackageCard name={pkg.name} price={pkg.price} onBuy={() => props.onBuy(pkg)} />
      ))}
    </div>
  );
}
