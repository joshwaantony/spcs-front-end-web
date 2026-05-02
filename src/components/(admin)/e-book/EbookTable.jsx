



// import {
//   FiMoreVertical,
//   FiChevronLeft,
//   FiChevronRight,
// } from "react-icons/fi";
// import { HiBookOpen } from "react-icons/hi";

// export default function EbookTable() {
//   return (
//     <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//       <div className="overflow-x-auto">
//         <table className="w-full text-left border-collapse">
//           {/* TABLE HEADER */}
//           <thead>
//             <tr className="border-b border-zinc-100">
//               <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
//                 Order ID
//               </th>
//               <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
//                 Book Title
//               </th>
//               <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
//                 Customer
//               </th>
//               <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
//                 Date
//               </th>
//               <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
//                 Amount
//               </th>
//               <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-zinc-400 text-center">
//                 Delivery Status
//               </th>
//               <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-wider text-zinc-400 text-right">
//                 Action
//               </th>
//             </tr>
//           </thead>

//           {/* TABLE BODY */}
//           <tbody className="divide-y divide-zinc-100">
//             {/* ROW 1 */}
//             <TableRow
//               id="#SPCS-9821"
//               title="Aarachar"
//               author="K.R. Meera"
//               customer="Rajesh Kumar"
//               date="12 Oct 2023"
//               amount="₹139.00"
//               status="Sent"
//             />

//             {/* ROW 2 */}
//             <TableRow
//               id="#SPCS-9820"
//               title="Pathummayude Aadu"
//               author="Basheer"
//               customer="Lekshmi Nair"
//               date="11 Oct 2023"
//               amount="₹99.00"
//               status="Processing"
//             />

//             {/* ROW 3 */}
//             <TableRow
//               id="#SPCS-9819"
//               title="Randamoozham"
//               author="M.T. Vasudevan Nair"
//               customer="Amit Varma"
//               date="10 Oct 2023"
//               amount="₹249.00"
//               status="Failed"
//             />
//           </tbody>
//         </table>
//       </div>

//     </div>
//   );
// }

// /* -------------------------------- */
// /* TABLE ROW COMPONENT */
// /* -------------------------------- */
// function TableRow({
//   id,
//   title,
//   author,
//   customer,
//   date,
//   amount,
//   status,
// }) {
//   return (
//     <tr className="hover:bg-zinc-50 transition">
//       <td className="px-8 py-5 text-sm font-extrabold text-zinc-900">
//         {id}
//       </td>

//       <td className="px-6 py-5">
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-12 rounded-2xl border border-zinc-200 bg-zinc-100 flex items-center justify-center">
//             <HiBookOpen className="text-green-500 text-lg" />
//           </div>

//           <div>
//             <p className="text-sm font-bold text-zinc-900">
//               {title}
//             </p>
//             <p className="text-xs text-zinc-500">
//               {author}
//             </p>
//           </div>
//         </div>
//       </td>

//       <td className="px-6 py-5 text-sm text-zinc-600">
//         {customer}
//       </td>

//       <td className="px-6 py-5 text-sm text-zinc-500">
//         {date}
//       </td>

//       <td className="px-6 py-5 text-sm font-extrabold text-zinc-900">
//         {amount}
//       </td>

//       <td className="px-6 py-5 text-center">
//         <StatusBadge status={status} />
//       </td>

//       <td className="px-8 py-5 text-right">
//         <FiMoreVertical className="text-zinc-400" />
//       </td>
//     </tr>
//   );
// }

// /* -------------------------------- */
// /* STATUS BADGE */
// /* -------------------------------- */
// function StatusBadge({ status }) {
//   const styles = {
//     Sent: "bg-emerald-100 text-emerald-700",
//     Processing: "bg-amber-100 text-amber-700",
//     Failed: "bg-rose-100 text-rose-700",
//   };

//   return (
//     <span
//       className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${styles[status]}`}
//     >
//       {status}
//     </span>
//   );
// }


import { FiMoreVertical } from "react-icons/fi";
import { HiBookOpen } from "react-icons/hi";

export default function EbookTable() {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* DESKTOP / TABLET TABLE */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-100">
              {[
                "Order ID",
                "Book Title",
                "Customer",
                "Date",
                "Amount",
                "Delivery Status",
                "Action",
              ].map((h) => (
                <th
                  key={h}
                  className={`px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-zinc-400 ${
                    h === "Delivery Status"
                      ? "text-center"
                      : h === "Action"
                      ? "text-right"
                      : ""
                  }`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-100">
            <TableRowDesktop
              id="#SPCS-9821"
              title="Aarachar"
              author="K.R. Meera"
              customer="Rajesh Kumar"
              date="12 Oct 2023"
              amount="₹139.00"
              status="Sent"
            />

            <TableRowDesktop
              id="#SPCS-9820"
              title="Pathummayude Aadu"
              author="Basheer"
              customer="Lekshmi Nair"
              date="11 Oct 2023"
              amount="₹99.00"
              status="Processing"
            />

            <TableRowDesktop
              id="#SPCS-9819"
              title="Randamoozham"
              author="M.T. Vasudevan Nair"
              customer="Amit Varma"
              date="10 Oct 2023"
              amount="₹249.00"
              status="Failed"
            />
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS */}
      <div className="sm:hidden space-y-4 p-4">
        <MobileCard
          id="#SPCS-9821"
          title="Aarachar"
          author="K.R. Meera"
          customer="Rajesh Kumar"
          date="12 Oct 2023"
          amount="₹139.00"
          status="Sent"
        />

        <MobileCard
          id="#SPCS-9820"
          title="Pathummayude Aadu"
          author="Basheer"
          customer="Lekshmi Nair"
          date="11 Oct 2023"
          amount="₹99.00"
          status="Processing"
        />

        <MobileCard
          id="#SPCS-9819"
          title="Randamoozham"
          author="M.T. Vasudevan Nair"
          customer="Amit Varma"
          date="10 Oct 2023"
          amount="₹249.00"
          status="Failed"
        />
      </div>
    </div>
  );
}

/* ========================= */
/* DESKTOP ROW */
/* ========================= */
function TableRowDesktop({
  id,
  title,
  author,
  customer,
  date,
  amount,
  status,
}) {
  return (
    <tr className="hover:bg-zinc-50 transition">
      <td className="px-6 py-5 font-extrabold text-sm">{id}</td>

      <td className="px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-12 rounded-2xl bg-zinc-100 border border-[#E4E4E7] flex items-center justify-center">
            <HiBookOpen className="text-green-500" />
          </div>
          <div>
            <p className="font-bold text-sm">{title}</p>
            <p className="text-xs text-zinc-500">{author}</p>
          </div>
        </div>
      </td>

      <td className="px-6 py-5 text-sm text-zinc-600">{customer}</td>
      <td className="px-6 py-5 text-sm text-zinc-500">{date}</td>
      <td className="px-6 py-5 font-extrabold text-sm">{amount}</td>

      <td className="px-6 py-5 text-center">
        <StatusBadge status={status} />
      </td>

      <td className="px-6 py-5 text-right">
        <FiMoreVertical className="text-zinc-400" />
      </td>
    </tr>
  );
}

/* ========================= */
/* MOBILE CARD */
/* ========================= */
function MobileCard({
  id,
  title,
  author,
  customer,
  date,
  amount,
  status,
}) {
  return (
    <div className="border border-zinc-200 rounded-xl p-4 space-y-3 shadow-sm">
      <div className="flex justify-between items-center">
        <span className="font-extrabold text-sm">{id}</span>
        <StatusBadge status={status} />
      </div>

      <div className="flex gap-3">
        <div className="w-10 h-12 rounded-2xl bg-zinc-100 border border-[#E4E4E7] flex items-center justify-center">
          <HiBookOpen className="text-green-500" />
        </div>

        <div>
          <p className="font-bold text-sm">{title}</p>
          <p className="text-xs text-zinc-500">{author}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs text-zinc-500">
        <p>
          <span className="font-semibold">Customer:</span> {customer}
        </p>
        <p>
          <span className="font-semibold">Date:</span> {date}
        </p>
        <p>
          <span className="font-semibold">Amount:</span>{" "}
          <span className="font-bold text-zinc-900">{amount}</span>
        </p>
      </div>
    </div>
  );
}

/* ========================= */
/* STATUS BADGE */
/* ========================= */
function StatusBadge({ status }) {
  const styles = {
    Sent: "bg-emerald-100 text-emerald-700",
    Processing: "bg-amber-100 text-amber-700",
    Failed: "bg-rose-100 text-rose-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${styles[status]}`}
    >
      {status}
    </span>
  );
}
