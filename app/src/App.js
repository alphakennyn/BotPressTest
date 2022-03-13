import { useState } from 'react';
import PathInput from './components/PathInput';
import DirectoryBox from './components/DirectoryBox';
import { getItemsInDirectory } from './utils/rest';

import logo from './botpress-logo.png';
import './App.css';

// c:/Users/Kenny/Documents/MyCode/server-practice

function App() {
  const [directoryList, setDirectoryList] = useState([])

  const submitHandler = async (path) => {
    try {
      const { data } = await getItemsInDirectory(path)
      setDirectoryList([...directoryList, data])
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <PathInput submitHandler={submitHandler} />
      </div>
      <DirectoryBox viewingDirectoryList={directoryList}/>
    </div>
  );
}

export default App;
