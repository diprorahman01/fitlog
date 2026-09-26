interface StatsCardProps {
  label: string;
  value: number;
  highlight?: boolean;
}

const StatsCard = ({
  label,
  value,
  highlight = false,
}: StatsCardProps) => {
  return (
    <div className="flex min-h-[90px] flex-1 flex-col justify-center px-5 sm:px-7">
      <p className="text-xs text-gray-500 sm:text-sm">
        {label}
      </p>

      <p
        className={`mt-2 text-3xl font-black sm:text-4xl ${
          highlight
            ? "text-[#c9ff00]"
            : "text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
};

export default StatsCard;