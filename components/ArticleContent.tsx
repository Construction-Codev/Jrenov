import { Fragment, type ReactNode } from "react";

/**
 * Rendu minimal et sûr du contenu des articles (data/post.json).
 * Syntaxe prise en charge, sans HTML injecté :
 * - « ### Titre »  → <h2>
 * - « - élément »  → <ul><li> (éléments consécutifs regroupés)
 * - « **texte** »  → <strong>
 * - autre ligne    → <p>
 */
function renderInline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, idx) =>
    part.startsWith("**") && part.endsWith("**") && part.length > 4 ? (
      <strong key={idx} className="font-semibold text-slate-900">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <Fragment key={idx}>{part}</Fragment>
    )
  );
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
    } else {
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
