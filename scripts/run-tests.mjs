import { execSync } from 'child_process';

try {
  const output = execSync('yarn test --run', { 
    cwd: '/vercel/share/v0-project',
    encoding: 'utf-8',
    stdio: 'pipe'
  });
  console.log(output);
} catch (error) {
  console.log('STDOUT:', error.stdout);
  console.log('STDERR:', error.stderr);
  console.log('Exit code:', error.status);
}
