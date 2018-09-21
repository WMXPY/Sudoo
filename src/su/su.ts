/**
 * @author WMXPY
 * @namespace Su
 * @fileoverview Index
 */

require('../binding');
import { Agent } from "#/common/agent";
import { IAgent, IInput } from "#/common/agent/interface";
import { Canvas } from "#/common/canvas";
import { ICanvas } from "#/common/canvas/interface";

const canvas: ICanvas = new Canvas();
const agent: IAgent = new Agent();
agent.listen((key: IInput) => {
    canvas.draw(key.toString());
});
