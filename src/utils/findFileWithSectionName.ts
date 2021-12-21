import { FileContents } from '../types';
import { equals, pipe, prop } from 'rambda';
import trimFileExtension from './trimFileExtension';

const findFileWithSectionName =
  (sectionName: string) => (files: FileContents[]) =>
    files.find(pipe(prop('name'), trimFileExtension, equals(sectionName)));

export default findFileWithSectionName;
