import React, { useState, useRef } from "react";
import styled from "styled-components";

const Fullpage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const TestDraw = () => {
  const [drawing, setDrawing] = useState(false);
  const [paths, setPaths] = useState<any>([]);
  const [path, setPath] = useState<any>('');
  const pathRef: any = useRef(null);

  const handleMouseDown = (e: any) => {
    setDrawing(true);
    setPath(`M${e.clientX} ${e.clientY}`);
  };

  const handleMouseUp = () => {
    setDrawing(false);
    setPaths((prevPaths: any) => [...prevPaths, path]);
  };

  const handleMouseMove = (e: any) => {
    if (drawing) {
      setPath((prevPath: any) => `${prevPath} L${e.clientX} ${e.clientY}`);
    }
  };

  return (
    <Fullpage 
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <svg ref={pathRef} width="100%" height="100%">
        {paths.map((singlePath: any, i: number) => <path key={`path-${i}`} d={singlePath} stroke="black" fill="none"/>)}
        {drawing && <path d={path} stroke="black" fill="none"/>}
      </svg>
    </Fullpage>
  );
};

export default TestDraw;
