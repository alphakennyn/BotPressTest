import logo from './botpress-logo.png';
import PathInput from './components/PathInput';
import { getItemsInDirectory } from './utils/rest';

import './App.css';

function App() {

  const submitHandler = async (path) => {
    try {
      const items = await getItemsInDirectory(path)
      console.log(items)
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
    </div>
  );
}

export default App;
