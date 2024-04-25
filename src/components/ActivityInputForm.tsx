import React, {useRef} from "react"

interface ActivityFormProps {
    onAddActivity: (activityName: string, date: string, startTime: string, endTime: string, location?: string, notes?:string) => void;
}

function ActivityInputForm({ onAddActivity }: ActivityFormProps){

    const activityNameInputRef = useRef<HTMLInputElement>(null); // Check docs for this, when DOM initially loads this doesnt exist
    const locationInputRef = useRef<HTMLInputElement>(null); // Check docs for this, when DOM initially loads this doesnt exist
    const dateInputRef = useRef<HTMLInputElement>(null); // Check docs for this, when DOM initially loads this doesnt exist
    const startTimeInputRef = useRef<HTMLInputElement>(null); // Check docs for this, when DOM initially loads this doesnt exist
    const endTimeInputRef = useRef<HTMLInputElement>(null); // Check docs for this, when DOM initially loads this doesnt exist
    const notesInputRef = useRef<HTMLInputElement>(null); // Check docs for this, when DOM initially loads this doesnt exist

    function handleNewActivitySubmit(e: React.FormEvent){
        e.preventDefault();
        const newActivity = activityNameInputRef.current!.value;
        const newLocation = locationInputRef.current!.value;
        const newDate = dateInputRef.current!.value //gets date as a string, but as yyyy-mm-dd format 
        const newStartTime = startTimeInputRef.current!.value;
        const newEndTime = endTimeInputRef.current!.value;
        const newNotes = notesInputRef.current!.value;

        if (!newActivity || !newStartTime || !newEndTime || !newDate) {
            window.alert('Fill out all required fields.');
            return;
        }
         // Getting date to mm/dd/yyyy format
        const [year, month, day] = newDate.split("-");
        const dayOfTheWeekIndex = new Date(`${year}-${month}-${day}`).getDay() + 1;
        console.log(dayOfTheWeekIndex)
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayOfTheWeek = daysOfWeek[dayOfTheWeekIndex];
        const monthDayYear = `${month}/${day}/${year}`
        const formattedDate = `${dayOfTheWeek}, ${monthDayYear}`

        onAddActivity(newActivity, formattedDate, newStartTime, newEndTime, newLocation, newNotes);

        activityNameInputRef.current!.value = ""
        startTimeInputRef.current!.value = ""
        endTimeInputRef.current!.value = ""
        dateInputRef.current!.value = ""
        locationInputRef.current!.value = ""
        notesInputRef.current!.value = ""
    }

    return(
        <div>
            <form onSubmit={handleNewActivitySubmit}>
                <input type="text" placeholder="Activity" ref={activityNameInputRef}/>
                <input type="text" placeholder="Location (Optional)" ref={locationInputRef}/>
                <input type="date" ref={dateInputRef}/>
                <input type="text" placeholder="Start Time" ref={startTimeInputRef}/>
                <input type="text" placeholder="End Time" ref={endTimeInputRef}/>
                <input type="text" placeholder="Notes (Optional)" ref={notesInputRef}/>
                <button type="submit">Create Activity</button>
            </form>
        </div>
    )
}

export default ActivityInputForm