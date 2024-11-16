"use client";

import dynamic from "next/dynamic";

export const BlockNoteEditor = dynamic(() => import("./block-note-editor-unsafe"), { ssr: false });