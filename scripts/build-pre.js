/*
 * SPDX-FileCopyrightText: syuilo and other misskey contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

const fs = require('fs');
const meta = require('../package.json');

fs.mkdirSync(__dirname + '/../built', { recursive: true });
let commit = 'unknown';
try {
  commit = require('child_process').execSync('git rev-parse --short=7 HEAD', { encoding: 'utf-8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
} catch (error) {
  console.error('Unable to retrieve commit information:', error);
}
const version = meta.version +
  (meta.prefix ? '+' + meta.prefix : '') +
  (commit !== 'unknown' ? (meta.prefix ? '-' + commit : '+' + commit) : '');
const sourceCode =
  meta.sourceCode && meta.sourceCode.url ?
  (
    meta.sourceCode.viewPath ?
    (
      meta.sourceCode.url +
      meta.sourceCode.viewPath +
      (meta.sourceCode.commitHash && commit !== 'unknown' ? commit : '')
    ) :
    (
      meta.sourceCode.url +
      (meta.sourceCode.commitHash && commit !== 'unknown' ? commit : '')
    )
  ) :
  '';
fs.writeFileSync(__dirname + '/../built/meta.json', JSON.stringify({ version: version, commit: commit, sourceCode: sourceCode }, null, 2), 'utf-8');
