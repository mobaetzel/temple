export const skills = {
  programming: [
    {
      title: 'Python',
      level: 3,
    },
    {
      title: 'JavaScript',
      level: 3,
    },
    {
      title: 'TypeScript',
      level: 3,
    },
    {
      title: 'Go',
      level: 2,
    },
    {
      title: 'Java',
      level: 2,
    },
    {
      title: 'C#',
      level: 1,
    },
    {
      title: 'Dart',
      level: 2,
    },
  ].sort(sortByTitle),
  frameworks: [
    {
      title: 'Django',
      level: 3,
    },
    {
      title: 'React',
      level: 3,
    },
    {
      title: 'Next.js',
      level: 1,
    },
    {
      title: 'Nuxt.js',
      level: 2,
    },
    {
      title: 'Flutter',
      level: 2,
    },
    {
      title: 'Tensorflow',
      level: 1,
    },
    {
      title: 'Vue.js',
      level: 2,
    },
  ].sort(sortByTitle),
  tech: [
    {
      title: 'Docker',
      level: 2,
    },
    {
      title: 'Kubernetes',
      level: 1,
    },
    {
      title: 'Linux',
      level: 2,
    },
    {
      title: 'Windows',
      level: 2,
    },
    {
      title: 'Android',
      level: 2,
    },
    {
      title: 'GitLab',
      level: 2,
    },
    {
      title: 'Sentry',
      level: 1,
    },
    {
      title: 'macOS',
      level: 1,
    },
    {
      title: 'MySQL',
      level: 2,
    },
    {
      title: 'PostgreSQL',
      level: 1,
    },
    {
      title: 'Redis',
      level: 1,
    },
    {
      title: 'Google Cloud Platform',
      hint: 'GCS, GKE, GCR, Cloud SQL',
      level: 1,
    },
    {
      title: 'Google Play',
      level: 1,
    },
    {
      title: 'Amazon Web Services',
      hint: 'EC2, S3, SES',
      level: 1,
    },
    {
      title: 'Google Firebase',
      level: 1,
    },
    {
      title: 'Dockerhub',
      level: 1,
    },
  ].sort(sortByTitle),
  social: [
    {
      title: 'SCRUM',
      level: 1,
    },
    {
      title: 'DevOps',
      level: 2,
    },
    {
      title: 'Trello',
      level: 2,
    },
    {
      title: 'Zoho',
      level: 2,
    },
  ].sort(sortByTitle),
  languages: [
    {
      title: 'Deutsch',
      level: -3,
    },
    {
      title: 'English',
      level: -2,
    }
  ].sort(sortByTitle),
};

function sortByTitle(a, b) {
  if (a.title < b.title) {
    return -1;
  }
  if (a.title > b.title) {
    return 1;
  }
  return 0;
}
