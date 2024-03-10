import { asConst } from "const-module";

async function constLoader(source: string): Promise<string> {
  return asConst(source);
}

type Loader = {
  resourcePath: string;
  async(): (error: unknown | null, contents: string) => void;
};

export default function loaderAdapter(this: Loader, source: string) {
  const callback = this.async();
  constLoader(this.resourcePath)
    .then((contents) => callback(null, contents))
    .catch((err) => callback(err, ""));
}
