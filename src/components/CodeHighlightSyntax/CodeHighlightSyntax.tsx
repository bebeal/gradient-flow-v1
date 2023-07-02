
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import ReactDOMServer from 'react-dom/server';
import { nanoid } from "nanoid";

// for syntax highlighting
import { Prism as SyntaxHighlighter, createElement } from 'react-syntax-highlighter';
import { SyntaxStyle } from './SyntaxStyle';

// for parsing out code blocks from markdown
import styled from "styled-components";
import { noop } from "../../constants";

export const parseOutMarkdownCodeBlock = (content: string, returnLanguage: boolean = false) => {
  const regex = /(```|~~~)([a-z]*)\n([\s\S]*?)\n(```|~~~)/;
  const match = regex.exec(content);
  let results = ['', ''];
  if (match) {
    const language = match[2] || '';
    const codeBlock = match[3];
    results = [language, codeBlock];
  }

  if (returnLanguage) {
    return results;
  } else {
    return results[1];
  }
};

export const getLanguageFromMarkdownCodeBlock = (content: any) => {
  return parseOutMarkdownCodeBlock(content, true)[0];
};

const CodeLine = styled.span<any>`
  line-height: 1.5;
  margin-left: 1px;
  margin-right: 1px;
  width: 100%;
  height: 100%;
  &:hover {
    z-index: 50;
    cursor: pointer;
    background: #777777;
    background: rgba(119, 119, 119, 0.2);
    box-shadow: 0px 0px 5px #d9d9e3, 0px 0px 10px #d9d9e3, 0px 0px 2px #ffffff;
  }
`;

export interface CodeHighlightSyntaxProps {
  code: string;                     // code to highlight
  language?: string;                // language code is in for language specific highlighgts
  style?: any;                      // syntax highlight style
  parseFromMarkdown?: boolean;      // whether to parse out code blocks from markdown
  copyOnClick?: boolean;            // whether to copy code line on click
};

const CodeHighlightSyntax = ({
  code,
  language='',
  style=SyntaxStyle,
  parseFromMarkdown=true,
  copyOnClick=true
}: CodeHighlightSyntaxProps) => {
  const [codeLanguage, codeBlock]: any = parseFromMarkdown ? parseOutMarkdownCodeBlock(code, true) : [language, code];
  const codeLines = codeBlock.split('\n');
  const uuids = codeLines.map((codeLine: string) => nanoid());

  const onCodeLineClicked = useCallback(async (event: any, codeLine: any) => {
    await navigator.clipboard.writeText(codeLine);
  }, []);

  const renderer = ({ rows, stylesheet, useInlineStyles }: any) => {
    return rows.map((node: any, i: number) => {
      const codeLine: any = createElement({
        node,
        stylesheet,
        useInlineStyles,
        key: `code-segment-${i}`,
      });
      return (
        <CodeLine
          key={i}
          id={`${i}-${uuids[i]}`}
          onClick={(event: any) => copyOnClick ? onCodeLineClicked(event, codeLines[i]) : noop()}
        >
          {codeLine}
        </CodeLine>
      );
    });
  };
  
  return (
  <SyntaxHighlighter
    language={codeLanguage}
    style={style}
    renderer={renderer}
    PreTag="pre"
    CodeTag="code"
    customStyle={{
      margin: 0,
      padding: 0,
    }}
  >
    {codeBlock}
  </SyntaxHighlighter>
  )
};


export default CodeHighlightSyntax;
