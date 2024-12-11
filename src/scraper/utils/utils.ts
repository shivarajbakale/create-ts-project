import cliProgress from 'cli-progress';

export function createProgressBar() {
  return new cliProgress.SingleBar({
    format: 'Progress |{bar}| {percentage}% || {value}/{total} Items',
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
  });
}