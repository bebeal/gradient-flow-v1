import { useStore } from "reactflow";

export const getNodeCenter = (node: any): any => {
  return {
    x: node.x + node.width / 2,
    y: node.y + node.height / 2,
  };
};