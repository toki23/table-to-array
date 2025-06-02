import { assertEquals, assertThrows } from "https://deno.land/std@0.192.0/testing/asserts.ts";
import { toArray } from "./main.ts";


Deno.test("toArray should convert table HTML to array", () => {
  const html = `
    <html>
      <body>
        <table id="table">
          <tbody>
            <tr><td> Item 1 </td><td> Item 2 </td></tr>
            <tr><td> Item 3 </td><td> Item 4 </td></tr>
          </tbody>
        </table>
      </body>
    </html>
  `;
  const result = toArray(html);
  const expected = [
    ["Item 1", "Item 2"],
    ["Item 3", "Item 4"],
  ];
  assertEquals(result, expected);
});

Deno.test("toArray should throw error if table is not found", () => {
  const html = `
    <html>
      <body>
        <div id="not-table"></div>
      </body>
    </html>
  `;
  assertThrows(() => toArray(html), Error, "Table not found in HTML");
});
