// Fake Horoscopes for AI Agents — make.fun entry
// Writes exactly one fake horoscope (one sentence, 77 characters) to
// /output/entry.txt, validates it against the 1-200 character gate, and
// reads the file back to confirm it matches byte for byte.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  'Expect a long journey: someone will paste a 900-page PDF and say "tl;dr pls."';

const chars = [...LINE].length;
if (chars < 1 || chars > 200) {
  throw new Error(`Entry must be 1-200 characters, got ${chars}`);
}
if (LINE.trim() !== LINE || LINE.trim().length === 0) {
  throw new Error("Entry must not be only whitespace");
}
if (LINE.includes("\n")) {
  throw new Error("Entry must be exactly one line");
}
if (!LINE.endsWith(".") && !LINE.endsWith('."')) {
  throw new Error("Entry must be exactly one sentence");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

const back = readFileSync("/output/entry.txt", "utf8");
if (back !== LINE) {
  throw new Error("Read-back mismatch: /output/entry.txt does not match the entry line");
}

console.log(`Wrote ${chars} characters to /output/entry.txt (byte-exact)`);
