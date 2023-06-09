import BjhSelectItem from "@/components/BjhDropdown/BjhSelectItem";

const BjhSelect = ({items, value, onChange}) => {
  return (
    <div className="bjh-dropdown-select">
      {items.map((item) =>
        <BjhSelectItem
          key={item.value}
          label={item.label}
          icon={item.icon}
          active={value === item.value}
          onClick={() => onChange(item)}
        />
      )}
    </div>
  )
}

export default BjhSelect;
