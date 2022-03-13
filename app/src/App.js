import { useState } from 'react';
import PathInput from './components/PathInput';
import DirectoryBox from './components/DirectoryBox';
import { getItemsInDirectory } from './utils/rest';

import logo from './botpress-logo.png';
import './App.css';

// c:/Users/Kenny/Documents/MyCode/server-practice

function App() {
  const [directoryList, setDirectoryList] = useState([])
  const [isError, setError] = useState(false)
  const [isLoadingNewDirectory, setLoadingNewDirectory] = useState(false)

  const submitHandler = async (path) => {
    try {
      setError(false)
      setLoadingNewDirectory(true)
      const list = await getItemsInDirectory(path)
      const data = {
        ...list,
      searchedDate: new Date()
      }
      setDirectoryList([data, ...directoryList])
    } catch (error) {
      setError(true)
    } finally {
      setLoadingNewDirectory(false)
    }
  }

  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <PathInput submitHandler={submitHandler} />
      </div>
      {
        isError && <p id="error-message">An error has occured. Please try again.</p>
      }
      <DirectoryBox viewingDirectoryList={directoryList} isLoadingNewDirectory={isLoadingNewDirectory}/>
    </div>
  );
}

export default App;
