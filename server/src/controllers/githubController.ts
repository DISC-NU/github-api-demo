import { Request, Response } from "express";
import axios from "axios";

interface GitHubUser {
  login: string;
  public_repos: number;
  followers: number;
  following: number;
}

interface GitHubRepo {
  stargazers_count: number;
  forks_count: number;
  language: string;
}

export const getGithubStats = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const githubToken = process.env.GITHUB_TOKEN;

    const headers = {
      Authorization: `Bearer ${githubToken}`,
    };

    const userResponse = await axios.get<GitHubUser>(
      `https://api.github.com/users/${username}`,
      { headers }
    );

    const reposResponse = await axios.get<GitHubRepo[]>(
      `
            https://api.github.com/users/${username}/repos`,
      { headers }
    );

    const totalStars = reposResponse.data.reduce(
      (sum, repo) => sum + repo.stargazers_count,
      0
    );

    const totalForks = reposResponse.data.reduce(
      (sum, repo) => sum + repo.forks_count,
      0
    );

    const languages = reposResponse.data
      .map((repo) => repo.language)
      .filter((lang): lang is string => !!lang);

    const topLanguages = [...new Set(languages)].slice(0, 3).filter(Boolean);

    const stats = {
      username: userResponse.data.login,
      repositories: userResponse.data.public_repos,
      stars: totalStars,
      forks: totalForks,
      followers: userResponse.data.followers,
      following: userResponse.data.following,
      topLanguages,
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: `Error with fetching Github Data` });
  }
};
