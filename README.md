# Dindicatif

Deno wrapper over https://github.com/console-rs/indicatif

## Usage

```ts
import ProgressBar from "https://raw.githubusercontent.com/sigmaSd/Dindicatif/master/indicatif.ts";

const ps = new ProgressBar();

for (const _ of [...Array(100)]) {
  ps.inc(1);
  Deno.sleepSync(100);
}

for (const _ of ProgressBar.progress(0,10)) {
  Deno.sleepSync(100);
}
```
