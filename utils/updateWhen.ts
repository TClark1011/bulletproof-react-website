import { identity, ifElse } from 'rambda';
import coerceIntoGetter from './coerceIntoGetter';

const updateWhen = <T>(
  predicate: ((p: T) => boolean) | boolean,
  updater: (p: T) => T
) => ifElse<T, T>(coerceIntoGetter(predicate), updater, identity);

export default updateWhen;
