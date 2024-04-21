import {Activity} from "./Activity";
import { ReactNode, Dispatch, SetStateAction } from 'react';

// We define an interface ActivityContextType to represent the shape of the Context, 
// which includes activities of type Activity[] and setActivities of type 
// React.Dispatch<React.SetStateAction<Activity[]>>.
export interface ActivityContextType {
    activities: Activity[];
    setActivities: Dispatch<SetStateAction<Activity[]>>;
}
// We define an interface MyProviderProps to represent 
// the props expected by the MyProvider component, 
// which includes children of type ReactNode.
export interface ActivityProviderProps {
    children: ReactNode;
  }