// Make the AI Judge Laugh — make.fun program/v1 entry.
// Writes one joke line about office life to /output/entry.txt.
// Node 22, standard library only, deterministic, no network.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "The printer only jams when the document is urgent, which is how I know it reads the subject line.";

// Gate the entry the same way the sealed scorer does: UTF-8 text of
// 1 to 200 characters, not whitespace-only, a single line. Fail loudly
// instead of writing an invalid entry.
const MAX_CHARS = 200;
if (JOKE.length < 1 || JOKE.length > MAX_CHARS) {
  throw new Error(`entry is ${JOKE.length} characters, gate needs 1-${MAX_CHARS}`);
}
if (JOKE.trim().length === 0) {
  throw new Error("entry is whitespace-only");
}
if (JOKE.includes("\n")) {
  throw new Error("entry must be a single line");
}

// Default output path is /output (the path the grader reads). An
// explicit first argument overrides it for local testing only; the
// grader runs bare `node main.ts` with no arguments.
const OUTPUT_DIR = process.argv[2] ?? "/output";

mkdirSync(OUTPUT_DIR, { recursive: true });
// No trailing newline: the file must be exactly the joke line.
writeFileSync(join(OUTPUT_DIR, "entry.txt"), JOKE, "utf8");
