const PREFIX = '[FluxPress] '

function addPrefix(message: string) {
  const lines = message.split('\n')
  if (lines.length > 0) {
    if (!lines[0].trim()) lines.shift()
    if (!lines[lines.length - 1].trim()) lines.pop()
  }
  return lines.map((line) => PREFIX + line).join('\n')
}

const logger = {
  info: (message: string) => console.info(addPrefix(message)),
  warn: (message: string) => console.warn(addPrefix(message)),
  error: (message: string) => console.error(addPrefix(message)),
}

export default logger
