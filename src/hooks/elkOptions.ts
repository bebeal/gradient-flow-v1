import { quadtree } from "d3-quadtree";

export const Algorithm = ["layered"];
export const Direction = ["UNDEFINED", "RIGHT", "UP", "LEFT", "DOWN"];
export const Alignment = ["AUTOMATIC","LEFT", "RIGHT", "TOP", "BOTTOM", "CENTER"];
export const CrossingMinimalization = ["LAYER_SWEEP", "INTERACTIVE", "NONE"];
export const CycleBreaking = ["GREEDY", "DEPTH_FIRST", "INTERACTIVE", "MODEL_ORDER", "GREEDY_MODEL_ORDER"];
export const EdgeRouting = ["UNDEFINED", "POLYLINE", "ORTHOGONAL", "SPLINES"];
export const NodePlacement = ["SIMPLE", "INTERACTIVE", "LINEAR_SEGMENTS", "BRANDES_KOEPF", "NETWORK_SIMPLEX"];
export const HierarchyHandling = ["INHERIT", "INCLUDE_CHILDREN", "SEPARATE_CHILDREN"];
export const NodeSize = [ "DEFAULT_MINIMUM_SIZE", "MINIMUM_SIZE_ACCOUNTS_FOR_PADDING", "COMPUTE_PADDING", "OUTSIDE_NODE_LABELS_OVERHANG", "PORTS_OVERHANG", "UNIFORM_PORT_SPACING", "SPACE_EFFICIENT_PORT_LABELS" ];
export const EdgeStraightening = ["NONE", "IMPROVE_STRAIGHTNESS"];
export const NodeNodeBetweenLayers = 100;
export const EdgeEdgeBetweenLayers = 50;
export interface Options {
  [key: string]: any;
};

const putSpaceBetweenCaps = (str: string): string => {
  return str.replace(/([A-Z])/g, ' $1').trim();
};

const relaxString = (str: string): string => {
  return str
    .replace(/_/g, ' ')                                            // Replaces underscores with spaces
    .toLowerCase()                                                 // Lowercases all letters
    .replace(/\b(\w)/g, (match, letter) => letter.toUpperCase());  // Capitalizes the first letter of each word
};

const constants: any = {
  Algorithm,
  Direction,
  Alignment,
  CrossingMinimalization,
  CycleBreaking,
  EdgeRouting,
  NodePlacement,
  HierarchyHandling,
  NodeSize,
  EdgeStraightening,
  NodeNodeBetweenLayers,
  EdgeEdgeBetweenLayers,
};

const constantNames = Object.keys({...constants});

export const GetAllOptions = (transformKeys: boolean = false, transformValue: boolean = false): Options => {
    return Object.fromEntries(
    constantNames.map((name: any) => [transformKeys ? putSpaceBetweenCaps(name) : name, transformValue && Array.isArray(constants[name]) ? constants[name].map((option: any) => relaxString(option)) : constants[name]])
  );
};

export const AllOptions = GetAllOptions(false, false);

export const collide = (nodes: any[] = []) => {
  let force: any = (alpha: any) => {
    const tree = quadtree(nodes, (d: any) => d?.x, (d) => d?.y);
    for (const node of nodes) {
      const r = node.width / 2;
      const nx1 = node.x - r;
      const nx2 = node.x + r;
      const ny1 = node.y - r;
      const ny2 = node.y + r;

      tree.visit((quad: any, x1: any, y1: any, x2: any, y2: any) => {
        if (!quad.length) {
          do {
            if (quad.data !== node) {
              const r = node.width / 2 + quad.data.width / 2;
              let x = node.x - quad.data.x;
              let y = node.y - quad.data.y;
              let l = Math.hypot(x, y);

              if (l < r) {
                l = ((l - r) / l) * alpha;
                node.x -= x *= l;
                node.y -= y *= l;
                quad.data.x += x;
                quad.data.y += y;
              }
            }
          } while ((quad = quad.next));
        }

        return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
      });
    }
  };

  return force;
};


