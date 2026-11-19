import Image from "next/image"
import logo from "@/assets/selah-coffee-co-logo.png"

// Selah's official header logo, from the live site (wp-content/uploads/2022/03/featuredimage1.png):
// the black "selah COFFEE CO." lockup with the grey engraved palm behind it.
// Only change: the white background is made transparent so it sits on the warm ground.
export function Logo({ className, priority = true }: { className?: string; priority?: boolean }) {
  return <Image src={logo} alt="Selah Coffee Co." priority={priority} className={className} />
}
