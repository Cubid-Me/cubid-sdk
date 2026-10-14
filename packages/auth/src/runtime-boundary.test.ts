import { readFileSync, readdirSync } from "node:fs";
import { builtinModules } from "node:module";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";

const forbiddenGlobals = new Set(["window", "document", "localStorage"]);
const nodeModules = new Set(builtinModules.map((name) => name.replace(/^node:/u, "")));

function violations(source: string): string[] {
  const result: string[] = [];
  const file = ts.createSourceFile("auth.ts", source, ts.ScriptTarget.Latest, true);
  function visit(node: ts.Node) {
    if (ts.isIdentifier(node) && forbiddenGlobals.has(node.text)) result.push(node.text);
    if (ts.isElementAccessExpression(node) && ts.isStringLiteral(node.argumentExpression) && forbiddenGlobals.has(node.argumentExpression.text)) result.push(node.argumentExpression.text);
    const module = (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) ? node.moduleSpecifier
      : ts.isCallExpression(node) && (node.expression.kind === ts.SyntaxKind.ImportKeyword || (ts.isIdentifier(node.expression) && node.expression.text === "require")) ? node.arguments[0] : undefined;
    if (module && ts.isStringLiteral(module) && (module.text.startsWith("node:") || nodeModules.has(module.text))) result.push(module.text);
    ts.forEachChild(node, visit);
  }
  visit(file);
  return result;
}

describe("auth runtime boundary (runs in the existing SDK unit CI)", () => {
  it("keeps production auth source free of DOM globals and Node built-ins", () => {
    const directory = new URL("./", import.meta.url);
    for (const name of readdirSync(fileURLToPath(directory))) {
      if (!name.endsWith(".ts") || name.endsWith(".test.ts") || name.endsWith(".d.ts")) continue;
      expect(violations(readFileSync(new URL(name, directory), "utf8")), name).toEqual([]);
    }
  });

  it.each([
    "window.location.href", "globalThis.document", "globalThis['localStorage']",
    "import crypto from 'node:crypto'", "export * from 'fs'", "import('node:fs')", "require('crypto')",
  ])("catches an introduced runtime dependency: %s", (source) => {
    expect(violations(source).length).toBeGreaterThan(0);
  });

  it("does not confuse comments or messages with runtime access", () => {
    expect(violations('// window\nconst message = "document localStorage node:crypto";')).toEqual([]);
  });
});
