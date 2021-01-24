import React, { useEffect, useState } from 'react';
import Content from './components/Content';
import Navigation from './components/Navigation';
import Names from './components/Names';
import AddNew from './components/AddNew';
import nameServices from './services/names';
import './App.css';

const App = () => {
  const [allNames, setAllNames] = useState([]);
  const [search, setSearch] = useState(false);
  const [searchedNames, setSearchedNames] = useState([]);
  const [view, setView] = useState('names');

  useEffect(() => {
    const getNames = async () => {
      const initialNames = await nameServices.getAll();
      setAllNames(initialNames.sort((a, b) => a.name.localeCompare(b.name)));
    };
    getNames();
  }, []);

  const handleView = (viewTerm) => {
    setView(viewTerm);
  };

  const handleNewNames = (name) => setAllNames(allNames.concat(name));

  const searchName = (searchTerm) => {
    if (searchTerm) {
      setSearch(true);
    } else {
      setSearch(false);
    }

    setSearchedNames(
      allNames.filter((n) => n.name.toLowerCase().includes(searchTerm.toLowerCase())),
    );
  };

  // console.log(search);

  const updateNames = (id) => setAllNames(allNames.filter((name) => name.id !== id));

  return (
    <div className="app">
      <Navigation handleView={handleView} logoText="Names app" />
      <Content>
        {view === 'names' && (
          <Names
            names={search ? searchedNames : allNames}
            search={search}
            searchName={searchName}
            updateNames={updateNames}
          />
        )}
        {view === 'add' && <AddNew handleNewNames={handleNewNames} />}
      </Content>
    </div>
  );
};

export default App;
