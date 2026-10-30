import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      position="bottom-right"
      duration={5000}
      closeButton
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-[#1a1a1a] group-[.toaster]:text-[#f5f5f5] group-[.toaster]:border-[#404040] group-[.toaster]:shadow-[0_18px_48px_rgba(0,0,0,0.45)] group-[.toaster]:font-inter",
          description: "group-[.toast]:text-[#b8b8b8]",
          closeButton:
            "group-[.toast]:bg-[#2a2a2a] group-[.toast]:border-[#404040] group-[.toast]:text-[#e6ecf5]",
          actionButton:
            "group-[.toast]:bg-red-600 group-[.toast]:text-white",
          cancelButton:
            "group-[.toast]:bg-neutral-100 group-[.toast]:text-neutral-600",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }