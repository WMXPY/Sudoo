/**
 * @author WMXPY
 * @namespace Su
 * @fileoverview Index
 */

require('../binding');
import { Canvas } from "#/common/canvas";
import { ICanvas } from "#/common/canvas/interface";

const canvas: ICanvas = new Canvas();
canvas.draw('test');
