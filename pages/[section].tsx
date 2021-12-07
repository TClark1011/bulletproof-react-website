import {
  GetStaticPaths,
  GetStaticPathsResult,
  GetStaticProps,
  NextPage,
} from 'next';
import { Pipeline } from 'p-pipe';
import { map, objOf, pipe, prop } from 'rambda';
import { asyncPipe } from '../lib/asyncFp';
import coerceIntoArray from '../utils/coerceIntoArray';
import { fetchDocFolderItems, fetchFile } from '../utils/githubFetchers';
import trimFileExtension from '../utils/trimFileExtension';
import findFileWithSectionName from '../utils/findFileWithSectionName';
import { FileContents } from '../types/githubTypes';
import composePropsGetterResult from '../utils/composePropsGetterResult';

type SectionPageProps = {
  text: string;
};

export type SectionPagePathParams = { section: string };

const SectionPage: NextPage<SectionPageProps> = ({ text }) => <div>{text}</div>;

export default SectionPage;

export const getStaticPaths: GetStaticPaths<SectionPagePathParams> = asyncPipe(
  fetchDocFolderItems,
  coerceIntoArray,
  map(pipe(prop('name'), trimFileExtension, objOf('section'), objOf('params'))),
  (paths) =>
    ({
      paths,
      fallback: false,
    } as any)
) as Pipeline<any, GetStaticPathsResult<SectionPagePathParams>>;

export const getStaticProps: GetStaticProps<
  SectionPageProps,
  SectionPagePathParams
> = async ({ params }) =>
  (await asyncPipe(
    fetchDocFolderItems,
    findFileWithSectionName(params?.section || '____ERROR____'),
    fetchFile,
    objOf('text'),
    composePropsGetterResult
  )()) as any;
