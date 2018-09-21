/**
 * @author WMXPY
 * @namespace Service
 * @fileoverview Decorator
 */

// Decorator
export const command = (cmd: string) => {
    return <T extends { new(...args: any[]): {} }>(target: T) => {
        // tslint:disable-next-line
        return class extends target {
            public readonly command: string = cmd;
        };
    };
};
