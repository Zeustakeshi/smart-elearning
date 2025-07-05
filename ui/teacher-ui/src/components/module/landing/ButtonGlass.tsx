import { LiquidButton } from "@/components/ui/liquid-glass-button";

export default function ButtonGlass() {
  return (
    <div className="relative h-[200px] w-[800px]">
      <LiquidButton className="text-gray-800 absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        Khám phá ngay
      </LiquidButton>
    </div>
  );
}
