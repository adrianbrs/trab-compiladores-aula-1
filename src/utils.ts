import { createReadStream, existsSync } from 'fs';
import readline from 'readline'

export const LETTER_RE = /^[\p{Letter}-]$/u;
export const NON_LETTER_RE = /[^\p{Letter}-]+/u;

export async function read(filepath: string, cb: (line: string) => void | Promise<void>) {
    return new Promise<void>(async (resolve) => {
        if (!existsSync(filepath)) {
            throw new Error("File not found");
        }

        const readableStream = createReadStream(filepath, 'utf-8');
        const rl = readline.createInterface({
            input: readableStream,
            crlfDelay: Infinity
        })

        for await (const line of rl) {
            await cb(line);
        }

        resolve();
    })
}

export function isLetter(c: string) {
    return LETTER_RE.test(c);
}

export function getWords(text: string): string[] {
    return text.split(NON_LETTER_RE).filter(w => !!w)
}