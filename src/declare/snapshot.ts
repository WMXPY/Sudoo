/**
 * @author WMXPY
 * @namespace Declare
 * @fileoverview Snapshot
 */

import { IArgumentIntelligenceResult, IArgumentPattern } from "#declare/service";

export enum SNAPSHOT_MODE {
    ARGUMENT = 'ARGUM',
    EMPTY = 'EMPTY',
    ERROR = 'ERROR',
    GUESS = 'GUESS',
    MATCHED = 'MATCH',
}

export interface ISnapshotInfoArg {
    name: string;
    valid: boolean;
}

export interface ISnapshotInfo {
    args: ISnapshotInfoArg[];
    autocomplete?: {
        value: string;
        matched: boolean;
        distance?: number;
    };
    command?: string;
    intelligence?: IArgumentIntelligenceResult;
    input: string;
    mode: SNAPSHOT_MODE;
    pattern?: IArgumentPattern[];
}
