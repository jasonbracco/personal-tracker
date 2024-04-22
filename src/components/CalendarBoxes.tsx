import React, { useEffect, useState } from "react";
import "../styling/CalendarBoxes.css";
import { Activity } from "../models/Activity";
import { DayActivities } from "../models/DayActivities"
import CalendarDay from "./CalendarDay";
import CalendarHeaders from "./CalendarHeaders"

interface CalendarBoxesProps {
    currentMonthActivities: Activity[];
    daysInSelectedMonth: number;
};


function CalendarBoxes(props: CalendarBoxesProps){

    const currentActivities = props.currentMonthActivities;
    const currentDays = props.daysInSelectedMonth;

    const [currentDayActivities, setCurrentDayActivities] = useState<DayActivities[]>([])

    useEffect(() => {
        const daysAndActivitiesArray:DayActivities[]= []
        for(let i=0; i<currentDays; i++){
            // Create an object for every day where the key/value pair is the day and the activities of that day
            const activitiesForDay = currentActivities.filter(activity => {
                const activityDay = parseInt(activity.date.split("/")[1]);
                return activityDay === i + 1
            });
            daysAndActivitiesArray.push({ day: i+ 1, activities: activitiesForDay});
        }
        setCurrentDayActivities(daysAndActivitiesArray);
    }, [currentDays, currentActivities])

    return (
        <div className="calendar-container">
            <ul>
                {currentActivities.map((activity, index) => {
                    return <li key={index}>{activity.activityName} on {activity.date} from {activity.startTime} - {activity.endTime}</li>
                })}
            </ul>
            <CalendarHeaders />
            <div className="calendar-grid">
                {currentDayActivities.map((dayActivityObject) => {
                    return <div className="calendar-day" key={dayActivityObject.day}>
                        <CalendarDay dayActivityObject={dayActivityObject}/>
                    </div>
                })}
            </div>
        </div>
    )
}

export default CalendarBoxes