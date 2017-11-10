import React from 'react';
import {Nav, NavItem} from 'react-bootstrap'


const CategoriesSideBar = (props) => (
    <Nav bsStyle="pills" stacked activeKey={-1}>
      {props.categories.map((cat, index) =>
          <NavItem key={index} eventKey={index} href="/home">{cat.name}</NavItem>
      )}

    </Nav>
);

export default CategoriesSideBar;
