import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import Auth from '../utils/auth';

function MenuBar() {
    // const  username  = Auth.getProfile().data.username;
    
    const logout = (event) => {
      event.preventDefault();
      Auth.logout();
    }
    const pathname = window.location.pathname;
  
    const path = pathname === '/' ? 'satin' : pathname.substr(1);
    const [activeItem, setActiveItem] = useState(path);
  
    const handleItemClick = (e, { name }) => setActiveItem(name);
  
    const menuBar =  Auth.loggedIn() ? (
      <Menu pointing secondary size="massive" color="teal">
        <Menu.Item name={Auth.getProfile().data.username} active as={Link} to="/" />
  
        <Menu.Menu position="right">
          <Menu.Item name="logout" onClick={logout} />
        </Menu.Menu>
      </Menu>
    ) : (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item
        name="satin"
        active={activeItem === 'satin'}
        onClick={handleItemClick}
        as={Link}
        to="/"
      />
  
      <Menu.Menu position="right">
        <Menu.Item
          name="login"
          active={activeItem === 'login'}
          onClick={handleItemClick}
          as={Link}
          to="/login"
        />
        <Menu.Item
          name="register"
          active={activeItem === 'register'}
          onClick={handleItemClick}
          as={Link}
          to="/register"
        />
      </Menu.Menu>
    </Menu>
  );
  
  return menuBar;
}

export default MenuBar;