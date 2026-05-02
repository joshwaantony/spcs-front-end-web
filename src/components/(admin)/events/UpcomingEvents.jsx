



// import EventCard from "./EventCard";

// export default function UpcomingEvents() {
//   return (
//     <section className="space-y-8">
//       <div className="flex items-center justify-between">
//         <h2 className="text-3xl font-black text-black tracking-tight">
//           Upcoming Events
//         </h2>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         <EventCard
//           month="OCT"
//           day="24"
//           title="Aadujeevitham Special Edition"
//           time="10:00 AM • Kottayam Public Library"
//           tag="Book Release"
//           icon="auto_stories"
//           image="https://lh3.googleusercontent.com/aida-public/AB6AXuDFjEJSNS8p6JMcOrwhQ7Dix6mKa78S3lD-zPHXS3yb5gq8TbJGUZ3cewiV0Fub7va-g009f_0NfnBDDrDlFi_pDAlx0u252m1l2DqBnrs5da-uASI3Roie0F83y8tEqHQJBe8Z3cjJWFrK12k80UB1f8Ul9UyTerB3AUvGk1X12cSqjXfWS7Hkgiuxuh1MD57Qxjdj7Xm3EB2UhsSec4zNAnn_BFpppRhaDpDMp_jM0QpeOQiiK9Qo3KiowrbZBOKzxaGbbDG3aHg"
//         />

//         <EventCard
//           month="NOV"
//           day="02"
//           title="Board of Directors Monthly Meet"
//           time="03:30 PM • SPCS Main HQ"
//           tag="Executive Meet"
//           icon="group"
//           image="https://lh3.googleusercontent.com/aida-public/AB6AXuCOYdRzAsMBtkfs7vjaD4p5S6zs4FEnSUFckM1ztKNCopjI5J0Axkp641KLRA2ijFVwrNDCLejqW4Of9svA70mirV2Fyn8Zl-3Za8NA09J5BJ3f4WQM4lnPiZJTvM_Kg8Rz2__IObvUVyXYuiKg9g6dWpL-4C3YL667_xMvVCdW-dIjSs_ilmhDTeraY38tXMj--uUaPgTTqOCac0jqjJ5n9tcmH2gtVlNC2y8dnXw5fP8ryZjyLhG3uSPgiVSjL72wl0bfWob1pOg"
//         />

//         <EventCard
//           month="NOV"
//           day="15"
//           title="Keralolsavam Lit-Night"
//           time="06:00 PM • Town Hall Auditorium"
//           tag="Cultural Fest"
//           icon="celebration"
//           image="https://lh3.googleusercontent.com/aida-public/AB6AXuBcBittYtqHUO5rOx-asEYNBbvTOm_T9SWuzCkYvBrda1uBMu4yvQ3otAuD_dMhVmrg3zym05c-eTwLlv4_h0mLdOaa9vBBhlpCsIFBASlvs-004eEgb5Gr2ym53q_aTbH6T7BGzM9l3bamYbHNNTjJl0wJ8uiVH5-o8N--Jif8ZIVKeeeVgFvoZfOWcCY_zyK2N5e2dGXrihVNPDTu247zM8g6qxU1trej8afTh4wBiFL5M8Fhk2-t-nZPVQVJFE6lE5JTwMizo6U"
//         />
//       </div>
//     </section>
//   );
// }



import EventCard from "./EventCard";

export default function UpcomingEvents() {
  return (
    <section className="space-y-6 sm:space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
          Upcoming Events
        </h2>
      </div>

      <div className="
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        lg:grid-cols-3 
        gap-6 sm:gap-8
      ">
        <EventCard
          month="OCT"
          day="24"
          title="Aadujeevitham Special Edition"
          time="10:00 AM • Kottayam Public Library"
          tag="Book Release"
          icon="auto_stories"
          image="https://lh3.googleusercontent.com/aida-public/AB6AXuDFjEJSNS8p6JMcOrwhQ7Dix6mKa78S3lD-zPHXS3yb5gq8TbJGUZ3cewiV0Fub7va-g009f_0NfnBDDrDlFi_pDAlx0u252m1l2DqBnrs5da-uASI3Roie0F83y8tEqHQJBe8Z3cjJWFrK12k80UB1f8Ul9UyTerB3AUvGk1X12cSqjXfWS7Hkgiuxuh1MD57Qxjdj7Xm3EB2UhsSec4zNAnn_BFpppRhaDpDMp_jM0QpeOQiiK9Qo3KiowrbZBOKzxaGbbDG3aHg"
        />

        <EventCard
          month="NOV"
          day="02"
          title="Board of Directors Monthly Meet"
          time="03:30 PM • SPCS Main HQ"
          tag="Executive Meet"
          icon="group"
          image="https://lh3.googleusercontent.com/aida-public/AB6AXuCOYdRzAsMBtkfs7vjaD4p5S6zs4FEnSUFckM1ztKNCopjI5J0Axkp641KLRA2ijFVwrNDCLejqW4Of9svA70mirV2Fyn8Zl-3Za8NA09J5BJ3f4WQM4lnPiZJTvM_Kg8Rz2__IObvUVyXYuiKg9g6dWpL-4C3YL667_xMvVCdW-dIjSs_ilmhDTeraY38tXMj--uUaPgTTqOCac0jqjJ5n9tcmH2gtVlNC2y8dnXw5fP8ryZjyLhG3uSPgiVSjL72wl0bfWob1pOg"
        />

        <EventCard
          month="NOV"
          day="15"
          title="Keralolsavam Lit-Night"
          time="06:00 PM • Town Hall Auditorium"
          tag="Cultural Fest"
          icon="celebration"
          image="https://lh3.googleusercontent.com/aida-public/AB6AXuBcBittYtqHUO5rOx-asEYNBbvTOm_T9SWuzCkYvBrda1uBMu4yvQ3otAuD_dMhVmrg3zym05c-eTwLlv4_h0mLdOaa9vBBhlpCsIFBASlvs-004eEgb5Gr2ym53q_aTbH6T7BGzM9l3bamYbHNNTjJl0wJ8uiVH5-o8N--Jif8ZIVKeeeVgFvoZfOWcCY_zyK2N5e2dGXrihVNPDTu247zM8g6qxU1trej8afTh4wBiFL5M8Fhk2-t-nZPVQVJFE6lE5JTwMizo6U"
        />
      </div>
    </section>
  );
}
