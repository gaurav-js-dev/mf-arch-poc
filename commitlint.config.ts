import type { UserConfig } from '@commitlint/types';

const matchTypeWithSpaceAfter =
  /(feature'|'bugfix'|'hotfix'|'chore'|'docs'|'test')\s/;
const matchOptionalTicketNumberWithSpaceAfter = /(?:\[(PROJ-\d+)\]\s)?/; // "[PROJ-4605] "
const subjectThatDontStartWithBracket = /([^\[].+)/; // "Add tests" but don't allow "[ Add tests"

const Configuration: UserConfig = {
  rules: {
    'header-match-team-pattern': [2, 'always'],
    'explained-type-enum': [
      2,
      'always',
      {
        feature: 'New Feature',
        bugfix: 'New bugfix',
        hotfix: 'New hotfix',
        chore: 'New chore',
        docs: 'New docs',
        test: 'New test',
      },
    ],
  },
  parserPreset: {
    parserOpts: {
      headerPattern: new RegExp(
        '^' +
          matchOptionalTicketNumberWithSpaceAfter.source +
          subjectThatDontStartWithBracket.source +
          '$'
      ),
      headerCorrespondence: ['ticket', 'subject'],
    },
  },
  plugins: [
    {
      rules: {
        'header-match-team-pattern': (parsed: any) => {
          const { ticket, subject } = parsed;
          if (ticket === null && subject === null) {
            return [
              false,
              "header must be in format '[PROJ-4605] feature: Add tests'",
            ];
          }
          return [true, ''];
        },
        'explained-type-enum': (parsed, _when, typeObject: any) => {
          const { type } = parsed;
          if (type && !Object.keys(typeObject).includes(type)) {
            return [
              false,
              `type must be one of:
${Object.keys(typeObject)
  .map((type) => `${type} - ${typeObject[type]}`)
  .join('\n')}`,
            ];
          }
          return [true, ''];
        },
      },
    },
  ],
};

module.exports = Configuration;
