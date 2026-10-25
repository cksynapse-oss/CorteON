import site from '../content/site.json';

/**
 * Resolves `{callbackWindow}` token in strings, arrays, or objects to site.callbackWindow.
 * AGENTS.md rule 6: The callback window must come ONLY from site.json callbackWindow.
 */
export function resolveCallbackWindow<T>(
  input: T,
  window: string = site.callbackWindow
): T {
  if (typeof input === 'string') {
    return input.replaceAll('{callbackWindow}', window) as unknown as T;
  }
  if (Array.isArray(input)) {
    return input.map((item) =>
      resolveCallbackWindow(item, window)
    ) as unknown as T;
  }
  if (input !== null && typeof input === 'object') {
    const resolved: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(input)) {
      resolved[key] = resolveCallbackWindow(value, window);
    }
    return resolved as unknown as T;
  }
  return input;
}
