import {UnitType} from "@/pages/system/role/index";
import UnitTag from "@/components/datasheet/UnitTag";
import React from "react";
import {useTheme} from "@/hooks/useTheme";
import {t} from "@/utils/i18n";

const UnitItem = (record: any) => {
  const {themeColors} = useTheme();

  return (
    <div>
      <UnitTag
        {...record}
        isTeam={record.unitType == UnitType.Team}
        title={record.unitName}
        deletable={false}
      />
      {record.isAdmin &&
      <div>
        {t.role_const_admin}
      </div>
      }
    </div>
  )
}

export default UnitItem;
