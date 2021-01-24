import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button } from '@material-ui/core/';

import nameService from '../services/names';

const AddNew = ({ handleNewNames }) => {
  const [newName, setNewName] = useState('');
  const [message, setMessage] = useState('');

  const addNew = async () => {
    try {
      const response = await nameService.createNew({ name: newName });
      handleNewNames(response);
      setNewName('');
      setMessage('New name added');
    } catch (error) {
      console.log(error);
      setMessage('Something went wrong');
    }
  };

  const handleName = (e) => setNewName(e.target.value);

  return (
    <div className="addnew-container">
      <form>
        <div className="form-container">
          <TextField
            name="name"
            id="add-new"
            label="Add new name"
            variant="outlined"
            size="small"
            value={newName}
            onChange={handleName}
          />
          <Button
            variant="contained"
            style={{
              backgroundColor: '#dc1e32',
              color: '#fff',
              marginLeft: '.5rem',
            }}
            onClick={addNew}
          >
            Add new
          </Button>
        </div>
      </form>
      <div className="add-new-message">{message}</div>
    </div>
  );
};

AddNew.propTypes = {
  handleNewNames: PropTypes.func.isRequired,
};

export default AddNew;
