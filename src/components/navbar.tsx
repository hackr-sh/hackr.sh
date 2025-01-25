"use client";

import { GithubIcon, Linkedin01Icon, TwitterIcon, Menu01Icon, Cancel01Icon, Home01Icon, NerdIcon, PencilEdit01Icon, PenTool03Icon } from "hugeicons-react";
import { useState } from "react";
import BlurFade from "~/components/ui/blur-fade";
import { Button } from "~/components/ui/button";

export const links = [
  { Icon: <Home01Icon />, href: "/", name: "Home" },
  { Icon: <NerdIcon />, href: "/about", name: "About" },
  { Icon: <PencilEdit01Icon />, href: "/contact", name: "Contact" },
  { Icon: <PenTool03Icon />, href: "/blog", name: "Blog" },
];
export const externalLinks = [
  { Icon: <GithubIcon />, href: "https://github.com/hackrmomo", name: "GitHub" },
  { Icon: <Linkedin01Icon />, href: "https://www.linkedin.com/in/mohammadalahdal/", name: "LinkedIn" },
  { Icon: <TwitterIcon />, href: "https://twitter.com/0xh4ckr", name: "Twitter" },
];
export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return <>
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="relative flex flex-row items-center justify-between p-4 gradient-blur backdrop-blur-lg pb-20">
        <div className="lg:flex flex-row items-center gap-4 hidden">
          {links.map((link, i) => (
            <BlurFade key={link.name} delay={1 + i * 0.15}>
              <Button variant="ghost" asChild key={link.name}>
                <a href={link.href}>
                  {link.name}
                </a>
              </Button>
            </BlurFade>
          ))}
        </div>
        <div className="flex flex-row items-center gap-4 lg:hidden">
          <BlurFade delay={1.0}>
            <Button onClick={() => setIsOpen(!isOpen)} variant="ghost">
              {isOpen ? <Cancel01Icon /> : <Menu01Icon />}
            </Button>
          </BlurFade>
        </div>
        <div className="flex flex-row items-center gap-4">
          {externalLinks.map((link, i) => (
            <BlurFade key={link.href} delay={1.6 + i * 0.15}>
              <Button variant="ghost" asChild key={link.href}>
                <a href={link.href}>
                  {link.Icon}
                </a>
              </Button>
            </BlurFade>
          ))}
        </div>
      </div>
    </nav>
    {isOpen && <NavOverlay links={links} />}
  </>
};

const NavOverlay = ({ links }: { links: Array<{ name: string, href: string }> }) => {
  return <>
    <BlurFade className="fixed top-0 left-0 w-screen h-screen bg-black/50 backdrop-blur-lg z-40 p-8 flex flex-col items-center justify-center gap-4">
      {links.map((link, i) => (
        <BlurFade key={link.name} delay={0.6 + i * 0.15}>
          <Button variant="ghost" asChild key={link.name}>
            <a className="text-xl" href={link.href}>
              {link.name}
            </a>
          </Button>
        </BlurFade>
      ))}
    </BlurFade>
  </>
};
