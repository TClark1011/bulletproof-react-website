import {
  allPass,
  complement,
  identity,
  ifElse,
  includes,
  pipe,
} from 'rambda';
import {removeFromString, trimFileExtension, urlIsAbsolute} from '@/utils';

const adjustLink = ifElse(
  allPass([complement(urlIsAbsolute), includes('docs')]),
  pipe(removeFromString('docs'), trimFileExtension),
  identity
);

export default adjustLink;
