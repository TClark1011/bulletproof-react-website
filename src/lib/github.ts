import { Octokit } from '@octokit/rest';
import { GITHUB_TOKEN } from '../config';

const github = new Octokit({
  auth: GITHUB_TOKEN,
});

export type BaseRepoParameters = {
  owner: string; //Username of the owner of the repository
  repo: string; //The name of the repository
};

export default github;
