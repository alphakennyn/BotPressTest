import { useState } from 'react';
import PathInput from './components/PathInput';
import DirectoryBox from './components/DirectoryBox';
import { getItemsInDirectory } from './utils/rest';
import useInitSSE from './hooks/useInitSSE';

import logo from './botpress-logo.png';
import './App.css';

// c:/Users/Kenny/Documents/MyCode/server-practice

function App() {
  const [clientId, setClientId] = useState(null)
  const [directoryList, setDirectoryList] = useState([])
  const [isError, setError] = useState(false)
  const [isLoadingNewDirectory, setLoadingNewDirectory] = useState(false)

  useInitSSE((pathChanged) => loadDirectoryItems(pathChanged), setClientId);

  const loadDirectoryItems = async (path) => {
    const list = await getItemsInDirectory(path)
    const data = {
      ...list,
      path,
      searchedDate: new Date()
    }
    setDirectoryList((prevList) => {
      const listWithoutOldPath = prevList.filter((directory) => directory.path !== path)
      return [data, ...listWithoutOldPath]
    })
  }

  const submitHandler = async (path) => {
    try {
      setError(false)
      setLoadingNewDirectory(true)
      await loadDirectoryItems(path)
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
