import React, { useState, useContext } from 'react';
import './styling/App.css';
import ActivityInputForm from "./components/ActivityInputForm";
import { Activity } from "./models/Activity";
import ActivityList from "./components/ActivityList";
import Calendar from "./components/Calendar";
import { ActivityContext } from "./components/ActivityProvider"
import {ActivityContextType} from "./models/ActivityContext"


function App() {

  const {activities, setActivities} = useContext(ActivityContext) as ActivityContextType
  console.log(activities)

  const addActivity = (activityName: string, date: string, startTime: string, endTime: string, location?: string, notes?: string,) => {
    setActivities([...activities, { activityName, location, date, startTime, endTime, notes }])
  }

  return (
      <div className="App">
        <h1>Calendar App To Remember What You Did!</h1>
        <ActivityInputForm onAddActivity={addActivity} />
        <ActivityList />
        <Calendar />
      </div>
  );
}

export default App;
