/**
 * @author WMXPY
 * @namespace Script
 * @fileoverview Snapshot
 */

import { spaces } from '#util/string/string';
import * as Colors from 'colors/safe';

const snapshot_head_mark = (symbol: string): string => {
    return Colors.white(Colors.bgCyan(symbol));
};

const snapshot_head = (): string => {
    return snapshot_head_mark('?');
};

const snapshot_body = (str: string): string => {
    return '>' + spaces(1) + str;
};

export const print_snapshot = (str?: string): string => {
    return snapshot_head() + '\n' + snapshot_body(str || '');
};
