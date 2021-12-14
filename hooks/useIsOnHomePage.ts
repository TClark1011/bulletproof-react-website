import { equals, pipe } from 'rambda';
import usePageTitle from './usePageTitle';

const useIsOnHomepage = pipe(usePageTitle, equals('home'));

export default useIsOnHomepage;
