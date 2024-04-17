import React, {useState} from 'react';
import './App.css';
import InputForm from "./components/InputForm";
import Activity from "./models/Activity";
import ActivityList from"./components/ActivityList";


function App() {

  const [activities, setActivities] = useState<Activity[]>([]);
  console.log(activities)

  const addActivity = (activity: string, startTime: string, endTime: string) => {
    console.log("Made it to App");
    setActivities([...activities, {activity, startTime, endTime}])
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
