import {
  allPass,
  complement,
  identity,
  ifElse,
  includes,
  pipe,
  replace,
} from 'rambda';
import removeFromString from './removeFromString';
import trimFileExtension from './trimFileExtension';
import urlIsAbsolute from './urlIsAbsolute';

const adjustLink = ifElse(
  allPass([complement(urlIsAbsolute), includes('docs')]),
  pipe(removeFromString('docs'), trimFileExtension),
  identity
);

export default adjustLink;
