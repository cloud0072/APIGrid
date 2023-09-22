import React from 'react';
import RowIndexHeader from "@/components/BjhAgGrid/header/RowIndexHeader";
import AddFieldHeader from "@/components/BjhAgGrid/header/AddFieldHeader";
import GridFieldHeader from "@/components/BjhAgGrid/header/GridFieldHeader";

const BjhAgGridHeader = (props: any) => {

  const {column} = props;

  switch (column.colId) {
    case 'row_index':
      return <RowIndexHeader {...props}/>;
    case 'add_field':
      return <AddFieldHeader {...props}/>;
    default:
      return <GridFieldHeader {...props}/>;
  }
}

export default BjhAgGridHeader;
