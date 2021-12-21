import { replace } from 'rambda';

const removeFromString = (target: string | RegExp) => replace(target, '');

export default removeFromString;
