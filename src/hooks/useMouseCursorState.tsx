import { useEffect, useMemo, useState } from "react";

const useMouseCursorState = (interactiveState: any, freehandState: any) => {
  const [mouseCursor, setMouseCursor] = useState<string>('auto');

  useEffect(() => {
    const setMouseCursorFromInteractiveState = () => {
      if (!interactiveState.isInteractive) {
        setMouseCursor('auto');
      }
      if (interactiveState.panOnDrag) {
        setMouseCursor('grab');
      }
      if (freehandState.freehandMode) {
        setMouseCursor('crosshair');
      }
    };

    setMouseCursorFromInteractiveState();
  }, [interactiveState, freehandState]);

  return useMemo(() => {

  return {
    mouseCursor,
    setMouseCursor,
  };
}, [
  mouseCursor,
  setMouseCursor,
]);
};

export default useMouseCursorState;
