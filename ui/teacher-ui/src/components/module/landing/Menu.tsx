import { ExpandableTabs } from "@/components/ui/expandable-tabs";
import { tabs } from "@/types/menu.navigation";

function Menu() {
  return (
    <div className="flex flex-col gap-4 p-10">
      <ExpandableTabs tabs={tabs} />
    </div>
  );
}

export { Menu };
