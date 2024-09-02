import { greet } from './utils';
import { largeFunction } from './largeModule';
import { unusedFunction } from './unusedModule';

function main() {
  console.log('Main function started');
  greet('World');
  largeFunction(); // Add this to make the file larger
}

main();
