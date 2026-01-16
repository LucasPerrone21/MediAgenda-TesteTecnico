type StatsCardProps = {
  value: number | string;
  label: string;
};

export function StatsCard({ value, label }: StatsCardProps) {
  return (
    <div className="flex flex-col items-center justify-center
                    rounded-xl bg-white px-8 py-6 shadow-sm
                    min-w-[220px]">
      <span className="text-blue-600 text-2xl font-semibold">
        {value}
      </span>
      <span className="text-gray-500 text-sm mt-1">
        {label}
      </span>
    </div>
  );
}
