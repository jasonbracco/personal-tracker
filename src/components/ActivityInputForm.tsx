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

    console.log(dateInputRef)


    function handleNewActivitySubmit(e: React.FormEvent){
        e.preventDefault();
        const newActivity = activityNameInputRef.current!.value;
        const newLocation = locationInputRef.current!.value;
        const newDate = dateInputRef.current!.value
        console.log(dateInputRef.current!.value)
        const newStartTime = startTimeInputRef.current!.value;
        const newEndTime = endTimeInputRef.current!.value;
        const newNotes = notesInputRef.current!.value;

        if (!newActivity || !newStartTime || !newEndTime || !newDate) {
            window.alert('Fill out all required fields.');
            return;
        }

        const [year, month, day] = newDate.split("-");
        const formattedDate = `${month}/${day}/${year}`

        // if (newDate !== null) {
        //     console.log(newDate)
        //     const formattedDate = newDate.toLocaleDateString('en-US', {year: "numeric", month: "numeric", day: "numeric"})
        //     console.log(formattedDate)
            onAddActivity(newActivity, formattedDate, newStartTime, newEndTime, newLocation, newNotes);
        // } else {
        //     window.alert('Select a Valid Date.');
        //     return;
        // }

        
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