import { execa } from 'execa'

export async function runCommand(command, args) {
  const runCommand = execa(command, args, { stdio: 'inherit' })
  await runCommand
}
