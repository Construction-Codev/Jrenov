import { Fragment, type ReactNode } from "react";
import Link from "next/link";

/**
 * Rendu volontairement limité pour les articles du blog :
 * titres H2, listes, emphase et liens Markdown internes/HTTPS sûrs.
 * Pas de HTML brut ni d'URL à schéma dangereux.
 */
const INLINE_TOKENS = /(\*\*[^*]+\*\*|\[[^\]]+\]\((?:\/|https:\/\/)[^)]+\))/g;

function renderInline(text: string): ReactNode[] {
  return text.split(INLINE_TOKENS).map((part, idx) => {
    const link = part.match(/^\[([^\]]+)\]\((\/[^)]*|https:\/\/[^)]+)\)$/);
    if (link) {
      const [, label, href] = link;
      return (
        <Link key={idx} href={href} className="font-semibold text-amber-700 underline underline-offset-2 hover:text-amber-900">
          {label}
        </Link>
      );
    }

    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return (
        <strong key={idx} className="font-semibold text-slate-900">
          {part.slice(2, -2)}
        </strong>
      );
    }

    return <Fragment key={idx}>{part}</Fragment>;
  });
}

type Block =
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "paragraph"; text: string };

function toBlocks(lines: string[]): Block[] {
  const blocks: Block[] = [];
  for (const line of lines) {
    if (line.startsWith("### ")) {
      blocks.push({ type: "heading", text: line.slice(4) });
    } else if (line.startsWith("- ")) {
      const last = blocks.at(-1);
      if (last?.type === "list") last.items.push(line.slice(2));
      else blocks.push({ type: "list", items: [line.slice(2)] });
    } else if (line.trim()) {
      blocks.push({ type: "paragraph", text: line });
    }
  }
  return blocks;
}

export default function ArticleContent({ blocks }: { blocks: string[] }) {
  return (
    <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
      {toBlocks(blocks).map((block, idx) => {
        if (block.type === "heading") {
          return (
            <h2 key={idx} className="text-lg font-bold text-slate-900 pt-4">
              {block.text}
            </h2>
          );
        }
        if (block.type === "list") {
          return (
            <ul key={idx} className="list-disc pl-5 space-y-2 marker:text-amber-500">
              {block.items.map((item, itemIdx) => (
                <li key={itemIdx}>{renderInline(item)}</li>
              ))}
            </ul>
          );
        }
        return <p key={idx}>{renderInline(block.text)}</p>;
      })}
    </div>
  );
}
