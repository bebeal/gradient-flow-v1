import React, {
  useRef,
  FC,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import styled from "styled-components";
import { nanoid } from "nanoid";
import TopBarComponent from "./TopBar";
import CodeHighlightSyntax, { getLanguageFromMarkdownCodeBlock, parseOutMarkdownCodeBlock } from "../CodeHighlightSyntax/CodeHighlightSyntax";
import { Resizable } from 're-resizable';
import Draggable from "react-draggable";

// nothing should ever be able to be bigger than this overall,  no scroll here cause wraps over on top of top bar
const TerminalWrapper = styled.div<any>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  z-index: 50;
`;

const PadChild = styled.div<any>`
  padding: 4px 8px;
  width: fit-content;
  height: fit-content;
`;

const TextContainer = styled.div<any>`
  width: max-content;
  white-space: pre;
  display: block;
  height: 100%;
  text-align: left;
`;

const ConsoleWrapper = styled.div<any>`
  background: #000000;
  border: none;
  border-radius: 4px;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  font-size: 1rem;
  max-height: 100%;
  overflow-x: auto;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export interface TerminalProps {
  id?: string;
  code?: any;
  language?: string;
  parseFromMarkdown?: boolean;
  title?: string;
  topBar?: boolean;
  topBarProps?: any;
  draggable?: boolean;
  resizable?: boolean;
}

const Terminal: FC<TerminalProps> = ({
  id = nanoid(),
  code = "",
  language,
  parseFromMarkdown = false,
  title= "Terminal",
  topBar = true,
  topBarProps = {
    fontSize: '12px',
    copyButton: {
      size: '10px'
    },
  },
  draggable = false,
  resizable = false,
}) => {
  let codeBlock: any = typeof code === "string" ? code : Object.values(code)?.[0] || "";
  let codeLanguage = language;
  if (parseFromMarkdown || codeBlock?.trim().startsWith("\`\`\`")) {
    const [parsedLanguage, parsedCodeBlock]: any = parseOutMarkdownCodeBlock(codeBlock, true);
    codeLanguage = parsedLanguage;
    codeBlock = parsedCodeBlock;
  }
  const terminalId = `${id}-${title}-terminal`
  const handleId = `${id}-${title}-drag-handle`;
  const topBarRef = useRef(null);
  const terminalRef = useRef(null);
  const resizableRef = useRef(null);

const TerminalComponent = () => {
  return (
  <TerminalWrapper id={terminalId} ref={terminalRef}> 
      {topBar && <TopBarComponent
        ref={topBarRef}
        title={title}
        language={codeLanguage}
        className={handleId}
        {...topBarProps}
        copyButton={ { ...topBarProps.copyButton, contentToCopy: codeBlock} }
      />}
      <ConsoleWrapper>
      <TextContainer>
        <PadChild>
          <CodeHighlightSyntax
            language={codeLanguage}
            code={codeBlock}
            parseFromMarkdown={parseFromMarkdown}
          />
        </PadChild>
      </TextContainer>
    </ConsoleWrapper>
  </TerminalWrapper>
  );
};

const ResizableTerminal = (terminal: any) => {
  return resizable ? (
    <Resizable
      ref={resizableRef}
      boundsByDirection={true}
      resizeRatio={2}
      bounds="window"
      scale={1}
      style={{
        width: "100%",
        height: "100%",
      }}
      handleStyles={{ right: {display: 'block'}, bottom: {display: 'block'}, bottomRight: {display: 'block'}, left: {display: 'none'}, top: {display: 'none'}, topLeft: {display: 'none'}, topRight: {display: 'none'}, bottomLeft: {display: 'none'}, }}
  >
    {terminal}
  </Resizable>
  ) : terminal;
};

const DraggableTerminal = (terminal: any) => {
    return draggable ? (
      <Draggable
        handle={`.${handleId}`}
        nodeRef={terminalRef}
        scale={1}
      >
        {terminal}
      </Draggable>
    ) : terminal;
};

  const getTerminal = () => {
    let terminal = TerminalComponent();
    if (resizable) {
      terminal = ResizableTerminal(terminal);
    }
    if (draggable) {
      terminal = DraggableTerminal(terminal);
    }
    return terminal;
  }

  return getTerminal();
};

export default React.memo(Terminal);
