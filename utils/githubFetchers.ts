import { prop } from 'rambda';
import REPO_DETAILS, { README_DOWNLOAD } from '../config/repoDetails';
import { asyncPipe } from '../lib/asyncFp';
import github from '../lib/github';
import { FileContents } from '../types/githubTypes';
import give from './give';
import { getResponseText } from './responseHelpers';

export const fetchDocFolderItems = asyncPipe(
  give(github.repos.getContent({ ...REPO_DETAILS, path: '/docs' })),
  prop('data')
) as () => Promise<FileContents[]>;

export const fetchFile: (p: { download_url: string }) => Promise<string> =
  asyncPipe(prop('download_url'), fetch, getResponseText);

export const fetchReadme = asyncPipe(
  give(README_DOWNLOAD),
  fetch,
  getResponseText
);
