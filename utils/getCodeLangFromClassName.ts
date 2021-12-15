import {
  add,
  defaultTo,
  head,
  last,
  multiply,
  pipe,
  split,
  tail,
  match,
  ifElse,
  identity,
  equals,
} from 'rambda';
import give from './give';

const codeClassNameLangRegex = /(?:lang-)([a-z]+)/g;

const getCodeLangFromClassName = pipe(
  match(codeClassNameLangRegex) as any,
  head,
  defaultTo(''),
  split('-'),
  last,
  ifElse(equals('sh'), give(undefined), identity)
) as (p: string) => string | undefined;
export default getCodeLangFromClassName;
