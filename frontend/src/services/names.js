import axios from 'axios';

const baseUrl = 'http://localhost:4000';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (name) => {
  const response = await axios.post(baseUrl, name);
  return response.data;
};

const deleteName = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

const exports = { getAll, createNew, deleteName };

export default exports;
