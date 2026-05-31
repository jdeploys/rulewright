import { getTargetRepoFromArgv, installCopilotInstructions } from './install-project-instructions.mjs';

installCopilotInstructions({ targetRepo: getTargetRepoFromArgv() })
  .then((result) => {
    console.log(`Installed GitHub Copilot Rulewright instructions to ${result.copilotInstructionsPath}`);
  })
  .catch((error) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  });
