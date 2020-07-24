import * as React from 'react';
import { ControlledEditor } from '@monaco-editor/react';

//eslint-disable-next-line
export default function Home() {
  const [isEditorReady, setIsEditorReady] = React.useState(false);
  const [value, setValue] = React.useState('');
  const valueGetter = React.useRef<() => void>();

  function handleEditorDidMount(_valueGetter) {
    setIsEditorReady(true);
    valueGetter.current = _valueGetter;
  }

  const handleEditorChange = (ev, value) => {
    setValue(value);
  };

  return (
    <React.Fragment>
      <button
        onClick={() => console.log('value', value)}
        disabled={!isEditorReady}
      >
        Show value
      </button>
      <ControlledEditor
        height="90vh"
        language="javascript"
        value={value}
        onChange={handleEditorChange}
        editorDidMount={handleEditorDidMount}
      />

      <pre>Result</pre>
    </React.Fragment>
  );
}
