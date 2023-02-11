import React from "react";
import logo from "../images/logo.png";



//function to make the header
function Header(props) {
  return (
<header className="App-header">
    <div className = "row">
        <div className = "col-lg-4">
           
                <img className="logo" src={logo} alt="logo" />
            
        </div>
        <div className = "col-lg-8">
            <h3 className="headerTitle">The Classic Car Company</h3>

    
        </div>
    </div>
      
</header>
  );
}

export default Header;