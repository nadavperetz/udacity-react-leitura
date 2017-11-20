import React from 'react';
import {Navbar} from 'react-bootstrap'

const Header = () => (
    <Navbar inverse collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="/">Projeto Leitura</a>
        </Navbar.Brand>
        <Navbar.Toggle/>
      </Navbar.Header>
    </Navbar>
);

export default Header;