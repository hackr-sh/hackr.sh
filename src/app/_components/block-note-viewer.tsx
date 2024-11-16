"use client";

import { type PartialBlock } from "@blocknote/core";
import BlurFade from "~/components/ui/blur-fade";
import { cn } from "~/lib/utils";
import { CodeBlock } from "react-code-block";
import { Button } from "~/components/ui/button";
import { Task01Icon, TaskDone01Icon } from "hugeicons-react";
import { useCopyToClipboard } from "react-use";

export const BlockNoteViewer = ({ blocks, className }: { blocks: PartialBlock[], className?: string }) => {
  return <div className={cn("flex flex-col gap-4 w-full", className)}>
    {blocks.map((block, i) => (
      <BlockRepresentable key={i} block={block} blocks={blocks} index={i} />
    ))}
  </div>
};

export const BlockRepresentable = ({ block, blocks, index }: { block: PartialBlock, blocks: PartialBlock[], index: number }) => {
  switch (block.type) {
    case "audio":
      return <BlurFade delay={0.1 + index * 0.15} className="w-full">
        <>Audio Not Implemented</>;
      </BlurFade>
    case "bulletListItem":
      if (!block.content || block.content.length === 0) return <></>;
      if (blocks[index - 1]?.type === "bulletListItem") return <></>;
      const bulletListItems = [];
      let bulletListItemsIndex = index;
      while (blocks[bulletListItemsIndex]?.type === "bulletListItem") {
        bulletListItems.push(blocks[bulletListItemsIndex]);
        bulletListItemsIndex++;
      }
      return <BlurFade delay={0.1 + index * 0.15} className="w-full">
        <ul className="list-disc">
          {bulletListItems.map((block, i) => {
            if (!block!.content || (block!.content as BlockContentOverride[]).length === 0) return <></>;
            return <li key={i}>{((block!.content as BlockContentOverride[])[0]!).text}</li>;
          })}
          {bulletListItems.length === 0 ? <li>{(block.content[0] as BlockContentOverride).text}</li> : null}
        </ul>
      </BlurFade>
    case 'checkListItem':
      if (!block.content || block.content.length === 0) return <></>;
      if (blocks[index - 1]?.type === "checkListItem") return <></>;
      const checkListItems = [];
      let checkListItemsIndex = index;
      while (blocks[checkListItemsIndex]?.type === "checkListItem") {
        checkListItems.push(blocks[checkListItemsIndex]);
        checkListItemsIndex++;
      }
      return <BlurFade delay={0.1 + index * 0.15} className="w-full">
        <ul className="list-disc">
          {checkListItems.map((block, i) => {
            if (!block!.content || (block!.content as BlockContentOverride[]).length === 0) return <></>;
            return <li key={i}>{((block!.content as BlockContentOverride[])[0]!).text}</li>;
          })}
          {checkListItems.length === 0 ? <li>{(block.content[0] as BlockContentOverride).text}</li> : null}
        </ul>
        {checkListItems.length === 0 ? <p className="text-sm text-muted-foreground">{(block.content[0] as BlockContentOverride).text}</p> : null}
      </BlurFade>
    case "codeBlock":
      if (!block.content || block.content.length === 0) return <></>;
      return <BlurFade delay={0.1 + index * 0.15} className="w-full">
        <CodeBlockWithCopyButton code={(block.content[0] as BlockContentOverride).text} language={(block.props!.language!)} />
      </BlurFade>;
    case "file":
      return <BlurFade delay={0.1 + index * 0.15} className="w-full">
        File not implemented
      </BlurFade>;
    case "heading":
      if (!block.content || block.content.length === 0) return <></>;
      switch (block.props?.level) {
        case 1:
          return <BlurFade delay={0.1 + index * 0.15} className="w-full">
            <h1 className={cn("text-4xl font-mono", `text-${block.props.textAlignment}`)}>{(block.content[0] as BlockContentOverride).text}</h1>
          </BlurFade>
        case 2:
          return <BlurFade delay={0.1 + index * 0.15} className="w-full">
            <h2 className={cn("text-3xl font-mono")}>{(block.content[0] as BlockContentOverride).text}</h2>
          </BlurFade>
        case 3:
          return <BlurFade delay={0.1 + index * 0.15} className="w-full">
            <h3 className={cn("text-2xl font-mono")}>{(block.content[0] as BlockContentOverride).text}</h3>
          </BlurFade>
        default:
          return <BlurFade delay={0.1 + index * 0.15} className="w-full">
            <h4 className={cn("text-xl font-mono")}>{(block.content[0] as BlockContentOverride).text}</h4>
          </BlurFade>
      }
    case "image":
      return <BlurFade delay={0.1 + index * 0.15} className="w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={cn(`text-${block.props?.textAlignment}`)} style={{ width: block.props?.previewWidth }} src={block.props?.url} alt={block.props?.caption} />
      </BlurFade>
    case "numberedListItem":
      if (!block.content || block.content.length === 0) return <></>;
      if (blocks[index - 1]?.type === "numberedListItem") return <></>;
      const numberedListItems = [];
      let numberedListItemsIndex = index;
      while (blocks[numberedListItemsIndex]?.type === "numberedListItem") {
        numberedListItems.push(blocks[numberedListItemsIndex]);
        numberedListItemsIndex++;
      }
      return <BlurFade delay={0.1 + index * 0.15} className="w-full">
        <ol className="list-decimal">
          {numberedListItems.map((block, i) => {
            if (!block!.content || (block!.content as BlockContentOverride[]).length === 0) return <></>;
            return <li key={i}>{((block!.content as BlockContentOverride[])[0]!).text}</li>;
          })}
          {numberedListItems.length === 0 ? <li>{(block.content[0] as BlockContentOverride).text}</li> : null}
        </ol>
      </BlurFade>
    case "paragraph":
      if (!block.content || block.content.length === 0) return <></>;
      const paragraphOrBreakContent = (block.content[0] as BlockContentOverride).text
      return <BlurFade delay={0.1 + index * 0.15} className="w-full">
        <p className="">{paragraphOrBreakContent === "<break>" ? <><br /></> : paragraphOrBreakContent}</p>
      </BlurFade>;
    case "table":
      return <BlurFade delay={0.1 + index * 0.15} className="w-full">
        Table not implemented
      </BlurFade>;
    case "video":
      return <BlurFade delay={0.1 + index * 0.15} className="w-full">
        Video not implemented
      </BlurFade>;
    default:
      return <></>;
  }
};

interface BlockContentOverride {
  type: string;
  text: string;
}

const CodeBlockWithCopyButton = ({ code, language }: { code: string, language: string }) => {
  const [state, copyToClipboard] = useCopyToClipboard();

  const copyCode = () => {
    copyToClipboard(code);
  };

  return <>
    <CodeBlock code={code} language={language}>
      <CodeBlock.Code className="bg-black/50 p-4 rounded-lg text-sm">
        <CodeBlock.LineContent>
          <CodeBlock.LineNumber className="text-muted-foreground mr-4" />
          <CodeBlock.Token />
        </CodeBlock.LineContent>
      </CodeBlock.Code>
      <Button onClick={copyCode} variant="ghost" className="absolute right-2 top-2 text-xs">
        {state.value ? <TaskDone01Icon /> : <Task01Icon />}
      </Button>
    </CodeBlock>
  </>
};