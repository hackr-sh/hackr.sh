"use client";
import { useState } from "react";

export const ProfilePicture = () => {
  const [isHovered, setIsHovered] = useState(false);

  return <>
    <div className="
              w-[75px] sm:w-[100px] lg:w-[150px]
              h-[75px] sm:h-[100px] lg:h-[150px]
              rounded-full 
              overflow-clip
              transition-all
              hover:scale-110
              hover:shadow-xl
              cursor-pointer
              relative
            "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered ?
        <img src="/emoji_pfp_hovered.png" alt="Emoji Profile Picture" width={150} height={150} /> :
        <img src="/emoji_pfp.png" alt="Emoji Profile Picture" width={150} height={150} />
      }
    </div>
  </>;
};