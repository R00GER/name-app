import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  InputAdornment,
} from '@material-ui/core/';
import SearchIcon from '@material-ui/icons/Search';

// checked={state.checkedA} onChange={handleChange}
// checked={state.checkedB}
// onChange={handleChange}

const Filter = ({ filterNames, searchName }) => {
  const [filteredBy, setFilteredBy] = useState('all');
  const [name, setName] = useState('');

  const handleFilter = (e) => {
    setFilteredBy(e.target.value);
    filterNames(e.target.value);
  };

  const handleSearchTerm = (e) => {
    setName(e.target.value);
    searchName(e.target.value);
  };

  return (
    <div className="filter-container">
      <RadioGroup
        aria-label="gender"
        name="gender1"
        value={filteredBy}
        onChange={handleFilter}
        row
      >
        <FormControlLabel value="all" control={<Radio />} label="All names" />
        <FormControlLabel
          value="grouped"
          control={<Radio />}
          label="Grouped by amount"
        />
      </RadioGroup>
      <FormControlLabel
        value={name}
        control={(
          <TextField
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon style={{ color: name ? 'inherit' : '#a2a2a2', cursor: 'pointer' }} />
                </InputAdornment>
              ),
            }}
            className="search-input"
            label="Filter by name"
            onChange={handleSearchTerm}
          />
        )}
      />
    </div>
  );
};

Filter.propTypes = {
  filterNames: PropTypes.func.isRequired,
  searchName: PropTypes.func.isRequired,
};

export default Filter;
