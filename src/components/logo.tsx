import { cn } from "@/lib/utils";
import Image from "next/image";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <Image
        src="/scam-detective-logo.png"
        alt="Scam Detective"
        width={200}
        height={200}
        className="w-full h-full object-contain"
        priority
      />
    </div>
  );
}
