// export default function Impact() {
//   return (
//     <section className="py-20 bg-primary relative overflow-hidden">

//       {/* Background Pattern */}
//    <div
//   className="absolute inset-0 opacity-10 bg-[#135bec]"
//   style={{
//     backgroundImage: "url('/krithi/bg.png')",
//   }}
// />

      

//       <div className="max-w-4xl mx-auto px-6 text-center relative z-10">

//         {/* Quote */}
//         <h2 className="text-2xl md:text-3xl font-bold text-white leading-relaxed">
//           "Helping the publishing industry recover from recession through
//           massive public participation and millions in sales."
//         </h2>

//         {/* CTA */}
//         <div className="mt-8 flex justify-center">
//           <button className="bg-white text-primary font-bold py-3 px-8 rounded-xl shadow-lg hover:bg-gray-50 transition-colors text-[#135bec]">
//             Join the Movement
//           </button>
//         </div>

//       </div>
//     </section>
//   );
// }



export default function Impact() {
  return (
    <section className="py-20 relative overflow-hidden bg-[#135bec]">
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">

        {/* Quote */}
        <h2 className="text-2xl md:text-3xl font-bold text-white leading-relaxed">
          "Helping the publishing industry recover from recession through
          massive public participation and millions in sales."
        </h2>

        {/* CTA */}
        <div className="mt-8 flex justify-center">
          <button className="bg-white text-[#135bec] font-bold py-3 px-8 rounded-xl shadow-lg hover:bg-gray-50 transition-colors">
            Join the Movement
          </button>
        </div>

      </div>
    </section>
  );
}
