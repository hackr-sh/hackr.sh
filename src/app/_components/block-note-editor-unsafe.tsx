"use client";

import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import { type PartialBlock } from "@blocknote/core";
import BlurFade from "~/components/ui/blur-fade";
import { Button } from "~/components/ui/button";

export default function BlockNoteEditorUnsafe({ className, inititalContent, onSubmit }: { className?: string, inititalContent?: PartialBlock[], onSubmit?: (data: PartialBlock[]) => void }) {
  const editor = useCreateBlockNote({
    initialContent: inititalContent
  });
  return <>
    <BlurFade className="flex-1 flex flex-col w-full">

      <BlockNoteView
        editor={editor}
        className={className}
      />
    </BlurFade>
    <BlurFade className="w-full">
      <Button variant="ghost" className="w-full text-xl p-8" onClick={() => { onSubmit?.(editor.document) }}>Save</Button> 
    </BlurFade>
  </>
}