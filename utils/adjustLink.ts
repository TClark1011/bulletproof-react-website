import { complement, pipe, when } from 'rambda';
import removeFromString from './removeFromString';
import trimFileExtension from './trimFileExtension';
import urlIsAbsolute from './urlIsAbsolute';

const adjustLink = when(
  complement(urlIsAbsolute),
  pipe(removeFromString('docs/'), trimFileExtension)
);

export default adjustLink;
