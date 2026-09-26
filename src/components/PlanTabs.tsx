interface PlanTabsProps {
  activeTab: "plan" | "saved";
  onChange: (tab: "plan" | "saved") => void;
}

const PlanTabs = ({
  activeTab,
  onChange,
}: PlanTabsProps) => {
  return (
    <div className="inline-flex w-fit rounded-xl border border-[#252a31] bg-[#111419] p-1">
      <button
        type="button"
        onClick={() => onChange("plan")}
        className={`cursor-pointer rounded-lg px-5 py-2 text-xs font-semibold transition sm:px-7 ${
          activeTab === "plan"
            ? "bg-[#252a33] text-white"
            : "text-gray-500 hover:text-white"
        }`}
      >
        Today&apos;s Plan
      </button>

      <button
        type="button"
        onClick={() => onChange("saved")}
        className={`cursor-pointer rounded-lg px-5 py-2 text-xs font-semibold transition sm:px-7 ${
          activeTab === "saved"
            ? "bg-[#252a33] text-white"
            : "text-gray-500 hover:text-white"
        }`}
      >
        Saved
      </button>
    </div>
  );
};

export default PlanTabs;