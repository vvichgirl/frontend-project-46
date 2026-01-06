#!/usr/bin/env node

import { program } from 'commander'

program
  .name('Difference Evaluator')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .parse(process.argv)
