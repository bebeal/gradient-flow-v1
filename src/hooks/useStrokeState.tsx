import { useCallback, useMemo, useState } from 'react';
import { Color } from '../components/ColorPicker';

const useStrokeState = (initialColor = '#ff0072', initialStrokeWidth = 1, initialStrokeStyle = 'solid') => {
  const [color, setColor] = useState(new Color(initialColor).toHexString());
  const [strokeWidth, setStrokeWidth] = useState<any>(initialStrokeWidth);
  const [strokeStyle, setStrokeStyle] = useState<any>(initialStrokeStyle);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleColorChange = useCallback((colorResult: any) => {
    setColor(colorResult.toHexString());
  }, []);

  const toggleColorPicker = useCallback(() => {
    setDisplayColorPicker(!displayColorPicker);
  }, [displayColorPicker]);

  const closeColorPicker = useCallback(() => {
    setDisplayColorPicker(false);
  }, []);

  const handleStrokeChange = useCallback((strokeWidth: number, strokeStyle: string) => {
    setStrokeWidth(strokeWidth);
    setStrokeStyle(strokeStyle);
  }, []);

  return useMemo(() => {
    return { 
    color, 
    handleColorChange, 
    displayColorPicker, 
    toggleColorPicker, 
    closeColorPicker, 
    strokeWidth, 
    setStrokeWidth, 
    strokeStyle, 
    setStrokeStyle, 
    handleStrokeChange 
  };
}, [closeColorPicker, color, displayColorPicker, handleColorChange, handleStrokeChange, strokeStyle, strokeWidth, toggleColorPicker]);
};

export default useStrokeState;