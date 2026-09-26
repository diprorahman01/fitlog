"use client";

import Image from "next/image";

import PlanTabs from "@/components/PlanTabs";

type ActiveTab = "plan" | "saved";
type SortOption = "duration" | "calories" | "rating";

interface MyPlanControlsProps {
  activeTab: ActiveTab;
  sortBy: SortOption;
  searchTerm: string;

  onTabChange: (tab: ActiveTab) => void;
  onSortChange: (sort: SortOption) => void;
  onSearchChange: (value: string) => void;
}

const MyPlanControls = ({
  activeTab,
  sortBy,
  searchTerm,
  onTabChange,
  onSortChange,
  onSearchChange,
}: MyPlanControlsProps) => {
  return (
    <div className="mt-8 flex flex-col gap-4">

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PlanTabs
          activeTab={activeTab}
          onChange={onTabChange}
        />


        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500">
            Sort By
          </span>

          <div className="relative">
            <select
              value={sortBy}
              onChange={(event) =>
                onSortChange(
                  event.target.value as SortOption
                )
              }
              aria-label="Sort workouts"
              className="min-w-[115px] cursor-pointer appearance-none rounded-lg border border-[#2b3038] bg-[#15181e] py-2.5 pl-4 pr-10 text-xs text-gray-200 outline-none transition hover:border-[#3a414c] focus:border-[#c9ff00]"
            >
              <option value="duration">
                Duration
              </option>

              <option value="calories">
                Calories
              </option>

              <option value="rating">
                Rating
              </option>
            </select>

            <Image
              src="/assets/chevron-down.png"
              alt=""
              width={15}
              height={15}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 opacity-60 brightness-0 invert"
            />
          </div>
        </div>
      </div>


      <div className="relative w-full sm:max-w-[320px]">
        <Image
          src="/assets/search.png"
          alt=""
          width={16}
          height={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 opacity-50 brightness-0 invert"
        />

        <input
          type="text"
          value={searchTerm}
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
          placeholder="Search name or tag..."
          className="w-full cursor-text rounded-lg border border-[#2b3038] bg-[#15181e] py-2.5 pl-10 pr-4 text-sm text-white outline-none placeholder:text-gray-600 transition focus:border-[#c9ff00]"
        />
      </div>
    </div>
  );
};

export default MyPlanControls;