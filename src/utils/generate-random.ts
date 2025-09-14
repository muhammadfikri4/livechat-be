export function generateRandom(length: number = 4): string {
	const chars = 'ABCDEF123GHIJKLMN456OPQRSTUVWXYZ7890'
	let result = ''
	for (let i = 0; i < length; i++) {
		result += chars[Math.floor(Math.random() * chars.length)]
	}
	return result
}
