/**
 * @author WMXPY
 * @namespace Script
 * @fileoverview Snapshot
 */

import { ISnapshotInfo, SNAPSHOT_MODE } from '#declare/snapshot';
import { spaces } from '#util/string/string';
import * as Colors from 'colors/safe';

const snapshot_head_mark = (info: ISnapshotInfo): string => {
    switch (info.mode) {
        case SNAPSHOT_MODE.ARGUMENT:
            return Colors.white(Colors.bgCyan(info.mode))
                + Colors.bgMagenta('+' + info.args.length);
        case SNAPSHOT_MODE.EMPTY:
        case SNAPSHOT_MODE.GUESS:
            return Colors.white(Colors.bgYellow(info.mode));
        case SNAPSHOT_MODE.MATCHED:
            return Colors.white(Colors.bgGreen(info.mode));
        case SNAPSHOT_MODE.ERROR:
        default:
            return Colors.white(Colors.bgRed(info.mode));
    }
};

const snapshot_head_intelligence = (str: string, done: boolean): string => {
    if (done) return Colors.white(Colors.green(str));
    else return Colors.white(Colors.red(str));
};

const snapshot_head = (info: ISnapshotInfo): string => {
    return snapshot_head_mark(info);
};

const snapshot_body = (info: ISnapshotInfo): string => {
    return '>' + spaces(1) + info.input;
};

export const print_snapshot = (info: ISnapshotInfo): string => {
    return snapshot_head(info)
        + '\n'
        + snapshot_body(info);
};
