import { getTargetRepoFromArgv, installCursorRule } from './install-project-instructions.mjs';

installCursorRule({ targetRepo: getTargetRepoFromArgv() })
  .then((result) => {
    console.log(`Installed Cursor Rulewright rule to ${result.cursorRulePath}`);
  })
  .catch((error) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  });
