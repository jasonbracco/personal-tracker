import React from "react";
import { Activity } from "../models/Activity";
import { DayActivities } from "../models/DayActivities"


interface CalendarDayProps {
    dayActivityObject: DayActivities
}


function CalendarDay(props: CalendarDayProps){

    const thisDaysActivities = props.dayActivityObject.activities;
    
    return (
        <div>
            <ul>
                {thisDaysActivities.map((activity, index) => {
                    return <li key={index}>{activity.activityName}</li>
                })}
            </ul>
        </div>
    )
}

export default CalendarDay