import type { GetStaticProps, NextPage } from 'next';
import { MarkdownParser } from '../features/markdownParsing';
import PageLayout from '../components/PageLayout';
import PageContext from '../context/PageContext';
import MarkdownPageProps from '../types/MarkdownPageProps';
import {
  fetchReadme,
  fetchSubPages,
  fetchMarkdownPageProps,
} from '../utils/githubFetchers';

const Home: NextPage<MarkdownPageProps> = (props) => {
  return (
    <PageContext.Provider value={props}>
      <PageLayout>
        <MarkdownParser />
      </PageLayout>
    </PageContext.Provider>
  );
};

export const getStaticProps: GetStaticProps<MarkdownPageProps> = () =>
  fetchMarkdownPageProps(fetchReadme);

export default Home;
