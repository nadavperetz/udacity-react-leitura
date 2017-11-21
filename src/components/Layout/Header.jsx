import React from 'react';
import {Navbar} from 'react-bootstrap'
import {Link} from "react-router-dom";

const Header = () => (
    <Navbar inverse collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to={`/`}>Projeto Leitura</a>
        </Navbar.Brand>
        <Navbar.Toggle/>
      </Navbar.Header>
    </Navbar>
);

export default Header;