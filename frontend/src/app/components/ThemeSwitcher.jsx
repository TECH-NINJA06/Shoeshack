import * as React from "react"
import { BsMoonStarsFill } from "react-icons/bs";
import { LuSun } from "react-icons/lu";
import { useTheme } from "next-themes"
import { Button } from "@/app/components/ui/button"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}>
      {theme === 'dark' ? (
        <>
          <LuSun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
        </>
      ) : (
        <>
          <BsMoonStarsFill className="h-[1.2rem] w-[1.2rem] rotate-90 scale-100 transition-all" />
        </>
      )}
    </Button>
  )
}

