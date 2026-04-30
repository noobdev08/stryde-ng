export default function PathFocusLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // 'relative z-[999]' ensures this container sits on top of 
    // any absolute-positioned sidebars if they are leaking from the root.
    <div className="flex min-h-screen w-full flex-col bg-[#020617] relative z-10">
      {children}
    </div>
  )
}