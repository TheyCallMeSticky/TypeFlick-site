'use client'
import { twMerge } from 'tailwind-merge' // si tu veux fusionner proprement les classes

type LogoProps = React.ImgHTMLAttributes<HTMLImageElement>

export function TypeFlickLogoNoText({ className, ...rest }: LogoProps) {
  return (
    <img
      src="/logo_no_text.png"
      alt="TypeFlick Logo"
      className={twMerge('h-8', className)} // 'h-8' par défaut, surchargeable
      {...rest}
    />
  )
}

export function TypeFlickLogoText({ className, ...rest }: LogoProps) {
  return (
    <img
      src="/logo_text.png"
      alt="TypeFlick Logo"
      className={twMerge('h-8', className)}
      {...rest}
    />
  )
}
