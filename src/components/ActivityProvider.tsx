import React, { createContext, useState } from 'react';
import {Activity} from "../models/Activity";
import {ActivityContextType, ActivityProviderProps} from "../models/ActivityContext";

// Create the Context 
// We create the Context using createContext and 
// specify the type parameter as ActivityContextType | undefined.
const ActivityContext = createContext<ActivityContextType | undefined>(undefined);

// Create the Provider component
const ActivityProvider = ({ children }: ActivityProviderProps) => {
    const [activities, setActivities] = useState<Activity[]>([]);
  
    return (
      <ActivityContext.Provider value={{ activities, setActivities }}>
        {children}
      </ActivityContext.Provider>
    );
  };
  
  export { ActivityContext, ActivityProvider };