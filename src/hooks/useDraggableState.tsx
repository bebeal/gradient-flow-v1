import { useCallback, useMemo, useState } from "react";

const useDraggableState = (reactFlow: any, flowRef?: any, defaultNodeSize: any = {width: 100, height: 60}) => {

  const [droppable, setDroppable] = useState(true);
  const [id, setId] = useState(0);

  const getId = useCallback((type: any = 'dropped-node') => {
    setId(id + 1);
    return `${type}-${id}`;
  }, [id]);
  
  const onDragOver = useCallback((event: any) => {
    if (!droppable || !flowRef.current) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, [droppable, flowRef]);

  const onDrop = useCallback((event: any) => {
    if (!droppable || !flowRef.current) return;
      event.preventDefault();
      const reactFlowBounds = flowRef.current?.getBoundingClientRect();
      const type: any = event.dataTransfer.getData("application/reactflow");
      if (typeof type === "undefined" || !type) {
        return;
      }

      const positionData = {
        x: event.clientX - reactFlowBounds.left - (defaultNodeSize?.width || 0) / 2,
        y: event.clientY - reactFlowBounds.top - (defaultNodeSize?.height || 0) / 2,
      };
      const position = reactFlow.project(positionData);
      let newNode = {
        id: getId(),
        type,
        position,
        data: {
          label: type
        },
      };

      reactFlow.addNodes([newNode]);
      
    }, [defaultNodeSize?.height, defaultNodeSize?.width, droppable, flowRef, getId, reactFlow] );

  return useMemo(() => {
    return {
    droppable,
    setDroppable,
    onDragOver,
    onDrop,
  }
}, [
  droppable,
  setDroppable,
  onDragOver,
  onDrop,
]);
};

export default useDraggableState;
