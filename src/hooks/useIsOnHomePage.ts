import { equals, pipe } from 'rambda';
import { TITLE } from '../config';
import usePageTitle from './usePageTitle';

const useIsOnHomepage = pipe(usePageTitle, equals(TITLE));

export default useIsOnHomepage;
