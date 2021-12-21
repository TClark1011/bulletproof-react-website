export { default as asyncPipe } from 'p-pipe';
import pMap from 'p-map';
import flipCurry from '../utils/flipCurry';
export const asyncMap = flipCurry(pMap);
