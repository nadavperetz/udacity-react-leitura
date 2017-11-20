import React from 'react';
import {ButtonGroup, DropdownButton, MenuItem} from 'react-bootstrap'


const FilterPosts = ({title, options, changeFilter}) => (
    <ButtonGroup className="pull-right">
      <DropdownButton title={title} id="bg-nested-dropdown">
        {options && options.map((option, index) =>
            <MenuItem eventKey={option} key={index} onSelect={changeFilter}>
              {option && option[0].toUpperCase() + option.slice(1)}
              </MenuItem>
        )}
      </DropdownButton>
    </ButtonGroup>
);

export default FilterPosts;
