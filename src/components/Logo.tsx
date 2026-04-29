import Image from 'next/image'

export default function StrydLogo({ size = 40, showText = true }: { size?: number, showText?: boolean }) {
  return (
    <div className="flex items-center gap-3 group cursor-pointer">
      <div className="relative transition-transform group-hover:scale-105 duration-300">
        <Image 
          src="/logo.png"  // <-- use clean version
          alt="Stryd Logo" 
          width={size} 
          height={size}
          className="drop-shadow-[0_0_15px_rgba(59,130,246,0.4)]"
          priority
        />
      </div>

      {showText && (
        <span className="text-xl font-black text-white tracking-tight uppercase">
          STRYD
        </span>
      )}
    </div>
  )
}