/**
 * @author WMXPY
 * @namespace Doo
 * @fileoverview Print
 */

import { spaces } from '#/util/string/string';
import * as Colors from 'colors/safe';

export const print_suggestion = (content: string, args?: number): string => {
    return spaces(1) + Colors.gray(content + (args ? ' +' + args : ''));
};

export const print_header = (content?: string, tail?: string) => {
    return '>' + (content ? spaces(1) + content : '') + (tail ? spaces(1) + tail : '');
};
