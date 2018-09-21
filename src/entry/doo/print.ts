/**
 * @author WMXPY
 * @namespace Doo
 * @fileoverview Print
 */

import { ICommand } from '#/declare/service';
import { spaces } from '#/util/string/string';
import * as Colors from 'colors/safe';

export const print_suggestion = (content: string, args?: number): string => {
    return spaces(1) + Colors.gray(content + (args ? ' +' + args : ''));
};

export const print_header = (content?: string, tail?: string) => {
    return '>' + spaces(1) + (content ? content : '') + (tail ? spaces(1) + tail : '');
};

export const print_takeingMore = (command: ICommand) => {
    return 'Command [' + command.command + '] is taking more arguments:';
};
