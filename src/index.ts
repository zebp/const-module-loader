import { asConst } from "const-module";

async function constLoader(source: string): Promise<string> {
  return asConst(source, {
    transform: true,
  });
}

type Loader = {
  async(): (error: unknown | null, contents: string) => void;
};

export default function loaderAdapter(this: Loader, source: string) {
  const callback = this.async();

  constLoader(source)
    .then((contents) => callback(null, contents))
    .catch((err) => callback(err, ""));
}
