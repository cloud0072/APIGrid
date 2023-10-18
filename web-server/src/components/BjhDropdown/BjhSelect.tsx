import BjhSelectItem from "@/components/BjhDropdown/BjhSelectItem";

const BjhSelect = ({items, value, onChange}: any) => {
  return (
    <div className="bjh-dropdown-select">
      {items.map((item: any) =>
        <BjhSelectItem
          key={item.value}
          label={item.label}
          icon={item.icon}
          active={value.indexOf(item.value) >= 0}
          onClick={() => onChange(item)}
        />
      )}
    </div>
  )
}

export default BjhSelect;
