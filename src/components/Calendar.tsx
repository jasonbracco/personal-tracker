import React, { useState, useEffect, useContext } from "react"
import ActivityList from "./ActivityList"
import { Activity } from "../models/Activity";
import CalendarBoxes from "./CalendarBoxes";
import { ActivityContext } from "./ActivityProvider";
import { ActivityContextType } from "../models/ActivityContext";
import { start } from "repl";

function Calendar() {

    const { activities, setActivities } = useContext(ActivityContext) as ActivityContextType
    console.log(activities)

    const [selectedMonth, setSelectedMonth] = useState<string>(" ");
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
    const [daysInSelectedMonth, setDaysInSelectedMonth] = useState<number>(0); //Need to set default number so TS knows this will never be undefined
    const [currentMonthActivities, setCurrentMonthActivities] = useState<Activity[]>([])
    const [firstWeekdayOfCurrentMonth, setFirstWeekdayOfCurrentMonth] = useState<string>("")

    function updateMonthForward() {
        const currentMonthString = selectedMonth;
        if (currentMonthString === "December") {
            updateYear("December");
        }
        const currentMonthNumber = new Date(`${currentMonthString} 1, 2000`).getMonth() + 1;
        const updatedMonthNumber = currentMonthNumber + 1;
        const updatedDate = new Date(2000, updatedMonthNumber - 1, 1);
        startingDayOfTheMonth(updatedMonthNumber)
        updateDaysInMonth(updatedDate);
        setSelectedMonth(updatedDate.toLocaleString('default', { month: 'long' }));
    }

    function updateMonthBackward() {
        const currentMonthString = selectedMonth
        if (currentMonthString === "January") {
            updateYear("January");
        }
        const currentMonthNumber = new Date(`${currentMonthString} 1, 2000`).getMonth() + 1;
        const updatedMonthNumber = currentMonthNumber - 1
        const updatedDate = new Date(2000, updatedMonthNumber - 1, 1);
        startingDayOfTheMonth(updatedMonthNumber)
        updateDaysInMonth(updatedDate);
        setSelectedMonth(updatedDate.toLocaleString('default', { month: 'long' }));
    }

    function updateDaysInMonth(newMonth: Date) {
        const currentDate = newMonth
        currentDate.setMonth(currentDate.getMonth() + 1, 1);
        currentDate.setDate(currentDate.getDate() - 1);
        const lastDayOfMonth = currentDate.getDate();
        setDaysInSelectedMonth(lastDayOfMonth);
    }

    function updateYear(month: string) {
        month === "December" ? setSelectedYear(selectedYear! + 1) : setSelectedYear(selectedYear! - 1)
    }

    function startingDayOfTheMonth(month: number){
        const zeroIndexMonth = month - 1
        const dateString = new Date(selectedYear, zeroIndexMonth, 1);
        const firstDayOfMonthString = dateString.toLocaleDateString('en-US', { weekday: 'long'});
        setFirstWeekdayOfCurrentMonth(firstDayOfMonthString)
    }

    //Filters out for activities in the current month and year
    useEffect(() => {
        const thisMonthsActivities = activities.filter((activity: Activity) => {
            const activityDateString = activity.date
            const segmentedDayOfWeek = activityDateString.split(",")
            const segmentedDateParts = segmentedDayOfWeek[1].split("/")
            const activityMonth = parseInt(segmentedDateParts[0])
            const activityYear = parseInt(segmentedDateParts[2])
            //Check if month matches current month
            const currentCalendarMonthString = selectedMonth;
            const currentCalendarMonthNumber = new Date(`${currentCalendarMonthString} 1, 2000`).getMonth() + 1;
            //Check if year matches current year
            const currentCalendarYearNumber = selectedYear;
            if (activityMonth === currentCalendarMonthNumber && activityYear === currentCalendarYearNumber) {
                return activity
            }
        })
        setCurrentMonthActivities(thisMonthsActivities)
    }, [activities, selectedMonth])

    useEffect(() => {
        const currentDate = new Date();
        const currentMonthString = currentDate.toLocaleString('default', { month: 'long' });
        const currentYear = currentDate.getFullYear();
        setSelectedYear(currentYear);
        setSelectedMonth(currentMonthString);
    }, []);

    useEffect(() => {
        const currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth() + 1, 1);
        currentDate.setDate(currentDate.getDate() - 1); 
        startingDayOfTheMonth(currentDate.getMonth() + 1)
        const lastDayOfMonth = currentDate.getDate();
        setDaysInSelectedMonth(lastDayOfMonth);
    }, [])

    return (
        <div>
            <div className="month-select">
                <button onClick={updateMonthBackward}>Previous</button>
                <h3>{selectedMonth} {selectedYear}</h3>
                <button onClick={updateMonthForward}>Next</button>
            </div>
            <br></br>
            First Day of {selectedMonth} {selectedYear}: {firstWeekdayOfCurrentMonth}
            <CalendarBoxes currentMonthActivities={currentMonthActivities} daysInSelectedMonth={daysInSelectedMonth} 
                firstWeekdayOfCurrentMonth={firstWeekdayOfCurrentMonth}
            />
        </div>
    )
}

export default Calendar