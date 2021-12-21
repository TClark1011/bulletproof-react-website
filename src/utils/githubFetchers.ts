import { map, prop } from 'rambda';
import {REPO_DETAILS, README_DOWNLOAD } from '@/config';
import { asyncPipe } from '@/lib/asyncFp';
import github from '@/lib/github';
import { FileContents, MarkdownPageProps } from '@/types';
import findFileWithSectionName from './findFileWithSectionName';
import give from './give';
import { getResponseText } from './responseHelpers';
import trimFileExtension from './trimFileExtension';

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

export const fetchSubPages = asyncPipe(
  fetchDocFolderItems,
  map(prop('name')),
  map(trimFileExtension)
);

export const fetchRepoUrl = asyncPipe(
  give(github.repos.get(REPO_DETAILS)),
  prop('data'),
  prop('html_url')
);

export const fetchSubPageTextContent = async (sectionName: string) =>
  asyncPipe(
    fetchDocFolderItems,
    findFileWithSectionName(sectionName),
    fetchFile
  )();

export const fetchMarkdownPageProps: (
  textFetcher: () => Promise<string>
) => Promise<{
  props: MarkdownPageProps;
}> = async (textFetcher) => ({
  props: {
    subPages: await fetchSubPages(),
    originalRepositoryUrl: await fetchRepoUrl(),
    text: await textFetcher(),
  },
});
