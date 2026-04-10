import React from "react";
import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

function renderRichText(richTexts: any[]): React.JSX.Element[] {
  return richTexts.map((text: any, i: number) => {
    const { annotations, plain_text, href } = text;
    let element = <>{plain_text}</>;

    if (annotations.bold) element = <strong>{element}</strong>;
    if (annotations.italic) element = <em>{element}</em>;
    if (annotations.code)
      element = (
        <code className="bg-surface-container-lowest px-1.5 py-0.5 font-mono text-sm text-secondary">
          {element}
        </code>
      );
    if (annotations.strikethrough) element = <s>{element}</s>;
    if (annotations.underline) element = <u>{element}</u>;

    if (href) {
      element = (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white underline underline-offset-4 hover:opacity-70 transition-opacity"
        >
          {element}
        </a>
      );
    }

    return <span key={i}>{element}</span>;
  });
}

export function NotionBlockRenderer({
  blocks,
}: {
  blocks: BlockObjectResponse[];
}) {
  return (
    <div className="notion-content space-y-4">
      {blocks.map((block) => {
        const b = block as any;

        switch (b.type) {
          case "paragraph":
            if (b.paragraph.rich_text.length === 0) return <div key={b.id} className="h-4" />;
            return (
              <p key={b.id} className="text-zinc-400 font-body leading-relaxed max-w-2xl">
                {renderRichText(b.paragraph.rich_text)}
              </p>
            );

          case "heading_1":
            return (
              <h1
                key={b.id}
                className="font-headline text-4xl font-black tracking-tighter uppercase text-white mt-16 mb-6"
              >
                {renderRichText(b.heading_1.rich_text)}
              </h1>
            );

          case "heading_2":
            return (
              <h2
                key={b.id}
                className="font-headline text-2xl font-bold tracking-tighter uppercase text-white mt-12 mb-4"
              >
                {renderRichText(b.heading_2.rich_text)}
              </h2>
            );

          case "heading_3":
            return (
              <h3
                key={b.id}
                className="font-headline text-xl font-bold tracking-tight uppercase text-white mt-8 mb-3"
              >
                {renderRichText(b.heading_3.rich_text)}
              </h3>
            );

          case "bulleted_list_item":
            return (
              <li key={b.id} className="text-zinc-400 font-body ml-6 list-disc leading-relaxed">
                {renderRichText(b.bulleted_list_item.rich_text)}
              </li>
            );

          case "numbered_list_item":
            return (
              <li key={b.id} className="text-zinc-400 font-body ml-6 list-decimal leading-relaxed">
                {renderRichText(b.numbered_list_item.rich_text)}
              </li>
            );

          case "code":
            return (
              <div key={b.id} className="my-8">
                <div className="bg-surface-container-lowest border border-outline-variant/30 overflow-hidden">
                  {b.code.caption?.length > 0 && (
                    <div className="px-6 py-2 bg-surface-container-high font-label text-[10px] tracking-widest text-zinc-500 uppercase">
                      {b.code.language || "CODE"}
                    </div>
                  )}
                  <pre className="p-6 overflow-x-auto hide-scrollbar">
                    <code className="font-mono text-xs text-zinc-500 leading-relaxed">
                      {b.code.rich_text.map((t: any) => t.plain_text).join("")}
                    </code>
                  </pre>
                </div>
              </div>
            );

          case "quote":
            return (
              <blockquote
                key={b.id}
                className="border-l-4 border-white pl-6 py-4 bg-surface-container-low my-8"
              >
                <p className="font-headline text-sm tracking-tight text-zinc-300 italic uppercase">
                  {renderRichText(b.quote.rich_text)}
                </p>
              </blockquote>
            );

          case "callout":
            return (
              <div
                key={b.id}
                className="bg-surface-container-low border-l-4 border-white p-6 my-8 flex gap-4"
              >
                {b.callout.icon?.emoji && (
                  <span className="text-xl">{b.callout.icon.emoji}</span>
                )}
                <div className="text-zinc-400 font-body leading-relaxed">
                  {renderRichText(b.callout.rich_text)}
                </div>
              </div>
            );

          case "divider":
            return (
              <div key={b.id} className="my-12 flex items-center gap-4">
                <div className="flex-1 h-px bg-zinc-800/30" />
                <div className="w-2 h-2 bg-zinc-700" />
                <div className="flex-1 h-px bg-zinc-800/30" />
              </div>
            );

          case "image":
            const src =
              b.image.type === "file" ? b.image.file.url : b.image.external.url;
            return (
              <figure key={b.id} className="my-12">
                <div className="relative overflow-hidden bg-surface-container-lowest">
                  <img
                    src={src}
                    alt={
                      b.image.caption?.length > 0
                        ? b.image.caption.map((t: any) => t.plain_text).join("")
                        : ""
                    }
                    className="w-full grayscale brightness-75"
                  />
                </div>
                {b.image.caption?.length > 0 && (
                  <figcaption className="mt-4 font-label text-[10px] tracking-widest text-zinc-600 uppercase">
                    {b.image.caption.map((t: any) => t.plain_text).join("")}
                  </figcaption>
                )}
              </figure>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
