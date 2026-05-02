



import Sidebar from "@/components/(admin)/layout/Sidebar";
import Header from "@/components/(admin)/schemes/Header";
import SchemeForm from "@/components/(admin)/schemes/SchemeForm";
import ActiveSchemes from "@/components/(admin)/schemes/ActiveSchemes";

export default function SchemePage() {
  return (
    <div className="flex h-screen p-6 gap-6 bg-background-light dark:bg-background-dark">

      {/* LEFT SIDEBAR */}
      <Sidebar />

      {/* RIGHT CONTENT */}
      <main className="flex-1 flex flex-col overflow-y-auto pr-6 py-6 text-charcoal">
        <Header />
        <SchemeForm />
        <ActiveSchemes />
      </main>
    </div>
  );
}
