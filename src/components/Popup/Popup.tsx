import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

interface PopupContentProps {
  children: React.ReactNode;
  top: string;
  left: string;
  direction: 'up' | 'down';
}

const PopupContent = styled.div<PopupContentProps>`
  position: absolute;
  max-width: 200px;
  z-index: 51;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  top: ${(props) => props.top || "auto"};
  left: ${(props) => props.left || "auto"};
  transform: ${(props) => props.direction === 'up' ? 'translate(-50%, -100%)' : 'translate(-50%, 0)'};
  &:before {
    content: "";
    border-width: 10px;
    border-style: solid;
    position: absolute;
    z-index: 50;
    left: 50%;
    transform: translate(-50%, 0);
    top: ${(props) => props.direction === 'up' ? '100%' : '-20px'};
    border-color: ${(props) => props.direction === 'down' ? 'transparent transparent white transparent' : 'white transparent transparent transparent'};
  }
`;

export interface PopupProps {
  children: any;
  isOpen?: boolean;
  onClose?: () => void;
  buttonRef: any;
  direction?: 'up' | 'down';
};

const Popup = (props: PopupProps) => {
  const { children, isOpen, onClose, buttonRef, direction = 'up' } = props;
  const popupContentRef = useRef<any>(null);
  const [popupPosition, setPopupPosition] = useState<any>({ top: '0px', left: '0px' });
  const calculatePopupPosition = useCallback(() => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    
    // Fetch width and height of the popup.
    const popupWidth = popupContentRef.current ? popupContentRef.current.offsetWidth : 0;
    const popupHeight = popupContentRef.current ? popupContentRef.current.offsetHeight : 0;

    let left = rect.left + scrollLeft + rect.width / 2;
    let top = direction === 'down' ? rect.top + scrollTop + rect.height : rect.top + scrollTop - 10;

    // Check if the popup goes out of the right side of the viewport.
    if (left + popupWidth / 2 > window.innerWidth) {
      left = window.innerWidth - popupWidth / 2;
    }

    // Check if the popup goes out of the left side of the viewport.
    if (left - popupWidth / 2 < 0) {
      left = popupWidth / 2;
    }

    // Check if the popup goes out of the bottom of the viewport.
    if (direction === 'down' && top + popupHeight > window.innerHeight) {
      top = window.innerHeight - popupHeight;
    }

    // Check if the popup goes out of the top of the viewport.
    if (direction === 'up' && top < 0) {
      top = 0;
    }
    return { top: `${top}px`, left: `${left}px` };
  }, [buttonRef, direction]);

  useLayoutEffect(() => {
    if (isOpen && buttonRef.current) {
      const position = calculatePopupPosition();
      setPopupPosition(position);
    }
  }, [isOpen, buttonRef, calculatePopupPosition]);

    useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupContentRef.current && !popupContentRef.current.contains(event.target) && buttonRef.current && !buttonRef.current.contains(event.target)) {
        onClose?.();
      }
    };
    
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return ReactDOM.createPortal(
    isOpen ? (
      <PopupContent 
        ref={popupContentRef} 
        top={popupPosition.top} 
        left={popupPosition.left}
        direction={direction}
      >
        {children}
      </PopupContent>
    ) : null,
    document.body
  );
};

export default Popup;