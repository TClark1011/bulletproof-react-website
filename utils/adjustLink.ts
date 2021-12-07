import { pipe, replace } from 'rambda';

const adjustLink = pipe(replace('docs/', ''), replace('.md', ''));

export default adjustLink;
