import { Dark } from "./themes";

const position = {x: 0, y: 0};
const nodeType = 'flowNode';
const edgeType = 'flowEdge';



export const pythonCode = `\`\`\`python
def hello():
  print("Hello World!!!")

hello()
\`\`\``;

export const javascriptCode = `\`\`\`javascript
const hello = () => {
  console.log("Hello World");
}

hello()
\`\`\``;


export const hierarchialNodeType = 'FlowNode';
export const hierarchialEdgeType = 'FlowEdge';
export const hierarchialSourceHandle = 'bottom';
export const hierarchialTargetHandle = 'top';
export const showHierarchicalEdgeLabels = true;
export const HierarchicalNodes: any = [
  {
    type: hierarchialNodeType,
    id: "node-0",
    position: { x: 400, y: 0 },
    data: {
      label: "node-0",
      code: pythonCode,
    },
    theme: Dark,
  },
  {
    type: hierarchialNodeType,
    id: "node-1",
    position: { x: 200, y: 200 },
    data: {
      label: "node-1",
      code: pythonCode,
    },
    theme: Dark,
  },
  // {
  //   type: hierarchialNodeType,
  //   id: "node-2",
  //   position: { x: 600, y: 250 },
  //   data: {
  //     label: "node-2",
  //     code: javascriptCode,
  //   },
  //   theme: Dark,
  // },
  {
    type: hierarchialNodeType,
    id: "node-3",
    position: { x: 200, y: 400 },
    data: {
      label: "node-3",
      code: javascriptCode,
    },
    theme: Dark,
  },
  // {
  //   type: hierarchialNodeType,
  //   id: "node-4",
  //   position: { x: 600, y: 400 },
  //   data: {
  //     label: "node-4",
  //     code: javascriptCode,
  //   },
  //   theme: Dark,
  // },
  {
    type: 'Terminal',
    id: "Terminal",
    position: { x: 500, y: 300 },
    data: {
      label: "Terminal",
      parseFromMarkdown: true,
    },
    theme: Dark,
  },
];

export const HierarchicalEdges: any = [
  {
    id: "e-0[0][1]",
    source: "node-0",
    target: "node-1",
    type: hierarchialEdgeType,
    animated: true,
    label: showHierarchicalEdgeLabels ? "e0" : "",
    // sourceHandle: hierarchialSourceHandle,
    // targetHandle: hierarchialTargetHandle,
  },
  // {
  //   id: "e-1[0][2]",
  //   source: "node-0",
  //   target: "node-2",
  //   type: hierarchialEdgeType,
  //   animated: true,
  //   label: showHierarchicalEdgeLabels ? "e1" : "",
  //   sourceHandle: hierarchialSourceHandle,
  //   targetHandle: hierarchialTargetHandle,
  // },
  {
    id: "e-2[1][3]",
    source: "node-1",
    target: "node-3",
    type: hierarchialEdgeType,
    animated: true,
    label: showHierarchicalEdgeLabels ? "e2" : "",
    // sourceHandle: hierarchialSourceHandle,
    // targetHandle: hierarchialTargetHandle,
  },
  // {
  //   id: "e-3[1][4]",
  //   source: "node-1",
  //   target: "node-4",
  //   type: hierarchialEdgeType,
  //   animated: true,
  //   label: showHierarchicalEdgeLabels ? "e3" : "",
  //   sourceHandle: hierarchialSourceHandle,
  //   targetHandle: hierarchialTargetHandle,
  // },
  {
    id: "e-3[3][T]",
    source: "node-3",
    target: "Terminal",
    type: "Terminal",
    animated: true,
    label: showHierarchicalEdgeLabels ? "e3" : "",
    // sourceHandle: 'right',
    // targetHandle: 'left',
  },
];

export const ExampleNodes: any = [
  {
    id: '1',
    type: nodeType,
    data: { label: 'input' },
    position,
  },
  {
    id: '2',
    type: nodeType,
    data: { label: 'node 2' },
    position,
  },
  {
    id: '2a',
    type: nodeType,
    data: { label: 'node 2a' },
    position,
  },
  {
    id: '2b',
    type: nodeType,
    data: { label: 'node 2b' },
    position,
  },
  {
    id: '2c',
    type: nodeType,
    data: { label: 'node 2c' },
    position,
  },
  {
    id: '2d',
    type: nodeType,
    data: { label: 'node 2d' },
    position,
  },
  {
    id: '3',
    type: nodeType,
    data: { label: 'node 3' },
    position,
  },
  {
    id: '4',
    type: nodeType,
    data: { label: 'node 4' },
    position,
  },
  {
    id: '5',
    type: nodeType,
    data: { label: 'node 5' },
    position,
  },
  {
    id: '6',
    type: nodeType,
    data: { label: 'output' },
    position,
  },
  { 
    id: '7', 
    type: nodeType, 
    data: { label: 'output' }, 
    position 
  },
];

export const ExampleEdges: any = [
  { id: 'e12',   source: '1',  target: '2',  type: edgeType },
  { id: 'e13',   source: '1',  target: '3',  type: edgeType },
  { id: 'e22a',  source: '2',  target: '2a', type: edgeType },
  { id: 'e22b',  source: '2',  target: '2b', type: edgeType },
  { id: 'e22c',  source: '2',  target: '2c', type: edgeType },
  { id: 'e2c2d', source: '2c', target: '2d', type: edgeType },
  { id: 'e45',   source: '4',  target: '5',  type: edgeType },
  { id: 'e56',   source: '5',  target: '6',  type: edgeType },
  { id: 'e57',   source: '5',  target: '7',  type: edgeType },
];


