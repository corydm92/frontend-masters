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
	const output = format(report);

	// Check if commitlint found any errors
	const isValid = report.results?.[0]?.valid === true;

	if (isValid) {
		// If commit is valid → don't print extra helper block
		return output;
	}

	// Otherwise → append guidance
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

	return output + help;
}
