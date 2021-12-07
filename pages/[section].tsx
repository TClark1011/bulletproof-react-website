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
import composePropsGetterResult from '../utils/composePropsGetterResult';
import Markdown from 'markdown-to-jsx';
import PageLayout from '../components/PageLayout';
import * as MD from '../components/markdownOverrides';
import { Code, Heading, Link } from '@chakra-ui/layout';
import Head from 'next/head';
import { startCase } from 'lodash';

type SectionPageProps = {
  text: string;
  title: string;
};

export type SectionPagePathParams = { section: string };

const SectionPage: NextPage<SectionPageProps> = ({ text, title }) => (
  <>
    <Head>
      <title>{startCase(title)}</title>
    </Head>
    <PageLayout>
      <Markdown
        className="md"
        options={{
          overrides: {
            code: Code,
            p: MD.Paragraph,
            pre: MD.PreFormatted,
            h1: MD.H1,
            h2: MD.H2,
            h3: MD.H2,
            h4: MD.H2,
            a: MD.A,
          },
        }}
      >
        {text}
      </Markdown>
    </PageLayout>
  </>
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
  (await asyncPipe(
    fetchDocFolderItems,
    findFileWithSectionName(params?.section || '____ERROR____'),
    fetchFile,
    (fileContents) => ({
      props: {
        text: fileContents,
        title: params?.section || '____ERROR____',
      },
    })
  )()) as any;
