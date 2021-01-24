import React from 'react';
import PropTypes from 'prop-types';

const Content = ({ children }) => (
  <div style={{ padding: '0 .5rem' }}>{children}</div>
);

Content.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Content;
