package com.cloud0072.apigrid.datasheet.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ViewType {
    /**
     * NotSupport = 0,
     * Grid = 1,
     * Kanban = 2,
     * Gallery = 3,
     * Form = 4,
     * Calendar = 5,
     * Gantt = 6,
     * OrgChart = 7,
     */
    NotSupport(0),
    Grid(1),
    Kanban(2),
    Gallery(3),
    Form(4),
    Calendar(5),
    Gantt(6),
    OrgChart(7),
    ;

    private final int type;

    public static ViewType create(int type) {
        for (ViewType t : ViewType.values()) {
            if (t.getType() == type) {
                return t;
            }
        }
        return NotSupport;
    }
}
