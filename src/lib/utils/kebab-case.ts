/**
 * Converts a string to kebab-case.
 * @param string - The string to convert.
 * @returns The kebab-cased string.
 * @example
 * kebabCase('Hello World'); // 'hello-world'
 */
export function kebabCase(string: string) {
	return string
		.replace(/([a-z])([A-Z])/g, '$1-$2')
		.replace(/\s+/g, '-')
		.toLowerCase();
}
