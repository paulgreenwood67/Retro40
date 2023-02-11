//imported elements

import React from "react";
import logo from "../images/logo.png";

//function for the footer component
function Footer() {
  return (
  
<div className = "row footerCol ">
    <div className = "col-lg-2">
        
    </div>

    <div className="col-lg-8">
        
    </div>
   
    <div className = "col-lg-2 col-md-2">
          <img className="logoFooter" src={logo} alt="logo" />
    </div>
</div> 
 );
}

export default Footer;