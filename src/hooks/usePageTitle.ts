import { startCase } from 'lodash';
import { useRouter } from 'next/router';
import { pipe, prop } from 'rambda';
import { TITLE } from '../config';
import {fallback, removeFromString} from '../utils';

const usePageTitle = pipe(
  useRouter,
  prop('asPath'),
  removeFromString('/'),
  fallback(TITLE),
  startCase
);

export default usePageTitle;
