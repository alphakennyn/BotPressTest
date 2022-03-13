import logo from './botpress-logo.png';
import PathInput from './components/PathInput';

import './App.css';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <PathInput />
      </div>
    </div>
  );
}

export default App;
