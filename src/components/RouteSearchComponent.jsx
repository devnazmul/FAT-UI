import quickSearchStore from "@/store/quickSearchStore.js";
import { LuSearch } from "react-icons/lu";

const RouteSearchComponent = () => {
  const { setIsQuickSearchOpen } = quickSearchStore();

  return (
    <div className={`relative`}>
      <input
        type="text"
        onFocus={() => {
          setIsQuickSearchOpen(true);
        }}
        className={`bg-base-100 focus:outline-none text-primary focus:border-2 rounded-xl py-2 px-8  border-primary w-[100px] sm:w-[180px] md:w-[300px]`}
        placeholder="Quick Search..."
      />
      <div
        className={`hidden md:block absolute top-[45%] -translate-y-1/2 right-2  text-primary text-xl`}
      >
        <kbd className={`kbd kbd-sm`}>CTRL+K</kbd>{" "}
      </div>
      <LuSearch
        className={`absolute top-1/2 -translate-y-1/2 left-2  text-primary text-xl`}
      />
    </div>
  );
};

export default RouteSearchComponent;
