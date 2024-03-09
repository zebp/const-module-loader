import { describe, expect, it } from "vitest";

import { default as loader } from "./index.js";

const invokeLoader = (input: string) =>
  new Promise<string>((resolve, reject) => {
    const loaderInterface = {
      async() {
        return (err: unknown | null, contents: string) => {
          if (err) {
            reject(err);
          } else {
            resolve(contents);
          }
        };
      },
      load: loader,
    };

    loaderInterface.load(input);
  });

describe("loader", () => {
  it("should build without errors", async () => {
    const output = await invokeLoader("export const foo: number = 5 + 5;");
    expect(output).toMatchInlineSnapshot(`
      "function deserialize(value) {
          switch (value.__const_type) {
              case "Date":
                  return new Date(value.value);
              case "Map":
                  return new Map(value.value);
              case "Set":
                  return new Set(value.value);
              case "ArrayBuffer":
                  return new Uint8Array(value.value).buffer;
              case "Uint8Array":
                  return new Uint8Array(value.value);
              case "primitive/array": {
                  const arr = [];
                  for (const v of Object.values(value.value)) {
                      arr.push(deserialize(v));
                  }
                  return arr;
              }
              case "primitive/object": {
                  const obj = {};
                  for (const [k, v] of Object.entries(value.value)) {
                      obj[k] = deserialize(v);
                  }
                  return obj;
              }
              case "primitive":
                  return value.value;
          }
      }
      const __module = deserialize({
        "__const_type": "primitive/object",
        "value": {
          "foo": {
            "__const_type": "primitive",
            "value": 10
          }
        }
      });
      export const foo = __module.foo;
      "
    `);
  });
});
