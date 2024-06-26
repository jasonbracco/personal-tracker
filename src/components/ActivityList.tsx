import React, { useContext } from "react"
import { Activity } from "../models/Activity";
import { ActivityContext } from "./ActivityProvider";
import {ActivityContextType} from "../models/ActivityContext"

function ActivityList() {

    const {activities, setActivities} = useContext(ActivityContext) as ActivityContextType

    return (
        <div>
            <h1>Activity List</h1>
            <ul>
                {activities.map((activity) => {
                    return <li key={Math.random()}>{activity.activityName} on {activity.date} from {activity.startTime} - {activity.endTime}</li>
                })}
            </ul>
        </div>
    )
}

export default ActivityList