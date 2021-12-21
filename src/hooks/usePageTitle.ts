import { startCase } from 'lodash';
import { useRouter } from 'next/router';
import { pipe, prop } from 'rambda';
import { TITLE } from '../config/constants';
import fallback from '../utils/fallback';
import removeFromString from '../utils/removeFromString';

const usePageTitle = pipe(
  useRouter,
  prop('asPath'),
  removeFromString('/'),
  fallback(TITLE),
  startCase
);

export default usePageTitle;
