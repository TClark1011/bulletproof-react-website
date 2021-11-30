import { prop } from 'rambda';
import REPO_DETAILS from '../config/repoDetails';
import { asyncPipe } from '../lib/asyncFp';
import github from '../lib/github';
import give from './give';
import { getResponseText } from './responseHelpers';

export const fetchDocFolderItems = asyncPipe(
  give(github.repos.getContent({ ...REPO_DETAILS, path: '/docs' })),
  prop('data')
);

export const fetchFile: (p: { download_url: string }) => Promise<string> =
  asyncPipe(prop('download_url'), fetch, getResponseText);
