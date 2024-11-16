"use client";

import { type PartialBlock } from "@blocknote/core";
import dynamic from "next/dynamic";

export const BlockNoteEditor = dynamic(() => import("./block-note-editor-unsafe"), { ssr: false });

export type EditorSubmitProps = { 
  title: string;
  synopsis: string;
  content: PartialBlock[];
}