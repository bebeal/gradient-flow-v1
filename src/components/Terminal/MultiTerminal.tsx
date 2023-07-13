import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Terminal from './Terminal';
import { useEffect } from 'react';
import { parseOutMarkdownCodeBlock } from '../CodeHighlightSyntax/CodeHighlightSyntax';
import { nanoid } from 'nanoid';

export interface MultiTerminalProps {
  terminals?: Array<{ title: string; code: string; language?: string; parseFromMarkdown?: boolean }>;
  draggable?: boolean;
  resizable?: boolean;
};

const MultiTerminal = (props: MultiTerminalProps) => {
  const { terminals = [], draggable = false, resizable = false } = props;

  const updateTerminalProps = (terminalProps: any) => {
    const [parsedLanguage, parsedCode]: any = parseOutMarkdownCodeBlock(terminalProps.code, true);
    terminalProps.language = parsedLanguage
    terminalProps.code = parsedCode;
  };

  useEffect(() => {
    terminals.forEach((terminalProps: any) => {
      if (terminalProps.parseFromMarkdown === undefined) {
        terminalProps.parseFromMarkdown = terminalProps.code.trim().startsWith('\`\`\`');
        console.log('0', JSON.stringify(terminalProps, null, 2), terminalProps.parseFromMarkdown);
      }
      console.log('1', JSON.stringify(terminalProps, null, 2), terminalProps.parseFromMarkdown);

      if (terminalProps.parseFromMarkdown) {
        terminalProps.parseFromMarkdown = false;
        updateTerminalProps(terminalProps);
      }
    })
  }, [terminals]);

  return (
    <Tabs>
      <TabList>
        {terminals.map(({ title }, index) => <Tab key={`multi-tab-${index}-${nanoid()}`}>{title}</Tab>)}
      </TabList>

      {terminals.map(({ title, code, language, parseFromMarkdown }, index) => (
        <TabPanel key={index}>
          <Terminal topBar={false} parseFromMarkdown={parseFromMarkdown} title={title} code={code} language={language} draggable={draggable} resizable={resizable}/>
        </TabPanel>
      ))}
    </Tabs>
  );
};

export default MultiTerminal;
