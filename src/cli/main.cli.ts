#!/usr/bin/env node

import { CLIApplication } from './cli-application.js';
import { HelpCommand, ImportCommand, VersionCommand } from './index.js';

function bootstrap() {
  const cliApplication = new CLIApplication();
  cliApplication.registerCommands([
    new HelpCommand(),
    new VersionCommand(),
    new ImportCommand()
  ]);
  cliApplication.processCommand(process.argv);
}

bootstrap();

