import React, { useState } from 'react';
import './App.scss';
import AceEditor from 'react-ace';
import { Select } from 'element-react';

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-terminal';
import 'ace-builds/src-noconflict/theme-solarized_dark';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-twilight';

function App() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState(null);
  const [editorTheme, setEditorTheme] = useState('terminal');
  const [fontSize, setFontSize] = useState(18);
  const [loading, setLoading] = useState(false);
  const [options] = useState([
    {
      value: 'select_theme',
      label: 'Select Theme',
      disabled: true,
    },
    {
      value: 'solarized_dark',
      label: 'Solarized Dark',
    },
    {
      value: 'terminal',
      label: 'Terminal',
    },
    {
      value: 'github',
      label: 'GitHub',
    },
    {
      value: 'twilight',
      label: 'Twilight',
    },
  ]);

  const [fontSizes] = useState([
    {
      value: 'select_theme',
      label: 'Select Theme',
      disabled: true,
    },
    {
      value: 14,
      label: '14',
    },
    {
      value: 16,
      label: '16',
    },
    {
      value: 18,
      label: '18',
    },
    {
      value: 20,
      label: '20',
    },
    {
      value: 22,
      label: '22',
    },
    {
      value: 24,
      label: '24',
    },
  ]);

  const changeTheme = (theme) => {
    setEditorTheme(theme);
  };

  const changeFontSize = (font) => {
    setFontSize(font);
  };

  const handleCodeChange = (code) => {
    setCode(code);
  };

  const proceedCode = () => {
    setOutput(null);
    setLoading(true);
    fetch(`/run`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        script: code,
        lang: 'nodejs',
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        setOutput(res.runResult.output);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="setup_wrapper">
        <div className="setup_fields">
          <Select value={editorTheme} onChange={changeTheme}>
            {options.map((el) => {
              return (
                <Select.Option
                  key={el.value}
                  label={el.label}
                  value={el.value}
                  disabled={el.disabled}
                />
              );
            })}
          </Select>
          <Select
            value={fontSize}
            onChange={changeFontSize}
            style={{ marginLeft: '5px' }}
          >
            {fontSizes.map((el) => {
              return (
                <Select.Option
                  key={el.value}
                  label={el.label}
                  value={el.value}
                  disabled={el.disabled}
                />
              );
            })}
          </Select>
        </div>
        <div className="title_wrapper">
          <h2>NodeJS Online Editor</h2>
        </div>
      </div>
      <div className="App">
        <AceEditor
          mode="javascript"
          theme={editorTheme}
          value={code}
          onChange={handleCodeChange}
          fontSize={fontSize}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
          setOptions={{
            enableBasicAutocompletion: false,
            enableLiveAutocompletion: false,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 2,
          }}
        />
        <div className="output_section">
          Output is: <br />
          <span>{output}</span>
          <span
            className="output_loading_text"
            style={{ display: !loading ? 'none' : 'block' }}
          >
            Loading...
          </span>
        </div>
      </div>
      <button onClick={proceedCode}>Run Code</button>
    </>
  );
}

export default App;
