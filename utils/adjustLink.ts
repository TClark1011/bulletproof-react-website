import { identity, ifElse, pipe } from 'rambda';
import removeFromString from './removeFromString';
import trimFileExtension from './trimFileExtension';
import urlIsAbsolute from './urlIsAbsolute';

const adjustLink = ifElse(
  urlIsAbsolute,
  identity,
  pipe(removeFromString('docs'), trimFileExtension)
);

export default adjustLink;
