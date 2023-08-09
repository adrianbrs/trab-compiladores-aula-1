import { isLetter } from "./utils";

const IS_WORD_MARK = Symbol('IsWord');

type TrieNode = Map<string, TrieNode> & { [IS_WORD_MARK]?: true };

type TrieResult = {
    word: string;
    end: number;
}

function isWordNode(node: TrieNode) {
    return !!node[IS_WORD_MARK];
}

function markAsWordNode(node: TrieNode) {
    if (isWordNode(node)) return;
    Object.defineProperty(node, IS_WORD_MARK, {
        value: true,
        configurable: true
    });
}

export class Trie {
    private root = new Map() as TrieNode;

    insert(words: string | string[]) {
        words = Array.isArray(words) ? words : [words];
        for (const word of words) {
            let node = this.root;
            for (let i = 0; i < word.length; i++) {
                const c = word[i].toLowerCase();
                if (!node.has(c)) {
                    node.set(c, new Map() as TrieNode);
                }
                node = node.get(c)!;
            }
            markAsWordNode(node);
        }
    }

    find(text: string): TrieResult {
        let i: number;
        let node = this.root;
        let word = '';
        for (i = 0; i < text.length; i++) {
            const c = text[i].toLowerCase();
            if (!node.has(c)) {
                if (node === this.root) {
                    continue;
                }
                if (isLetter(c)) {
                    word = '';
                    node = this.root;
                    continue;
                }
                break;
            }
            word += c;
            node = node.get(c)!;
        }

        if (!isWordNode(node)) {
            word = '';
        }

        return {
            word,
            end: i
        }
    }

    toJSON() {
        return this.root;
    }
}