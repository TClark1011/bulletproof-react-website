import type { GetStaticProps, NextPage } from 'next';
import { objOf } from 'rambda';
import MarkdownParser from '../components/MarkdownParser';
import PageLayout from '../components/PageLayout';
import { asyncMap, asyncPipe } from '../lib/asyncFp';
import composePropsGetterResult from '../utils/composePropsGetterResult';
import {
  fetchDocFolderItems,
  fetchFile,
  fetchReadme,
} from '../utils/githubFetchers';

export type HomeProps = {
  data?: any;
};

const Home: NextPage<HomeProps> = ({ data = 'default' }) => {
  console.log(data);
  return (
    <PageLayout>
      <MarkdownParser text={data} />
    </PageLayout>
  );
};

export const getStaticProps: GetStaticProps<HomeProps> = asyncPipe(
  fetchReadme,
  objOf('data'),
  composePropsGetterResult
);

export default Home;
