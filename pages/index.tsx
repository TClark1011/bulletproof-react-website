import type { GetStaticProps, NextPage } from 'next';
import { prop } from 'rambda';
import REPO_DETAILS from '../config/repoDetails';
import github from '../lib/github';
import pipeAsync from '../lib/pipeAsync';
import give from '../utils/give';

export type HomeProps = {
  commits: any[];
};

const Home: NextPage<HomeProps> = ({ commits }) => {
  return <div>{JSON.stringify(commits, null, 2)}</div>;
};

export const getStaticProps: GetStaticProps<HomeProps> = pipeAsync(
  give(github.repos.listCommits(REPO_DETAILS)),
  prop('data'),
  (commits) => ({
    props: {
      commits,
    },
  })
);

export default Home;
