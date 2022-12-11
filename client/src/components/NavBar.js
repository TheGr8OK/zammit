import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Cookies from 'universal-cookie'
import axios from "axios";
import "../NavBar.css";

function NavBar() {
  const cookies = new Cookies();
  const [click, setClick] = useState(false);
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    if(typeof cookies.get('accessToken') === "undefined"){
      setLogged(false)
    }
    else{
    axios.get("http://localhost:4000/testToken", {
      headers: {
        authorization: cookies.get('accessToken')
      }
    }).then(res => {
      console.log(res)
      if (res.data === "admin" || res.data === "moderator") {
        setLogged(true);
      }
      else {
        setLogged(false);
      }
    }).catch(err =>{
      console.log(err)
        setLogged(false)
    })
  }
  }, [logged])


  const logout = () => {
    setLogged(false);
    cookies.remove("accessToken")
    window.location.reload();
  }

  const handleClick = () => setClick(!click);
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">

          <ul className={click ? "nav-menu active" : "nav-menu"}>
           {!logged && <li className="nav-item">
              <NavLink
                exact="true"
                to="/"
                // activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Login
              </NavLink>
            </li>}
            <li className="nav-item">
              <NavLink
                exact="true"
                to="/movies"
                // activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Movies
              </NavLink>
            </li>
            {logged && <><li className="nav-item">
              <NavLink
                exact="true"
                to="/addMovie"
                // activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Add Movie
              </NavLink>
            </li><li className="nav-item">
                <NavLink
                  exact="true"
                  // activeClassName="active"
                  className="nav-links"
                  onClick={logout}
                >
                  Logout
                </NavLink>
              </li></>}
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;