import { replace } from 'rambda';

const backslashRegex = /\\/g;

const fixMarkdownLineBreaks = replace(backslashRegex, '\n');

export default fixMarkdownLineBreaks;
