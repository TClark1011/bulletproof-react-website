import { test } from 'rambda';

const urlIsAbsolute = test(/http(s){0,1}\:\/\//);

export default urlIsAbsolute;
