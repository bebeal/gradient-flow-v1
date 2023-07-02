import { useCallback, useState } from 'react';
import { Color } from '../components/ColorPicker';

const useStrokeState = (initialColor = '#ff0072', initialStrokeWidth = 1, initialStrokeStyle = 'solid') => {
  const [color, setColor] = useState(new Color(initialColor).toHexString());
  const [strokeWidth, setStrokeWidth] = useState<any>(initialStrokeWidth);
  const [strokeStyle, setStrokeStyle] = useState<any>(initialStrokeStyle);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleColorChange = (colorResult: any) => {
    setColor(colorResult.toHexString());
  };

  const toggleColorPicker = useCallback(() => {
    setDisplayColorPicker(!displayColorPicker);
  }, [displayColorPicker]);

  const closeColorPicker = useCallback(() => {
    setDisplayColorPicker(false);
  }, []);

  const handleStrokeChange = (strokeWidth: number, strokeStyle: string) => {
    setStrokeWidth(strokeWidth);
    setStrokeStyle(strokeStyle);
  };

  return { color, handleColorChange, displayColorPicker, toggleColorPicker, closeColorPicker, strokeWidth, setStrokeWidth, strokeStyle, setStrokeStyle, handleStrokeChange };
};

export default useStrokeState;