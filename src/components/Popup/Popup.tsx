import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";

const PopupContent = styled.div<any>`
  position: absolute;
  z-index: 10000;
  background: white;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  transform: translate(0, -60%);
  top: ${(props) => props.top || "0"} !important;
  left: ${(props) => props.left || "0"} !important;

  &:before {
    content: "";
    position: absolute;
    top: calc(100% - 1px);
    left: 50%;
    border-width: 10px;
    border-style: solid;
    border-color: white transparent transparent transparent;
    transform: translate(-50%, 0);
  }
`;

export interface PopupProps {
  children: any;
  isOpen?: boolean;
  onClose?: () => void;
  buttonRef: any;
};

const Popup = (props: PopupProps) => {
  const { children, isOpen, onClose, buttonRef } = props;
  const popupContentRef = useRef<any>(null);
  const [popupPosition, setPopupPosition] = useState({ top: 'auto', left: 'auto' });
  const [correctedPosition, setCorrectedPosition] = useState({ top: 'auto', left: 'auto' });

  const stopPropagation = (e: any) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      
      if (isOpen && popupContentRef.current && !popupContentRef.current.contains(e.target) && buttonRef.current &&
      !buttonRef.current.contains(e.target)) {
        onClose?.();
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [buttonRef, isOpen, onClose, popupContentRef]);

  useEffect(() => {
    // Show the popup first at the button's position
    if (isOpen && buttonRef.current) {
      setPopupPosition({
        top: `${buttonRef.current.offsetTop}px`,
        left: `${buttonRef.current.offsetLeft}px`
      });
    }
  }, [isOpen]);
  

  useEffect(() => {
    if (isOpen && popupContentRef.current) {
      // Adjust the position after the popup is shown
      const popupBB = popupContentRef.current.getBoundingClientRect();

      // Initialize new positions with current ones to maintain existing offset
      let newTop = parseFloat(popupPosition.top);
      let newLeft = parseFloat(popupPosition.left);
      if (popupBB.top < 0) {
        // console.log('popupBB.top < 0');
        newTop = -popupBB.top * 4;
      } else if (popupBB.bottom > window.innerHeight) {
        // console.log('popupBB.bottom > window.innerHeight');
        newTop = window.innerHeight - popupBB.height;
      } else if (popupBB.left < 0) {
        // console.log('popupBB.left < 0');
        newLeft = -popupBB.left;
      } else if (popupBB.right > window.innerWidth) {
        // console.log('popupBB.right > window.innerWidth');
        newLeft = window.innerWidth - popupBB.width;
      }
      // Apply the adjusted position
      setPopupPosition({ top: `${newTop}px`, left: `${newLeft}px` });
    }
  }, [isOpen, popupContentRef]);
  

  return isOpen ? (
    <PopupContent ref={popupContentRef} top={popupPosition.top} left={popupPosition.left} onClick={stopPropagation}>{children}</PopupContent>
  ) : null;
};

export default Popup;
