/**
 * @author WMXPY
 * @namespace Declare
 * @fileoverview Snapshot
 */

export enum SNAPSHOT_MODE {
    ARGUMENT = 'ARG',
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
    };
    input: string;
    mode: SNAPSHOT_MODE;
}
