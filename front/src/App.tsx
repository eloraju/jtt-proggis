import React, {useEffect, useState} from 'react';
import axios from 'axios';

function App() {

  const [commands, setCommands] = useState<{[key: string]: string[]}>()
  const [selectedCommand, setSelectedCommand] = useState<string>() 

  useEffect(()=> {
    (async () => {
      const cmds = await getHelp();
      setCommands(cmds);
    })()

  }, [])

  async function getHelp() {
    const res = await axios.post('http://localhost:9000/api', {
      cmd: 'util.help'
    });
    return res.data;
  }

  function renderActions() {
    if(!selectedCommand || !commands) {
      return <div style={{}}>Select a command</div>
    } 

    return (
      <select>{
        commands[selectedCommand].map(action => {
          return <option value={action} key={action}>{action}</option>
        })
      }</select>
    )
  }

  function renderRequestResponseTable() {
    return (
      <table>
        <thead>
          <tr>
            <th>Request</th>
            <th>Response</th>
          </tr>
        </thead>
        <tbody>
          {[{req:'test', res: 'tat'},{req: 'bye', res:'hi'}].map(rr=>{
            return (
              <tr key={rr.req}>
                <td>{rr.req}</td>
                <td>{rr.res}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }

  return (
    <div style={{display: "grid", gridTemplateColumns: '3fr 1fr'}}>
      <div style={{
        display: "grid", gridTemplateRows: '55px 100%'
      }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: '1fr 1fr',
        rowGap: 55
      }}>
        <select onChange={(elem)=>setSelectedCommand(elem.currentTarget.value)}>{ commands &&
            Object.keys(commands).map((cmd:string) => {
              return <option value={cmd} key={cmd}>{cmd}</option>
            })
          }</select>
          {renderActions()}
      </div>
        {renderRequestResponseTable()}
      </div>
      <div style={{display: 'flex', flexDirection:'column'}}>
        <button onClick={() => getHelp()} style={{height: 100}}>Send</button>
        <textarea cols={30} rows={20}></textarea>
      </div>
    </div>
  );
}

export default App;
