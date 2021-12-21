import { useBreakpoint } from '@chakra-ui/media-query';
import { flip, includes, pipe } from 'rambda';
import {Function} from '@/types';
import {fallback} from '@/utils';

const useClientIsMobile = pipe(
  useBreakpoint,
  fallback('sm'),
  flip(includes)(['xs', 'sm', 'base']) as any as Function<[string], boolean>
);

export default useClientIsMobile;
