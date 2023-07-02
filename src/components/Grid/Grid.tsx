// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { WidthProvider, Responsive } from 'react-grid-layout';
import styled from 'styled-components';
import { Resizable } from 'react-resizable';
// import React, { useState, useCallback, useEffect } from "react";
// import styled from "styled-components";

const randomLightColor = () => {
  const colors = [
    'lightblue',
    'lightcoral',
    'lightcyan',
    'lightgoldenrodyellow',
    'lightgreen',
    'lightyellow',
    'lightpink',
    'lightsalmon',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};
const getCSSSizes = (sizes) => {
  return sizes.map((size) => `${size}fr`).join(' ');
};

const GridContainer = styled.div<any>`
  position: relative;
  display: grid;
  width: 100%;
  height: 100%;
  gap: ${(props) => props.gap}px;
  grid-template-columns: ${({ columns }) => getCSSSizes(columns)};
  grid-template-rows: ${({ rows }) => getCSSSizes(rows)};
`;

const GridItem = styled.div<any>`
  position: relative;
  width: 100%;
  height: 100%;
  background: ${(props) => props.color || 'white'};
  overflow: hidden;
  border: 1px solid #000;
  min-width: ${({ minHeight }) => minHeight}px;
  min-height: ${({ minWidth }) => minWidth}px;
`;

const Resizer = styled.div<any>`
  position: absolute;
  width: ${({ isVertical, gap }) => isVertical ? `${gap}px` : '100%'};
  height: ${({ isVertical, gap }) => isVertical ? '100%' : `${gap}px`};
  background: #aaa;
  cursor: ${({ isVertical }) => isVertical ? 'col-resize' : 'row-resize'};
  left: ${({ left }) => left ? `${left}` : '0'};
  top: ${({ top }) => top ? `${top}` : '0'};
`;

const CornerResizer = styled.div<any>`
  position: absolute;
  width: ${({ gap }) => `${gap}px`};
  height: ${({ gap }) => `${gap}px`};
  background: red;
  cursor: all-scroll;
  left: ${({ left }) => left ? `${left}` : '0'};
  top: ${({ top }) => top ? `${top}` : '0'};
`;

const Grid = () => {
  const minHeight = 50;
  const minWidth = 50;
  const numRows = 3;
  const numColumns = 3;
  const gap = 5;
  const gridRef = React.useRef(null);
  const [totalSize, setTotalSize] = useState({ width: 0, height: 0 });
  const [rows, setRows] = useState(new Array(numRows).fill(1));
  const [cols, setCols] = useState(new Array(numColumns).fill(1));
  const [colors, setColors] = useState(
    Array(numRows * numColumns)
      .fill(null)
      .map((_) => randomLightColor())
  );

// Function to handle drag events
const handleDrag = (e, i, isVertical) => {
  e.preventDefault();
  const delta = isVertical ? e.movementX : e.movementY;
  
  // calculate total grid size (sum of all column or row sizes)
  const totalGridSize = isVertical ? cols.reduce((a, b) => a + b, 0) : rows.reduce((a, b) => a + b, 0);

  // calculate the ratio
  const fraction = delta / (isVertical ? totalSize.width : totalSize.height) * totalGridSize;

  // For vertical resizer, adjust column sizes
  if (isVertical) {
    setCols((cols) => {
      const newCols = [...cols];
      newCols[i] += fraction;
      newCols[i + 1] -= fraction;
      
      // Convert fractions to pixel sizes for comparison
      const newSize1 = (newCols[i] / totalGridSize) * totalSize.width;
      const newSize2 = (newCols[i + 1] / totalGridSize) * totalSize.width;

      // Check if either of the columns falls below the minimum width
      if (newSize1 < minWidth || newSize2 < minWidth) return cols;

      return newCols;
    });
  } else {
    // For horizontal resizer, adjust row sizes
    setRows((rows) => {
      const newRows = [...rows];
      newRows[i] += fraction;
      newRows[i + 1] -= fraction;

      // Convert fractions to pixel sizes for comparison
      const newSize1 = (newRows[i] / totalGridSize) * totalSize.height;
      const newSize2 = (newRows[i + 1] / totalGridSize) * totalSize.height;

      // Check if either of the rows falls below the minimum height
      if (newSize1 < minHeight || newSize2 < minHeight) return rows;

      return newRows;
    });
  }
};

  const getResizers = () => {
    const resizers = [];
    
  // Vertical resizers
  let cumulativeSize = 0;
  for (let i = 0; i < cols.length - 1; i++) {
    cumulativeSize += cols[i] / (cols.reduce((a, b) => a + b, 0)) * (totalSize.width - gap * (cols.length - 1)) + gap * i;
    resizers.push(
      <Resizer
        key={`resizer-col-${i}`}
        isVertical={true}
        gap={gap}
        left={`${cumulativeSize / totalSize.width * 100}%`}
        onMouseDown={(e) => {
          e.preventDefault();
          const handleMouseUp = () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
          };
          const handleMouseMove = (e) => {
            handleDrag(e, i, true);
          };
          window.addEventListener('mousemove', handleMouseMove);
          window.addEventListener('mouseup', handleMouseUp);
        }}
      />
    );
  }

  // Horizontal resizers
  cumulativeSize = 0;
  for (let i = 0; i < rows.length - 1; i++) {
    cumulativeSize += rows[i] / (rows.reduce((a, b) => a + b, 0)) * (totalSize.height - gap * (rows.length - 1)) + gap * i;
    resizers.push(
      <Resizer
        key={`resizer-row-${i}`}
        isVertical={false}
        gap={gap}
        top={`${cumulativeSize / totalSize.height * 100}%`}
        onMouseDown={(e) => {
          e.preventDefault();
          const handleMouseUp = () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
          };
          const handleMouseMove = (e) => {
            handleDrag(e, i, false);
          };
          window.addEventListener('mousemove', handleMouseMove);
          window.addEventListener('mouseup', handleMouseUp);
        }}
      />
    );
  }

// Corner resizers
    for (let i = 0; i < rows.length - 1; i++) {
      for (let j = 0; j < cols.length - 1; j++) {
        const cumulativeWidth = cols.slice(0, j + 1).reduce((a, b) => a + b, 0) / cols.reduce((a, b) => a + b, 0) * totalSize.width - gap / 2;
        const cumulativeHeight = rows.slice(0, i + 1).reduce((a, b) => a + b, 0) / rows.reduce((a, b) => a + b, 0) * totalSize.height - gap / 2;
        resizers.push(
          <CornerResizer
            key={`resizer-corner-${i}-${j}`}
            gap={gap}
            left={`${(cumulativeWidth - gap / 2) / totalSize.width * 100}%`}
            top={`${(cumulativeHeight - gap / 2) / totalSize.height * 100}%`}
            onMouseDown={(e) => {
              e.preventDefault();
              const handleMouseUp = () => {
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('mouseup', handleMouseUp);
              };
              const handleMouseMove = (e) => {
                handleDrag(e, j, true);
                handleDrag(e, i, false);
              };
              window.addEventListener('mousemove', handleMouseMove);
              window.addEventListener('mouseup', handleMouseUp);
            }}
          />
        );
      }
    }
  
    return resizers;
  };

  useEffect(() => {
    if (gridRef.current) {
      const { width, height } = gridRef.current.getBoundingClientRect();
      setTotalSize({ width, height });
    }
  }, [gridRef]);

  return (
    <GridContainer gap={gap} rows={rows} columns={cols} ref={gridRef}>
      {colors.map((color, i) => (
        <GridItem key={`grid-item-${i}`} color={color} minHeight={minHeight} minWidth={minWidth} />
      ))}
      {getResizers()}
    </GridContainer>
  );
};

export default Grid;


