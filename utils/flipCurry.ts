import { curry, flip, pipe } from 'rambda';

const flipCurry = pipe(curry, flip);

export default flipCurry;
