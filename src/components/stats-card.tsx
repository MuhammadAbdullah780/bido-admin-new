import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  className?: string;
}

export function MetricCard({ title, value, className }: MetricCardProps) {
  return (
    <div
      className={cn(
        "bg-card rounded-md p-6 shadow shadow-card hover:shadow-card-hover transition-all duration-200 cursor-pointer border",
        className
      )}
    >
      <div className="space-y-2">
        <p className="text-text-secondary text-sm font-medium">{title}</p>
        <div className="flex items-end justify-between">
          <p className="text-text-primary text-3xl font-bold tracking-tight">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}
