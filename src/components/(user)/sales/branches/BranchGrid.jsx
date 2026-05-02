// import BranchCard from "./BranchCard";


// const branches = [
//   {
//     name: "Alappuzha",
//     address: "Press Club Building, Alappuzha - 688001",
//     phone: "04772260421",
//   },
//   {
//     name: "Kannur",
//     address: "Fort Road, Kannur - 670001",
//     phone: "04972768218",
//   },
//   {
//     name: "Thrissur",
//     address: "Cochin Devaswom Board Building, Round North",
//     phone: "04872330683",
//   },
//   {
//     name: "Kollam",
//     address: "Andamukkam Rd, Chinnakada, Kollam",
//     phone: "04742750066",
//   },
// ];

// export default function BranchGrid() {
//   return (
//     <section>
//       <div className="flex justify-between mb-8">
//         <h2 className="text-2xl text-black font-bold">Regional Branches</h2>
//         <span className="text-sm text-gray-500">
//           {branches.length} Branches found in Kerala
//         </span>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {branches.map((branch) => (
//           <BranchCard key={branch.name} {...branch} />
//         ))}
//       </div>
//     </section>
//   );
// }


import BranchCard from "./BranchCard";


const branches = [
  {
    name: "Alappuzha",
    address: "Press Club Building, Alappuzha - 688001",
    phone: "0477-2260421",
  },
  {
    name: "Kannur",
    address: "Fort Road, Kannur - 670001",
    phone: "0497-2768218",
  },
  {
    name: "Thrissur",
    address: "Cochin Devaswom Board Building, Round North",
    phone: "0487-2330683",
  },
  {
    name: "Kollam",
    address: "Andamukkam Rd, Chinnakada, Kollam",
    phone: "0474-2750066",
  },
];

export default function BranchGrid() {
  return (
    <section>
      <div className="flex justify-between mb-8">
        <h2 className="text-2xl text-black font-bold">
          Regional Branches
        </h2>
        <span className="text-sm text-gray-500">
          {branches.length} Branches found in Kerala
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {branches.map((branch) => (
          <BranchCard key={branch.name} {...branch} />
        ))}
      </div>
    </section>
  );
}
