"use client";

import { GithubIcon, Linkedin01Icon, TwitterIcon, Menu01Icon, Cancel01Icon } from "hugeicons-react";
import Link from "next/link";
import { useState } from "react";
import BlurFade from "~/components/ui/blur-fade";
import { Button } from "~/components/ui/button";

export const Navbar = () => {
  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Blog", href: "/blog" },
  ];
  const externalLinks = [
    { Icon: <GithubIcon />, href: "https://github.com/hackrmomo" },
    { Icon: <Linkedin01Icon />, href: "https://www.linkedin.com/in/mohammadalahdal/" },
    { Icon: <TwitterIcon />, href: "https://twitter.com/0xh4ckr" },
  ];
  const [isOpen, setIsOpen] = useState(false);
  return <>
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="relative flex flex-row items-center justify-between p-4 gradient-blur backdrop-blur-lg pb-20">
        <div className="lg:flex flex-row items-center gap-4 hidden">
          {links.map((link, i) => (
            <BlurFade key={link.name} delay={1 + i * 0.15}>
              <Button variant="ghost" asChild key={link.name}>
                <Link href={link.href}>
                  {link.name}
                </Link>
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
                <Link href={link.href}>
                  {link.Icon}
                </Link>
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
            <Link className="text-xl" href={link.href}>
              {link.name}
            </Link>
          </Button>
        </BlurFade>
      ))}
    </BlurFade>
  </>
};
