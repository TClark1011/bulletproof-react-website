import { isFunction } from 'lodash';
import give from './give';

const coerceIntoGetter = <T, Params extends any[] = []>(
  value: ((...p: Params) => T) | T
) => (isFunction(value) ? value : give(value));

export default coerceIntoGetter;
