import { Bolt, Crate } from "https://deno.land/x/bolt@0.1.1/src/bolt.ts";

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
  lib;
  me;

  constructor() {
    const lib = Deno.dlopen(libIndicatif, {
      "new": { parameters: [], result: "pointer" },
      "inc": { parameters: ["pointer", "u64"], result: "void" },
    });
    this.lib = lib;
    this.me = lib.symbols.new();
  }

  inc(n: number) {
    this.lib.symbols.inc(this.me, n);
  }
}
