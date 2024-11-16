"use client";

import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import { type PartialBlock } from "@blocknote/core";
import BlurFade from "~/components/ui/blur-fade";
import { Button } from "~/components/ui/button";
import { type EditorSubmitProps } from "./block-note-editor";

export default function BlockNoteEditorUnsafe({ className, inititalContent, onSubmit }: { className?: string, inititalContent?: PartialBlock[], onSubmit?: (data: EditorSubmitProps) => void }) {
  const editor = useCreateBlockNote({
    initialContent: inititalContent
  });

  const extractedTitle = async (data: PartialBlock[]) => {
    if (window.document === undefined) return "";
    const span = window.document.createElement("span");
    span.innerHTML = await editor.blocksToFullHTML(data.slice(0, 1));
    return span.textContent ?? span.innerText;
  };

  const extractedBodySynopsis = async (data: PartialBlock[]) => {
    if (window.document === undefined) return "";
    const span = window.document.createElement("span");
    span.innerHTML = await editor.blocksToFullHTML(data.slice(1, 2));
    return (span.textContent ?? span.innerText).substring(0, 200) + "...";
  };
  return <>
    <BlurFade className="flex-1 flex flex-col w-full">

      <BlockNoteView
        editor={editor}
        className={className}
      />
    </BlurFade>
    <BlurFade className="w-full">
      <Button variant="ghost" className="w-full text-xl p-8" onClick={async () => {
        onSubmit?.({
          title: await extractedTitle(editor.document),
          synopsis: await extractedBodySynopsis(editor.document),
          content: editor.document
        });
      }}>Save</Button>
    </BlurFade>
  </>
}