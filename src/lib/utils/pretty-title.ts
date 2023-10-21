/**
 * Returns a pretty version of the given title string.
 * @param title - The title string to prettify.
 * @returns A prettified version of the title string.
 */
export function prettyTitle(title: string) {
	const words = title.split(/-|_/);
	const prettyWords = words.map((word) => {
		return word.charAt(0).toUpperCase() + word.slice(1);
	});

	return prettyWords.join(' ');
}
