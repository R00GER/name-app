import React from 'react';
import PropTypes from 'prop-types';

const Navigation = ({ logoText, handleView }) => {
  const styles = {
    header: {
      height: '10vh',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 1rem',
      marginBottom: '1rem',
      color: '#fff',
      backgroundColor: '#dc1e32',
    },
    link: {
      padding: '.5rem 0',
      marginRight: '5rem',
      fontSize: '1.1rem',
      borderRadius: '5px',
      width: '10%',
    },
  };

  return (
    <div className="navigation" style={styles.header}>
      <h1 className="header-logo" onClick={() => handleView('names')}>
        {logoText}
      </h1>
      <button type="button" className="link" onClick={() => handleView('add')} style={styles.link}>
        Add new
      </button>
    </div>
  );
};

Navigation.propTypes = {
  logoText: PropTypes.string.isRequired,
  handleView: PropTypes.func.isRequired,
};

export default Navigation;
