import { describe, expect, it } from "vitest";
import {
  countLinks,
  escapeHtml,
  escapeMultiline,
  hasControlChars,
  hasLineBreak,
  looksLikeInjection,
  toHeaderSafe,
} from "@/lib/form-security/sanitize";

describe("escapeHtml", () => {
  it("neutralise une balise script", () => {
    expect(escapeHtml("<script>alert(1)</script>")).toBe("&lt;script&gt;alert(1)&lt;/script&gt;");
  });

  it("neutralise un attribut d'événement", () => {
    const out = escapeHtml('<img src=x onerror="alert(1)">');
    expect(out).not.toContain("<img");
    expect(out).toBe("&lt;img src=x onerror=&quot;alert(1)&quot;&gt;");
  });

  it("échappe & ' et `", () => {
    expect(escapeHtml(`a & b ' c \``)).toBe("a &amp; b &#39; c &#96;");
  });

  it("convertit les sauts de ligne après échappement", () => {
    expect(escapeMultiline("ligne 1\n<b>ligne 2</b>")).toBe("ligne 1<br>&lt;b&gt;ligne 2&lt;/b&gt;");
  });
});

describe("en-têtes email", () => {
  it("détecte les sauts de ligne (injection d'en-tête)", () => {
    expect(hasLineBreak("Dupont\r\nBcc: x@y.fr")).toBe(true);
    expect(hasLineBreak("Dupont Bcc")).toBe(true);
    expect(hasLineBreak("Jean Dupont")).toBe(false);
  });

  it("toHeaderSafe supprime retours chariot, contrôles et limite la longueur", () => {
    expect(toHeaderSafe("Sujet\r\nBcc: x@y.fr\u0000")).toBe("Sujet Bcc: x@y.fr");
    expect(toHeaderSafe("a".repeat(300), 50)).toHaveLength(50);
  });
});

describe("détections", () => {
  it("repère les caractères de contrôle", () => {
    expect(hasControlChars("abc\u0007")).toBe(true);
    expect(hasControlChars("ligne\nsuivante\ttab")).toBe(false);
  });

  it.each(["<script>", "< SCRIPT src=x>", '<img src=x onerror="a()">', "javascript:alert(1)", "<iframe src=x>", "data:text/html,abc"])(
    "repère l'injection : %s",
    (value) => {
      expect(looksLikeInjection(value)).toBe(true);
    }
  );

  it.each([
    "Bonjour, ma toiture en onduline = 20 m² fuit.",
    "Prix < 500 € et délai > 2 semaines ?",
    "Tuiles romanes, gouttière zinc & chéneau.",
  ])("n'accuse pas un message normal : %s", (value) => {
    expect(looksLikeInjection(value)).toBe(false);
  });

  it("compte les liens", () => {
    expect(countLinks("voir https://a.fr et www.b.fr")).toBe(2);
  });
});
