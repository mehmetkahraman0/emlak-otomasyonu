import React from 'react'
import { FaHome } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const Navbar = () => {

  const { userInfo } = useSelector((state) => state.auth);
  
  return (
    <div style={{marginBottom:"20px"}} className='navbar-container'>
      <div className='header'>
        <a href="/"><FaHome className='logo-image'/></a>
        <p className='site-name'>EmlakEvin</p>
      </div>
      <div className='items-container'>
        <ul className='items'>
          <li className="item"><Link className='li' to="/">Ana-Sayfa</Link></li>
          <li className="item"><Link className='li' to="/estatelist">İlanlarımız</Link></li>
          <li className="item"><Link className='li' to="/about">Hakkımızda</Link></li>
          <li className="item"> {userInfo ? (<Link className='li' to="/profile">Profil</Link>) : (<Link className='li' to="/login">Oturum Aç / Kayıt Ol</Link>)} </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
