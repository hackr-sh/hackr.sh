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
import Link from "next/link"
import { externalLinks, links } from "./navbar"
import { redirect } from "next/navigation"
import { LoginSquare01Icon, LogoutSquare01Icon } from "hugeicons-react"
import { useSession, signIn, signOut } from "next-auth/react"

export function CommandDialogDemo() {
  const [open, setOpen] = React.useState(false)
  const { data: session, status } = useSession()
  const isAuthorized = status === "authenticated" && session.user.email === "hackr@hackr.sh"

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
                redirect(link.href)
              }} key={link.name}>
                <Link className="flex flex-row items-center gap-2" href={link.href}>
                  {link.Icon}
                  {link.name}
                </Link>
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
                <Link className="flex flex-row items-center gap-2" href={link.href}>
                  {link.Icon}
                  <span>{link.name}</span>
                </Link>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Admin">
            {isAuthorized ?
              <>
                <CommandItem onSelect={async () => {
                  setOpen(false);
                  await signOut()
                }}>
                  <LogoutSquare01Icon />
                  Logout
                </CommandItem>
              </>
              :
              <CommandItem onSelect={async () => {
                setOpen(false);
                await signIn("discord")
              }}>
                <LoginSquare01Icon />
                Login
              </CommandItem>
            }
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
