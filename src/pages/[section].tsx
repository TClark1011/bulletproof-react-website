import {
  GetStaticPaths,
  GetStaticPathsResult,
  GetStaticProps,
  NextPage,
} from 'next';
import { Pipeline } from 'p-pipe';
import { map, objOf, pipe, prop } from 'rambda';
import { asyncPipe } from '../lib/asyncFp';
import { coerceIntoArray, trimFileExtension } from '@/utils';
import { PageLayout } from '../components';
import { MarkdownParser } from '../features/markdownParsing';
import Head from 'next/head';
import { startCase } from 'lodash';
import { MarkdownPageProps } from '../types';
import {
  fetchMarkdownPageProps,
  fetchSubPageTextContent,
  fetchDocFolderItems,
} from '../utils/githubFetchers';
import { PageContext } from '../context';

type SectionPageProps = MarkdownPageProps & {
  title: string;
};

export type SectionPagePathParams = { section: string };

const SectionPage: NextPage<SectionPageProps> = ({ title, ...props }) => (
  <PageContext.Provider value={props}>
    <Head>
      <title>{startCase(title)}</title>
    </Head>
    <PageLayout>
      <MarkdownParser />
    </PageLayout>
  </PageContext.Provider>
);

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
  (await fetchMarkdownPageProps(
    () => fetchSubPageTextContent(params?.section || 'ERROR') as any
  )) as any;
