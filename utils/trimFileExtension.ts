import { head, pipe, split } from 'rambda';

const trimFileExtension: (p: string) => string = pipe<string, string[], string>(
  split('.'),
  head
);

export default trimFileExtension;
