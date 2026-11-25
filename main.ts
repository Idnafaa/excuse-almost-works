// SPDX-License-Identifier: MIT
// The Excuse That Almost Works — the one line a gamer texts the boss to
// skip work during GTA 6 launch week. The program writes that single line
// to /output/entry.txt, where the sealed scorer and the judge read it.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The excuse: a dead router, an engineer who cannot come until Friday, and
// a gamer who is therefore "offline all week". Boring, specific, and almost
// believable — the manager knows exactly what "offline" really means.
const EXCUSE =
  "My router died overnight and the engineer can't come till Friday, so I'm offline all week, sorry.";

const outDir = "/output";
mkdirSync(outDir, { recursive: true });

// Self-check against the bounty limits before writing: one line, at most
// 20 words, and 1 to 140 characters, so a bad line fails here loudly
// instead of failing the sealed gate silently.
const wordCount = EXCUSE.trim().split(/\s+/).length;
if (EXCUSE.includes("\n") || wordCount > 20) {
  throw new Error(`excuse breaks the one-line / 20-word limit (${wordCount} words)`);
}
if (EXCUSE.length < 1 || EXCUSE.length > 140) {
  throw new Error(`excuse breaks the 1-140 character gate (${EXCUSE.length} characters)`);
}
writeFileSync(join(outDir, "entry.txt"), EXCUSE, "utf8");
console.log(`wrote entry.txt (${EXCUSE.length} characters, ${wordCount} words)`);
