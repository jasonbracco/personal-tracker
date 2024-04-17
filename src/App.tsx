import React, {useState} from 'react';
import './App.css';
import InputForm from "./components/InputForm";
import {PastActivity} from "./models/Activity";
import ActivityList from "./components/ActivityList";


function App() {

  const [activities, setActivities] = useState<PastActivity[]>([]);

  console.log(activities)

  const addActivity = (activityName: string, date: string, startTime: string, endTime: string, location?: string, notes?: string, ) => {
    console.log("Made it to App");
    setActivities([...activities, {activityName, location, date, startTime, endTime, notes}])
  }
  return (
    <div className="App">
      <h1>Calendar App To Remember What You Did!</h1>
      <InputForm onAddActivity={addActivity} />
      <ActivityList activities={activities} />
    </div>
  );
}

export default App;
