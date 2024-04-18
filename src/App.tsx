import React, {useState} from 'react';
import './App.css';
import ActivityInputForm from "./components/ActivityInputForm";
import {Activity} from "./models/Activity";
import ActivityList from "./components/ActivityList";
import Calendar from "./components/Calendar";


function App() {

  const [activities, setActivities] = useState<Activity[]>([]);

  console.log(activities)

  const addActivity = (activityName: string, date: string, startTime: string, endTime: string, location?: string, notes?: string, ) => {
    console.log("Made it to App");
    setActivities([...activities, {activityName, location, date, startTime, endTime, notes}])
  }
  return (
    <div className="App">
      <h1>Calendar App To Remember What You Did!</h1>
      <ActivityInputForm onAddActivity={addActivity} />
      <ActivityList activities={activities} />
      <Calendar />
    </div>
  );
}

export default App;
