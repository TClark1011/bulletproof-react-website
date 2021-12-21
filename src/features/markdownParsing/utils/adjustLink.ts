import {
  allPass,
  complement,
  identity,
  ifElse,
  includes,
  pipe,
  replace,
} from 'rambda';
import removeFromString from '../../../utils/removeFromString';
import trimFileExtension from '../../../utils/trimFileExtension';
import urlIsAbsolute from '../../../utils/urlIsAbsolute';

const adjustLink = ifElse(
  allPass([complement(urlIsAbsolute), includes('docs')]),
  pipe(removeFromString('docs'), trimFileExtension),
  identity
);

export default adjustLink;
