import BjhSelectItem from "@/components/BjhDropdown/BjhSelectItem";

const BjhSelect = ({items, value, onChange}: any) => {
  const isActive = (v: any) => {
    return value instanceof Array ? value.indexOf(v) >= 0 : value == v
  }
  return (
    <div className="bjh-dropdown-select">
      {items.map((item: any) =>
        <BjhSelectItem
          key={item.value}
          label={item.label}
          icon={item.icon}
          active={isActive(item.value)}
          onClick={() => onChange(item)}
        />
      )}
    </div>
  )
}

export default BjhSelect;
