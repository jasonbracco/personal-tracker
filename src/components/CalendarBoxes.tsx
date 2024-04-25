import React, { useEffect, useState } from "react";
import "../styling/CalendarBoxes.css";
import { Activity } from "../models/Activity";
import { DayActivities } from "../models/DayActivities"
import CalendarDay from "./CalendarDay";
import CalendarHeaders from "./CalendarHeaders"

interface CalendarBoxesProps {
    currentMonthActivities: Activity[];
    daysInSelectedMonth: number;
    firstWeekdayOfCurrentMonth: string;
};


function CalendarBoxes(props: CalendarBoxesProps){

    const currentActivities = props.currentMonthActivities;
    const currentDays = props.daysInSelectedMonth;
    const firstWeekdayOfCurrentMonth = props.firstWeekdayOfCurrentMonth

    const [currentDayActivities, setCurrentDayActivities] = useState<DayActivities[]>([])
    const [daysToDelay, setDaysToDelay] = useState<string[]>([])

    useEffect(() => {
        const daysToDelayArray: string[] = []
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        for(let day of daysOfWeek){
            if (day !== firstWeekdayOfCurrentMonth){
                daysToDelayArray.push("-")
            } else {
                break
            }
        }
        setDaysToDelay(daysToDelayArray)
        return undefined
    }, [currentDays, firstWeekdayOfCurrentMonth])

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
            <CalendarHeaders />
            <div className="calendar-grid">
                {daysToDelay.map(() => {
                    return <div key={Math.random()} className="calendar-day"></div>
                })}
                {currentDayActivities.map((dayActivityObject) => {
                    return <div className="calendar-day" key={Math.random()}>
                        <CalendarDay dayActivityObject={dayActivityObject} firstWeekdayOfCurrentMonth={firstWeekdayOfCurrentMonth}/>
                    </div>
                })}
            </div>
        </div>
    )
}

export default CalendarBoxes