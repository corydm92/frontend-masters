// This file adds custom help message when commits fail

import { format } from '@commitlint/format';

const validTypes = [
	'feat',
	'fix',
	'docs',
	'style',
	'refactor',
	'perf',
	'test',
	'build',
	'ci',
	'chore',
	'revert',
];

export default function formatter(report) {
	const defaultOutput = format(report);

	const help = `
──────────────────────────────────────────────
Valid commit types:

  ${validTypes.map((t) => `- ${t}`).join('\n  ')}

Examples:

  feat: add user login
  fix: correct validation bug
  docs: update README with setup steps
  chore: add husky + commitlint hooks

Format:

  <type>: <subject>

──────────────────────────────────────────────
`;

	return defaultOutput + help;
}
