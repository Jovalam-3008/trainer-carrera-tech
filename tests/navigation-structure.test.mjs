import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const html = fs.readFileSync(
  new URL("../public/trainer-carrera-tech-v2-2026.html", import.meta.url),
  "utf8",
);

test("the sidebar exposes six unnumbered primary areas", () => {
  assert.equal((html.match(/class="nav-button nav-primary/g) ?? []).length, 6);
  assert.equal((html.match(/data-group-toggle=/g) ?? []).length, 5);
  assert.equal((html.match(/class="nav-button nav-child/g) ?? []).length, 15);
  assert.equal((html.match(/nav-icon/g) ?? []).length, 0);
});

test("the requested labels and hierarchy are present", () => {
  for (const label of [
    "Inicio",
    "Estrategia",
    "Rutas profesionales",
    "Aprendizaje",
    "Proyectos",
    "Productividad",
    "Carrera",
  ]) {
    assert.match(html, new RegExp(`>${label}(?:<|$)`));
  }
});

test("the embedded shell script is syntactically valid", () => {
  const script = html.match(/<script>([\s\S]*?)<\/script>/);
  assert.ok(script);
  assert.doesNotThrow(() => new Function(script[1]));
});
