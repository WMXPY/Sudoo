/**
 * @author WMXPY
 * @namespace Util_Match
 * @fileoverview Map snapshot with name
 */

import { IArgumentPattern, IService } from "#declare/service";

export const verifySnapshotArgsAndService = (args: string[], service: IService) => {

};

export const mapSnapshotArgsWithNameByService = (args: string[], service: IService): {
    [key: string]: any;
} => {
    const result: {
        [key: string]: any;
    } = {};
    const pattern: IArgumentPattern[] = service.pattern;

    pattern.forEach((arg: IArgumentPattern, index: number): void => {
        const current: string = args[index];
    });

    return result;
};
