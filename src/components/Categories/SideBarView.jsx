import React from 'react';
import {Nav, NavItem} from 'react-bootstrap'

const activeCategoryIndex = (categories, activeCategory) => {
  return categories.findIndex(cat => cat.name === activeCategory);

};

const CategoriesSideBar = ({categories, activeCategory, filterCategory}) => (
    <Nav bsStyle="pills" pullRight={true} stacked activeKey={activeCategoryIndex(categories, activeCategory)}
         onSelect={filterCategory}>
      <NavItem key={-2} disabled={true}>Categories</NavItem>
      {categories.map((cat, index) =>
          <NavItem key={cat.path} eventKey={index} href={`/${cat.path}/`}>
            {cat.name}
          </NavItem>
      )}

    </Nav>
);

export default CategoriesSideBar;
