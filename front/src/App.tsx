import React, {useState} from 'react';
import axios from 'axios';

function App() {
  const [state, setState] = useState({
    object: '',
    action: '',
    args: ''
  });

  async function getHelp() {
    const res = await axios.post('http://localhost:9000/api', {
      cmd: 'util.help'
    });
    console.log(res.data);
  }

  function updateState(key: string, value: string) {
    setState({
      ...state,
      [key]: value
    });
  }

  return (
    <div>
      <input type="text" onChange={(elem) => updateState("object", elem.currentTarget.value)} />
      <input type="text" onChange={(elem) => updateState("action", elem.currentTarget.value)} />
      <button onClick={() => getHelp()}>Send</button>
      <textarea cols={30} rows={10} onChange={(elem) => updateState("args", elem.currentTarget.value)}></textarea>
    </div>
  );
}

export default App;
