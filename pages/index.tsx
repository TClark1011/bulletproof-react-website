import type { GetStaticProps, NextPage } from 'next';
import { objOf } from 'rambda';
import { asyncMap, asyncPipe } from '../lib/asyncFp';
import composePropsGetterResult from '../utils/composePropsGetterResult';
import { fetchDocFolderItems, fetchFile } from '../utils/githubFetchers';

export type HomeProps = {
  data?: any;
};

const Home: NextPage<HomeProps> = ({ data = 'default' }) => {
  console.log(data);
  return <div>{JSON.stringify(data, null, 2)}</div>;
};

export const getStaticProps: GetStaticProps<HomeProps> = asyncPipe(
  fetchDocFolderItems,
  asyncMap(fetchFile),
  objOf('data'),
  composePropsGetterResult
);

export default Home;
