import type { GetStaticProps, NextPage } from 'next';
import { MarkdownParser } from '@/features/markdownParsing';
import { PageLayout } from '@/components';
import { PageContext } from '@/context';
import { MarkdownPageProps } from '@/types';
import { fetchReadme, fetchMarkdownPageProps } from '@/api';

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
