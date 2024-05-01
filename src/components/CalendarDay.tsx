import React from "react";
import { DayActivities } from "../models/DayActivities"


interface CalendarDayProps {
    dayActivityObject: DayActivities;
    firstWeekdayOfCurrentMonth: string;
}


function CalendarDay(props: CalendarDayProps){

    const thisDaysActivities = props.dayActivityObject.activities;
    const day = props.dayActivityObject.day


        
    return (
        <div>
            <div className="day-header">
                {day}
            </div>
            <div className="activity-blocks">
                {thisDaysActivities.map((activity, index) => (
                    <div key={Math.random()} className="activity-block">
                        {activity.activityName}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CalendarDay