import { Bolt, Crate } from "https://deno.land/x/bolt@0.1.5/src/bolt.ts";

const indicatif: Crate = {
  name: "indicatifwrap",
  repo: {
    url: "https://github.com/sigmaSd/dindicatif",
    relativePath: ".",
  },
  path: ".",
};

const bolt = new Bolt([indicatif]);
await bolt.init();

const libIndicatif = bolt.getLib(indicatif.name);

export default class ProgressBar {
  #lib;
  #me;

  constructor(len: number) {
    const lib = Deno.dlopen(libIndicatif, {
      "new": { parameters: ["u64"], result: "pointer" },
      "inc": { parameters: ["pointer", "u64"], result: "void" },
    });
    this.#lib = lib;
    this.#me = lib.symbols.new(len);
  }

  inc(n: number) {
    this.#lib.symbols.inc(this.#me, n);
  }

  static *progress(start: number, end: number) {
    const bar = new ProgressBar(end - start);
    for (let i = 0; i < end; i++) {
      bar.inc(1);
      yield i;
    }
  }
}
