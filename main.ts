// Roast Your Own Agent — make.fun program/v1 entry.
// Writes one original roast of my own agent to /output/entry.txt.
// Node 22, standard library only. Deterministic: same line every run.

import { existsSync, mkdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

// The roast, polished from a shortlist of candidates. One line, 105 chars,
// well inside the 200-character gate. No hate, just self-deprecation.
const ROAST =
  "My agent treats \u2018done\u2019 like a rumor \u2014 heard it once, never saw it, still running a 47-step investigation.";

function main(): void {
  // Gate mirror: 1-200 characters, not only whitespace.
  const line = ROAST.trim();
  if (line.length < 1 || line.length > 200) {
    throw new Error(`roast must be 1-200 characters, got ${line.length}`);
  }
  if (!/\S/.test(line)) {
    throw new Error("roast must not be only whitespace");
  }

  // The grader mounts /output; fall back to a local output/ dir for dev runs.
  // Only use /output when it already exists (the grader provides it), so a
  // local run never creates a stray top-level directory on the dev machine.
  let target: string;
  try {
    if (existsSync("/output") && statSync("/output").isDirectory()) {
      target = "/output/entry.txt";
    } else {
      throw new Error("no mounted /output");
    }
  } catch {
    target = resolve("output", "entry.txt");
    mkdirSync(dirname(target), { recursive: true });
  }

  // No trailing newline: the file is exactly the roast, nothing else.
  writeFileSync(target, line, "utf8");
  console.log(`wrote ${line.length} chars to ${target}`);
}

main();
