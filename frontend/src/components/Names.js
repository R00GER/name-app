import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableSortLabel,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core/';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Filter from './Filter';
import NamesService from '../services/names';

const Names = ({
  names,
  search,
  searchName,
  updateNames,
}) => {
  const [filter, setFilter] = useState('all');
  const [groupedNames, setGroupedNames] = useState([]);
  const [orderByName, setOrderByName] = useState({ sorted: false, asc: false });
  const [orderByAmount, setOrderByAmount] = useState({
    sorted: false,
    asc: true,
  });

  useEffect(() => {
    const occurances = names.map((name) => {
      const nameCount = names.filter((item) => item.name === name.name).length;

      const newName = {
        ...name,
        amount: nameCount,
      };

      return newName;
    });

    const uniques = [...new Map(occurances.map((item) => [item.name, item])).values()];
    setGroupedNames(uniques.sort((a, b) => b.amount - a.amount));
  }, [filter, search]);

  const filterNames = (name) => setFilter(name);

  const filteredNames = filter === 'all' ? names : groupedNames;

  const sortByAmount = () => {
    const { sorted, asc } = orderByAmount;
    setOrderByAmount({ sorted: !sorted, asc: !asc });

    setOrderByName({ sorted: false, asc: !asc });
    filteredNames.sort((a, b) => (orderByAmount.asc ? a.amount - b.amount : b.amount - a.amount));
  };

  const sortByName = () => {
    const { sorted, asc } = orderByName;
    setOrderByName({ sorted: !sorted, asc: !asc });

    setOrderByAmount({ sorted: false, asc: !asc });
    filteredNames.sort((a, b) => (
      orderByName.asc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    ));
  };

  const deleteName = async (id) => {
    try {
      const response = await NamesService.deleteName(id);

      if (response) {
        updateNames(id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="names-container">
      <Filter filterNames={filterNames} searchName={searchName} />
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">
                <TableSortLabel
                  active={orderByName.sorted}
                  direction={orderByName.asc ? 'asc' : 'desc'}
                  onClick={sortByName}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              {filter === 'grouped' ? (
                <TableCell align="right">
                  <TableSortLabel
                    active={orderByAmount.sorted}
                    direction={orderByAmount.asc ? 'asc' : 'desc'}
                    onClick={sortByAmount}
                  >
                    Count
                  </TableSortLabel>
                </TableCell>
              ) : (
                <TableCell align="right">Actions</TableCell>
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {filter === 'all'
              ? names.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">
                    <DeleteOutlineIcon
                      className="icon delete-icon"
                      style={{ color: '#a2a2a2' }}
                      onClick={() => deleteName(row.id)}
                    />
                  </TableCell>
                </TableRow>
              ))
              : groupedNames.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  {filter === 'grouped' && <TableCell align="right">{row.amount}</TableCell>}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="names-amount">{`Total amount of names: ${names.length}`}</div>
    </div>
  );
};

Names.propTypes = {
  names: PropTypes.instanceOf(Array).isRequired,
  search: PropTypes.bool.isRequired,
  searchName: PropTypes.func.isRequired,
  updateNames: PropTypes.func.isRequired,
};

export default Names;
