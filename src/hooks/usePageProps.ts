import { pipe } from 'rambda';
import { useContext } from 'react';
import {PageContext} from '@/context';
import {give} from '@/utils';

const usePageProps = pipe(give(PageContext), useContext);

export default usePageProps;
