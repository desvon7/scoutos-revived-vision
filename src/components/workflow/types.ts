
import { NodeType } from './Node';

export interface NodeObject {
  id: string;
  title: string;
  type: NodeType;
  x: number;
  y: number;
}

export interface ConnectionObject {
  id: string;
  from: string;
  to: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}
