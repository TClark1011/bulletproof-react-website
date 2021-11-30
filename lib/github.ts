import { Octokit } from '@octokit/rest';

const github = new Octokit();

export type BaseRepoParameters = {
  owner: string; //Username of the owner of the repository
  repo: string; //The name of the repository
};

export default github;
