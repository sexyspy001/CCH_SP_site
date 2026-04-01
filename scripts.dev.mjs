import { spawn } from 'node:child_process';

const isWindows = process.platform === 'win32';
const npmCmd = isWindows ? 'npm.cmd' : 'npm';

const api = spawn(npmCmd, ['run', 'dev:api'], { stdio: 'inherit', shell: false });
const client = spawn(npmCmd, ['run', 'dev:client'], { stdio: 'inherit', shell: false });

const shutdown = () => {
  api.kill();
  client.kill();
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

api.on('exit', (code) => {
  if (code && code !== 0) {
    process.exit(code);
  }
});

client.on('exit', (code) => {
  if (code && code !== 0) {
    process.exit(code);
  }
});
