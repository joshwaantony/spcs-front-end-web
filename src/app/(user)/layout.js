import Footer from "@/components/(user)/layout/Footer";
import Navbar from "@/components/(user)/layout/Navbar";
import React from "react";

function UserLayout({children}) {
  return <div className=" ">
   

    <div>
      <Navbar/>
            {children}
            <Footer/>
    </div>
  </div>;
}

export default UserLayout;
