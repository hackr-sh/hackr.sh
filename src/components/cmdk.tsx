"use client"

import * as React from "react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "~/components/ui/command"
import { DialogTitle } from "~/components/ui/dialog"
import { externalLinks, links } from "~/components/navbar"

export function CommandDialogDemo() {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle className="hidden">Command Palette</DialogTitle> {/* Satiates a requirement of Radix UI */}
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            {links.map((link) => (
              <CommandItem onSelect={() => {
                setOpen(false);
                window.location.href = link.href
              }} key={link.name}>
                <a className="flex flex-row items-center gap-2" href={link.href}>
                  {link.Icon}
                  {link.name}
                </a>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Socials">
            {externalLinks.map((link) => (
              <CommandItem key={link.name} onSelect={() => {
                setOpen(false);
                window.open(link.href, "_blank")
              }}>
                <a className="flex flex-row items-center gap-2" href={link.href}>
                  {link.Icon}
                  <span>{link.name}</span>
                </a>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
