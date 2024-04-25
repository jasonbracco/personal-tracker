import React, { useState, useEffect } from "react";

interface ActivityFormProps {
    onAddActivity: (activityName: string, date: string, startTime: string, endTime: string, lengthInHours: number, lengthInMinutes:number, location?: string, notes?:string) => void;
}

function ActivityInputForm({ onAddActivity }: ActivityFormProps){

    const [activityName, setActivityName] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [startTime, setStartTime] = useState<string>("12:00 AM");
    const [endTime, setEndTime] = useState<string>("12:00 AM");
    const [notes, setNotes] = useState<string>("");
    const [lengthInHours, setLengthInHours] = useState<number>(0);
    console.log(lengthInHours)
    const [lengthInMinutes, setLengthInMinutes] = useState<number>(0);
    (console.log(lengthInMinutes))


    const timeOptions: string[] = [];
    for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 15) {
            const time = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
            timeOptions.push(time);
        }
    }

    function calculateTime(startTime: string, endTime: string) {
        const [startHours, startMinutes] = startTime.split(":").map(num => parseInt(num, 10))
        const [endHours, endMinutes] = endTime.split(":").map(num => parseInt(num, 10))

        let hourDifference = endHours - startHours;
        let minuteDifference = endMinutes - startMinutes;

        // Adjust for negative minute difference
        if (minuteDifference < 0) {
            minuteDifference += 60;
            hourDifference--;
        }

        setLengthInHours(hourDifference)
        setLengthInMinutes(minuteDifference)
    }

    function handleNewActivitySubmit(e: React.FormEvent){
        e.preventDefault();

        if (!activityName || !startTime || !endTime || !date) {
            window.alert('Fill out all required fields.');
            return;
        }
         // Getting date to mm/dd/yyyy format
        const [year, month, day] = date.split("-");
        const dayOfTheWeekIndex = new Date(`${year}-${month}-${day}`).getDay() + 1;
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayOfTheWeek = daysOfWeek[dayOfTheWeekIndex];
        const monthDayYear = `${month}/${day}/${year}`
        const formattedDate = `${dayOfTheWeek}, ${monthDayYear}`

        onAddActivity(activityName, formattedDate, startTime, endTime, lengthInHours, lengthInMinutes, location, notes);

        setActivityName("");
        setLocation("");
        setDate("");
        setStartTime("12:00 AM");
        setEndTime("12:00 AM");
        setNotes("");
        setLengthInHours(0)
        setLengthInMinutes(0)
    }

    useEffect(() => {
        calculateTime(startTime, endTime);
    }, [startTime, endTime]);

    return(
        <div>
         <form onSubmit={handleNewActivitySubmit}>
                <input type="text" placeholder="Activity" value={activityName} onChange={(e) => setActivityName(e.target.value)}/>
                <input type="text" placeholder="Location (Optional)" value={location} onChange={(e) => setLocation(e.target.value)}/>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)}/>
                <select value={startTime} onChange={(e) => setStartTime(e.target.value)}>
                    {timeOptions.map((time, index) => (
                        <option key={index} value={time}>{time}</option>
                    ))}
                </select>
                <select value={endTime} onChange={(e) => setEndTime(e.target.value)}>
                    {timeOptions.map((time, index) => (
                        <option key={index} value={time}>{time}</option>
                    ))}
                </select>
                <input type="text" placeholder="Notes (Optional)" value={notes} onChange={(e) => setNotes(e.target.value)}/>
                <button type="submit">Create Activity</button>
            </form>
        </div>
    )
}

export default ActivityInputForm