export function logInfo(scope, message, meta = {}) {
  const time = new Date().toISOString();
  console.log(JSON.stringify({ level: 'info', time, scope, message, meta }));
}

export function logError(scope, message, error) {
  const time = new Date().toISOString();
  console.error(JSON.stringify({
    level: 'error',
    time,
    scope,
    message,
    error: error?.message || String(error)
  }));
}
