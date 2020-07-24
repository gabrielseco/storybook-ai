import * as React from 'react';
import { ControlledEditor } from '@monaco-editor/react';

import { Grid } from '@components/grid';

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
      <Grid>
        <Grid.Column col={6}>
          <ControlledEditor
            theme="dark"
            height="100vh"
            language="javascript"
            value={value}
            onChange={handleEditorChange}
            editorDidMount={handleEditorDidMount}
          />
        </Grid.Column>
        <Grid.Column col={6}>
          <ControlledEditor
            theme="dark"
            height="100vh"
            language="javascript"
            value={value}
            onChange={handleEditorChange}
            editorDidMount={handleEditorDidMount}
            options={{ readOnly: true }}
          />
        </Grid.Column>
      </Grid>
    </React.Fragment>
  );
}
