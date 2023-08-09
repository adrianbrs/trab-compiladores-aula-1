import { createCommand } from "commander";
import { resolve } from "path";
import { Trie } from "./trie";
import { getWords, read } from "./utils";

interface IOptions {
  dict: string;
}

async function main() {
  const cmd = createCommand("wordcount");

  cmd.option("-d, --dict <filename>", "Dict file to use", "test/dict.txt");

  cmd
    .argument("[filename]", "File to parse", "test/input.txt")
    .action(async (filename, options: IOptions) => {
      console.time("tempo de execução");
      const dictFilepath = resolve(process.cwd(), options.dict);

      const trie = new Trie();
      await read(dictFilepath, (line) => {
        const words = getWords(line);
        trie.insert(words);
      });

      const wordCount = new Map<string, number>();
      const filepath = resolve(process.cwd(), filename);
      await read(filepath, (line) => {
        while (line.length) {
          const { word, end } = trie.find(line);

          if (word) {
            if (!wordCount.has(word)) {
              wordCount.set(word, 0);
            }
            wordCount.set(word, wordCount.get(word)! + 1);
          }

          line = line.slice(end);
        }
      });

      console.log("Result:");
      for (const [word, count] of wordCount.entries()) {
        console.log(`  ${word}: ${count}`);
      }

      console.log("");
      console.timeEnd("tempo de execução");
    });

  await cmd.parseAsync();
}
main();
