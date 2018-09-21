/**
 * @author WMXPY
 * @namespace Su
 * @fileoverview Index
 */

require('../../binding');
import { Agent } from "#/common/agent";
import { Canvas } from "#/common/canvas";
import { IAgent, IInput } from "#/declare/agent";
import { ICanvas } from "#/declare/canvas";

const canvas: ICanvas = Canvas.instance;
const agent: IAgent = Agent.instance;
agent.listen((key: IInput) => {
    canvas.draw(key.toString());
});
