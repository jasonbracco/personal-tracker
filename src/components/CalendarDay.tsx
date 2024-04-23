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
            {day}
            <ul>
                {thisDaysActivities.map((activity, index) => {        
                    return <div key={index} className="calendar-event">
                        {activity.activityName}
                    </div>
                })}
            </ul>
        </div>
    )
}

export default CalendarDay