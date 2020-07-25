import * as React from 'react';
import Head from 'next/head';
import { ControlledEditor } from '@monaco-editor/react';
import * as acorn from 'acorn';
import * as walk from 'acorn-walk';
import prettier from 'prettier/standalone';
import parserBabel from 'prettier/parser-babel';

import { Grid } from '@components/grid';
import { Button } from '@components/button';

const formatJs = (code) => {
  return prettier.format(code, { parser: 'babel', plugins: [parserBabel] });
};

const getValueEditor = () => {
  return formatJs(`
/* 
I accept an object like
const PROPS = {
  message: 'hello this is my message',
  count: 5,
} 
*/`);
};

const commonTemplate = `
import React from 'react';
import { text, number } from '@storybook/addon-knobs';
import { Component } from './index';

export default {
  title: 'Component',
  component: Component,
};
`;

const parseJavascriptToArrayNodes = (code) => {
  const parsedJS = acorn.parse(code);

  let nodes = [];

  walk.simple(parsedJS, {
    ObjectExpression(node: any) {
      nodes.push(node.properties);
    }
  });

  nodes = JSON.parse(JSON.stringify(nodes));

  nodes = nodes[0];

  const parsedNodes = nodes.map((node) => {
    return {
      key: node.key.name,
      value: node.value.value,
      type: typeof node.value.value
    };
  });

  return parsedNodes;
};

const getTypeFn = (type) => {
  if (type === 'number') {
    return 'number';
  }

  return 'text';
};

const getValue = (value, type) => {
  if (type === 'string') {
    return `"${value}"`;
  }

  return value;
};

const generateStorybookFields = (nodes) => {
  const parsedString = nodes.map((node) => {
    return `const ${node.key} = ${getTypeFn(node.type)}('${
      node.key
    }', ${getValue(node.value, node.type)});\n`;
  });

  return parsedString.join('');
};

const generateComponentRendering = (nodes) => {
  return nodes
    .map((node) => {
      return `${node.key}={${node.key}}\t`;
    })
    .join('');
};

const generateStorybook = (nodes) => {
  return `
    ${commonTemplate}

    export const ComponentDemo = () => {
      ${generateStorybookFields(nodes)}
      return (
        <Component ${generateComponentRendering(nodes)} />
      )
     
    }
  `;
};

//eslint-disable-next-line
export default function Home() {
  const [isEditorReady, setIsEditorReady] = React.useState(false);
  const [value, setValue] = React.useState(getValueEditor());
  const [outputValue, setOutputValue] = React.useState('');

  function handleEditorDidMount() {
    setIsEditorReady(true);
  }

  const handleEditorChange = (ev, value) => {
    setValue(value);
  };

  const parseJS = () => {
    const parsedNodes = parseJavascriptToArrayNodes(value);

    const generatedStorybookComponent = formatJs(
      generateStorybook(parsedNodes)
    );

    setOutputValue(generatedStorybookComponent);
  };

  return (
    <React.Fragment>
      <Head>
        <title>Storybook AI</title>
      </Head>
      <Grid className="mt-3 mb-3">
        <Grid.Column col={3} columnStart={9}>
          <Button onClick={parseJS} disabled={!isEditorReady}>
            Parse value
          </Button>
        </Grid.Column>
      </Grid>

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
            value={outputValue}
            editorDidMount={handleEditorDidMount}
            options={{ readOnly: true }}
          />
        </Grid.Column>
      </Grid>
    </React.Fragment>
  );
}
