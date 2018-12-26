import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component{
    render(){
      return(
        <nav>
            <div className="nav__logo">
              <Link to="/"> 
                <img src='../assets/Icons/BrainFlix Logo.svg' alt='Logo'/>
              </Link>
            </div>
            <div className="nav__search">
              <input type='text' placeholder='  Search'></input>
              <button type='submit'><img src='../assets/Icons/Search.svg' alt='Search'/></button>
            </div>
            <div className='nav__icons'>
              <Link to="/upload">    
                <img id='camImg' src='../assets/Icons/Content Upload.svg' alt='Add Video'/>
              </Link>  
              <img id='johnImg' src='../assets/Images/john_gibbons.jpg' alt='User Avatar'/>
            </div>
        </nav>
      )
    }
  }

  export default Header;
