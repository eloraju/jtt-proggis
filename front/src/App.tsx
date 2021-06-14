import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';

function App() {
  const argsRef = useRef<HTMLTextAreaElement>(null);
  const [commands, setCommands] = useState<{ [key: string]: string[] }>();
  const [selectedCommand, setSelectedCommand] = useState<string>();
  const [selectedAction, setSelectedAction] = useState<string>();

  useEffect(() => {
    getHelp().then((cmds) => {
      setCommands(cmds);
    });
  }, []);

  async function getHelp() {
    const res = await axios.post("http://localhost:9000/api", {
      cmd: "util.help",
    });
    return res.data;
  }

  async function send(cmd: string, args: any): Promise<any> {
    const res = await axios.post("http://localhost:9000/api", {
      cmd,
      args,
    });
    return res.data;
  }

  function drawPlaceholder() {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Select a command
        </div>
      )
  }

  async function sendToServer() {
    const argsData = argsRef.current?.value;
    const args = argsData && argsData.length > 0 ? JSON.parse(argsData) : null
    const cmd = `${selectedCommand}.${selectedAction}`;

    const res = await send(cmd, args);

    console.log(res);
  }

  function getActions(): string[] | null {
    if (commands) {
      if (selectedCommand) {
        return commands[selectedCommand];
      }
    }
    return null;
  }

  function getCommands() {
    return commands ? Object.keys(commands) : [];
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "3fr 1fr" }}>
      <div
        style={{
          display: "grid",
          gridTemplateRows: "55px 100%",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            rowGap: 55,
          }}
        >
          <ApiSelector
            selectorValues={getCommands()}
            onSelectionMade={(selection)=>{setSelectedCommand(selection)}}
            selectedValue={selectedCommand}
          />
          {selectedCommand ? (
            <ApiSelector
              selectorValues={getActions()}
              onSelectionMade={setSelectedAction}
              selectedValue={selectedAction}
            />) :
            drawPlaceholder()
          }
        </div>
        {/*renderRequestResponseTable()*/}
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <button
          disabled={!selectedAction || !selectedCommand}
          onClick={() => sendToServer()}
          style={{ height: 100 }}
        >
          Send
        </button>
        <textarea cols={30} rows={20} ref={argsRef}></textarea>
      </div>
    </div>
  );
}

export default App;

interface ApiSelectorProps {
  selectorValues: string[] | null;
  onSelectionMade: (val: string) => void;
  selectedValue?: string;
}

function ApiSelector({
  selectorValues,
  onSelectionMade,
  selectedValue,
}: ApiSelectorProps) {
  function drawSelector() {
    return (
      <select onChange={(elem) => onSelectionMade(elem.currentTarget.value)}>
        {drawOptions()}
      </select>
    );
  }

  function drawOptions() {
    const options: string[] = [];

    if (!selectedValue) {
      options.push("Select a value");
    }

    if (selectorValues) {
      options.push(...selectorValues);
    }

    return options.map((cmd: string) => (
      <option value={cmd} key={cmd}>
        {cmd}
      </option>
    ));
  }

  return drawSelector();
}