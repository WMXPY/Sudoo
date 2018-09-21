/**
 * @author WMXPY
 * @namespace Doo
 * @fileoverview Index
 */

require('../binding');
import { Agent } from "#/common/agent";
import { IAgent, IInput } from "#/common/agent/interface";
import { Canvas } from "#/common/canvas";
import { ICanvas } from "#/common/canvas/interface";

const canvas: ICanvas = Canvas.instance;
const agent: IAgent = Agent.instance;
agent.listen((key: IInput) => {
    canvas.draw(key.toString());
});
