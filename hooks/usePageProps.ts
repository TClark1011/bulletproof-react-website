import { pipe } from 'rambda';
import { useContext } from 'react';
import PageContext from '../context/PageContext';
import give from '../utils/give';

const usePageProps = pipe(give(PageContext), useContext);

export default usePageProps;
