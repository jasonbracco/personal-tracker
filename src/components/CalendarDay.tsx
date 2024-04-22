import React from "react";
import { Activity } from "../models/Activity";
import { DayActivities } from "../models/DayActivities"


interface CalendarDayProps {
    dayActivityObject: DayActivities;
    firstWeekdayOfCurrentMonth: string;
}


function CalendarDay(props: CalendarDayProps){

    const thisDaysActivities = props.dayActivityObject.activities;
    const day = props.dayActivityObject.day
    console.log(props)
    
    return (
        <div>
            {day}
            <ul>
                {thisDaysActivities.map((activity, index) => {        
                    return <div>
                        <li key={index}>{activity.activityName}</li>
                    </div>
                })}
            </ul>
        </div>
    )
}

export default CalendarDay