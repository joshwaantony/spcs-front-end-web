// import DiscountRulesCard from "@/components/(admin)/rules/DiscountRulesCard";
// import GlobalNote from "@/components/(admin)/rules/GlobalNote";
// import Header from "@/components/(admin)/rules/Header";
// import PageHeader from "@/components/(admin)/rules/PageHeader";
// import ShippingRulesCard from "@/components/(admin)/rules/ShippingRulesCard";


// export default function RulePage() {
//   return (
//     <div className="bg-background-light dark:bg-background-dark min-h-screen font-display transition-colors duration-300">
//       <div className="layout-container flex h-full grow flex-col">
//         <Header />

//         <main className="px-6 lg:px-20 py-10 max-w-7xl mx-auto w-full">
//           <PageHeader />

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             <DiscountRulesCard />
//             <ShippingRulesCard />
//           </div>

//           <GlobalNote />
//         </main>
//       </div>
//     </div>
//   );
// }



import Sidebar from "@/components/(admin)/layout/Sidebar";

import DiscountRulesCard from "@/components/(admin)/rules/DiscountRulesCard";
import GlobalNote from "@/components/(admin)/rules/GlobalNote";
import Header from "@/components/(admin)/rules/Header";
import PageHeader from "@/components/(admin)/rules/PageHeader";
import ShippingRulesCard from "@/components/(admin)/rules/ShippingRulesCard";

export default function RulePage() {
  return (
    <div className="flex h-screen p-6 gap-6 bg-background-light dark:bg-background-dark transition-colors duration-300">
      

      <Sidebar />

    
      <main className="flex-1 flex flex-col overflow-y-auto pr-6 py-6 font-display">
        
        <Header />

        <div className="max-w-7xl mx-auto w-full px-6 lg:px-20 py-10">
          <PageHeader />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <DiscountRulesCard />
            <ShippingRulesCard />
          </div>

          <GlobalNote />
        </div>
      </main>
    </div>
  );
}
