/**
 * @author WMXPY
 * @namespace Service
 * @fileoverview Interface
 */

export interface IService {
    execute: (args: string[]) => number;
}
