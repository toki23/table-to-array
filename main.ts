import { DOMParser, Element } from "jsr:@b-fuze/deno-dom";
export const toDom = (text: string): Element | null => {
  const doc = new DOMParser().parseFromString(text, "text/html");
  if (!doc) {
    throw new Error("Failed to parse HTML");
  }
  return doc.documentElement;
};
function createItemArray(items: Element | null): Array<string> {
  const array = [];
  for (let i = 0; i < (items?.childElementCount ?? 0); i++) {
    let item = items?.children[i].textContent;
    // 空白を取り除く
    item = item?.replace(/^\s+|\s+$/g, "");
    array.push(item);
  }
  return array.filter((item): item is string => item !== undefined);
}
export function toArray(text: string): Array<Array<string>> {
  const doc = toDom(text)
  const table = doc?.getElementsByTagName("table");
  if (!table) {
    throw new Error("Table not found in HTML");
  }
  const tbody = table[0]?.getElementsByTagName("tbody")[0];
  const rowLength = tbody?.childElementCount;
  const resultArray = [];
  for (let i = 0; i < (rowLength ?? 0); i++) {
    const items = tbody?.children[i];
    items && resultArray.push(createItemArray(items));
  }
  return resultArray;
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
}
