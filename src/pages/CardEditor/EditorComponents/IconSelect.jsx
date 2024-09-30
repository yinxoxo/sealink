import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const IconSelect = ({ icons, setSelectedIcon, ICON_LIST }) => {
  return (
    <Select onValueChange={(value) => setSelectedIcon(value)}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select an icon" />
      </SelectTrigger>
      <SelectContent>
        {ICON_LIST.map((icon) => {
          const IconComponent = icon.icon;
          const isIconAdded = icons.some(
            (existingIcon) => existingIcon.name === icon.name,
          );

          return (
            <SelectItem
              key={icon.name}
              value={icon.name}
              disabled={isIconAdded}
              className={`flex items-center ${isIconAdded ? "opacity-50" : "opacity-100"}`}
            >
              <div className="flex p-1">
                <IconComponent size={20} className="mr-3" />
                <span>{icon.name}</span>
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default IconSelect;
