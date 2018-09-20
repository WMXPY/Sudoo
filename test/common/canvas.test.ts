/**
 * @author WMXPY
 * @namespace Test_Common_Canvas
 * @fileoverview Class
 */

import { Canvas } from '#/common/canvas';
import { ICanvas } from '#/common/canvas/interface';
import { expect } from 'chai';
import { IMockConsoleResult, mockConsole } from '../mock/node/console';

describe('Given Canvas common class', function (this: Mocha.Suite): void {
    let canvas: ICanvas;

    before(() => {
        canvas = new Canvas();
    });

    it('should draw logs to terminal', () => {
        const restoreConsole = mockConsole();

        canvas.draw('test');

        const result: IMockConsoleResult = restoreConsole();
        expect(result.log).to.be.lengthOf(1);
    });
});
