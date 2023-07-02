import { FC, forwardRef, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";
import CopyButton, { CopyButtonProps } from "../CopyButton/CopyButton";
import { OrgTags } from "../../svgs/OrgTags/OrgTags";
import { set } from "lodash";

const CopyButtonWrapper = styled.div`
  display: flex;
  width: fit-content;
  height: fit-content;
`;

const BarWrapper = styled.div<any>`
  display: flex;
  width: 100%;
  height: auto;
  flex-direction: column;
  z-index: 50;
`;

const Bar = styled.div<any>`
  display: flex;
  width: auto;
  height: 30px;
  background: #343541;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  padding: 4px;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  cursor: pointer;
`;

const PushRight = styled.div`
  margin-left: auto;
`;

const LanguageWrapper = styled.div<any>`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
  max-width: 25%;
  overflow: auto;
  top: -1px;
  font-size: ${props => props.fontSize || '12px'};
`;

const IconWrapper = styled.div<any>`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-right: 2px;
  height: 100%;
`;

const TitleWrapper = styled.div<any>`
  width: 100%:
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  font-size: ${props => props.fontSize || '12px'};
`;

interface TopBarProps {
  children?: any;
  title?: string;
  language?: string;
  copyButton?: Partial<CopyButtonProps>;
  className?: string;
  fontSize?: string;
}

const TopBar = forwardRef<any>(({
  children,
  title='',
  language='', 
  copyButton={
    contentToCopy: '',
    text: undefined,
    size: '12px'
  }, 
  className,
  fontSize='12px'
 }: TopBarProps, ref: any) => {
  const copyButtonRef = useRef<any>(null);
  const languageRef = useRef<any>(null);
  const [overflowing, setOverflowing] = useState(false);
  const tag = Object.keys(OrgTags).includes(language) ? OrgTags[language](0, copyButton.size || '12px', copyButton.size || '12px').icon : undefined;

  const triggerButton = () => {
    if (copyButton && copyButtonRef && copyButtonRef.current) {
      copyButtonRef.current.copyToClipboard();
    }
  };

  useEffect(() => {
    const checkOverflow = () => {
      if (languageRef.current) {
        setOverflowing(languageRef.current.scrollWidth > languageRef.current.clientWidth);
      }
    };

    const resizeObserver = new ResizeObserver((entries) => {
      setOverflowing(false);
      setTimeout(checkOverflow, 1);
    });

    if (ref.current) {
      resizeObserver.observe(ref.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [ref, languageRef]);

  return (
    <BarWrapper ref={ref} className={className} >
      <Bar onClick={triggerButton} >
        <IconWrapper>{tag}</IconWrapper>
        <LanguageWrapper ref={languageRef} fontSize={fontSize}>{overflowing ? '' : language}</LanguageWrapper>
        <TitleWrapper fontSize={fontSize}>{title}</TitleWrapper>
        {copyButton && Object.keys(copyButton).length > 0 && (
          <PushRight>
            {copyButton && (
              <CopyButtonWrapper>
                <CopyButton ref={copyButtonRef} {...copyButton} />
              </CopyButtonWrapper>
            )}
          </PushRight>
        )}
      </Bar>
      {children}
    </BarWrapper>
  );
});

export default TopBar;
