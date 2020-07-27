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
// I accept an object like
const PROPS = {
  message: 'hello this is my message',
  count: 5,
} 

// Also I accept a variable name called config so you can configure the name
const config = {
  name: 'FloatingComponent'
};
*/`);
};

const commonTemplate = (name = 'Component') => `
import React from 'react';
import { text, number } from '@storybook/addon-knobs';
import { ${name} } from './index';

export default {
  title: '${name}',
  component: ${name},
};
`;

const parseObjectToArrayNodes = (
  code: acorn.Node
): { key: string; value: string; type: string }[] => {
  const variables = findVariablesInCode(code);
  if (variables.length > 0) {
    const filteredProperties = variables.filter((node) => {
      return node.id.name !== 'config';
    });

    const properties = filteredProperties[0].init.properties;

    const parsedNodes = properties.map((node) => {
      return {
        key: node.key.name,
        value: node.value.value,
        type: typeof node.value.value
      };
    });

    return parsedNodes;
  }

  return [];
};

const findVariablesInCode = (code: acorn.Node) => {
  const declarationNodes = [];
  walk.simple(code, {
    VariableDeclaration(node: any) {
      declarationNodes.push([...node.declarations]);
    }
  });

  const mergedArray = declarationNodes.reduce((acc, value) => {
    return [...acc, ...value];
  }, []);

  return mergedArray;
};

const parseComponentName = (code) => {
  const variables = findVariablesInCode(code);

  const ComponentVariable = variables.find((node) => {
    return node.id.name === 'config';
  });

  if (ComponentVariable) {
    const propertyName = ComponentVariable.init.properties.find(
      (property) => property.key.name === 'name'
    );

    return propertyName.value.value;
  }

  return undefined;
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

const generateStorybook = (
  nodes,
  options: { name: string } = { name: 'Component' }
) => {
  const name = options.name.slice(0, 1).toUpperCase() + options.name.slice(1);
  return `
    ${commonTemplate(name)}

    export const ${name}Demo = () => {
      ${generateStorybookFields(nodes)}
      return (
        <${name} ${generateComponentRendering(nodes)} />
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
    const code = acorn.parse(value);

    const componentName = parseComponentName(code);
    const options = componentName
      ? {
          name: componentName
        }
      : undefined;
    const generatedStorybookComponent = formatJs(
      generateStorybook(parseObjectToArrayNodes(code), options)
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
