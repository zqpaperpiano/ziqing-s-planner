import './Overview.css';
import React, {useContext, useEffect, useMemo, useState} from 'react';
import { format, startOfWeek, addDays, isToday, addWeeks } from 'date-fns';
import { EventContext } from '../WarRoom/components/EventContext';
import DaySelector from './components/DaySelector';
import DayScheduleOverview from './components/DayScheduleOverview';

const Overview = () => {
  const [offset, SetOffset] = useState(0);
  const anchorDate = new Date();
  const [selectedDate, setSelectedDate] = useState(anchorDate);
  const { eventList } = useContext(EventContext);
  const dayString = useMemo(() => {
    const convertedTime = new Date(selectedDate.toUTCString()) + (8 * 60 * 60 * 1000);
    const arr = convertedTime.split(' ');
    return `${arr[0]} ${arr[1]} ${arr[2]} ${arr[3]}`;
  }, [selectedDate])

  const validSchedule = useMemo(() => {
    if(eventList.length > 0){
      const selectedDaySchedule = eventList.filter((event) => {
        return event.start.toDateString() === selectedDate.toDateString();
      })
      return selectedDaySchedule;
    }
  });

  // useEffect(() => {
  //   console.log(validSchedule);
  // }, [validSchedule])


  const startDate = useMemo(() => {
    return startOfWeek(addWeeks(anchorDate, offset), {weekStartsOn: 1});
  }, [offset]);

  const weekDays = useMemo(() => {
    return [...Array(7)].map((_, i) => {
      const date = addDays(startDate, i);
      return{
        fullDate: date,
        day: format(date, 'EEE'),
        date: format(date, 'd'),
        month: format(date, 'MMM'),
        isToday: isToday(date),
      }
    })
  }, [startDate])

  return(
    <div className="h-full w-full flex">
      <div className="h-full w-1/3  px-2 py-4 border-darkPink flex flex-col items-center justify-between gap-2">
        
        {/* top part where can see the overview of the week */}
      <div className="w-95p h-1/4 p-2 relative rounded-lg bg-darkPink flex flex-col font-silkscreen justify-between">
          <div className="h-1/5 w-full relative ">
            <div 
            onClick={() => SetOffset(0)}
            className="absolute left-0 top-0 hover:cursor-pointer select-none">This Week</div>
            <div 
            onClick={() => SetOffset((prev) => prev + 1)}
            className="absolute right-0 top-0 hover:cursor-pointer select-none">Next Week</div>     
          </div>

          <div className={`h-3/5 w-full grid grid-cols-7 gap-1`}>
              {weekDays.map((day, index) => (
                <DaySelector 
                key={index} day={day} anchorDate={anchorDate} offset={offset !== 0} selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
              ))}
          </div>
      </div>

      {/* bottom part where can see the day schedule */}
      <div className="relative w-95p flex-1 p-2 rounded-lg bg-deepPink flex flex-col font-silkscreen">
              <p className="h-6 left-2 top-2">{dayString}</p>
              <div className="flex-1 w-full bg-bgPink rounded-lg p-2">
                <div className="h-3/4 w-full flex flex-col gap-2 items-center">
                {
                  validSchedule && validSchedule.length > 0 ?
                  validSchedule.map((event, index) => {
                    return <DayScheduleOverview key={index} event={event} />
                  }) :
                  <p>You have nothing scheduled today!</p>
                }
                </div>
              </div>
      </div>


      </div>  
    </div>
  );
}



// const Overview = () => {
//   const [HP, setHP]= useState(100)
//   const [SP, setSP] = useState(70)

//   useEffect(() => {
//     addLogEntry('Welcome Player')
//   }, [])

//   useEffect(() => {
//     if(HP < 50){
//       addLogEntry('Warning! Health is low!');
//     }
//   }, [HP])

//   const handleHPDmg = () => {
//     setHP((prevVal) => Math.max(0, prevVal - 10)) 
//   }
  
//   const handleSPDmg = () => {
//     setSP((prevVal) => Math.max(0, prevVal - 10))
//   }

//   const addLogEntry = (message) => {
//     const logDiv = document.getElementsByClassName("damage-log")[0];
//     const timestamp = new Date().toLocaleTimeString(); // Generate timestamp
//     const newLogEntry = document.createElement('p'); // Create a new paragraph element
//     newLogEntry.textContent = `${timestamp} - ${message}`; // Set content with timestamp
//     logDiv.appendChild(newLogEntry);
//   }

//   const dmgHandler = (monster) => {
//     handleHPDmg();
//     addLogEntry(`Player has taken damage from ${monster}`)
//     // console.log(HP);
//   }

//   const hpBarWidth = `${(HP / 100) * 100}%`;
//   const spBarWidth = `${(SP / 70) * 100}%`;

//   return(
//       <div className="overview-frame">
//          <div className="player-details">
//             <div className="player-frame">
//                 <div className="player-picture">
//                     <img src={profilePic} className="pfp" />
//                 </div>
//                 <div className="player-summary">
//                     <p><b>Name: </b>Ziqing</p>
//                     <p><b>Status: </b>Sprained ankle @.@</p>
//                 </div>
//             </div>
//             <div className="player-stats">
//                 <div className="stats-tracker">
//                   <div className="stats-bars">
//                       <p>HP</p>
//                       <div className="stat-bar">
//                         <div className="hp-bar-fill" style={{ width: hpBarWidth}}>
//                           <span>{HP}</span>
//                         </div>
//                       </div>
//                       <p>SP</p>
//                       <div className="stat-bar">
//                         <div className="sp-bar-fill" style={{width: spBarWidth}} >
//                           <span>{SP}</span>
//                         </div>
//                       </div>
//                       {/* <p>EXP</p> */}
//                   </div>
//                   <div className="damage-log">
//                     <h2>Log</h2>
//                   </div>
//                 </div>
//                 <div className="third-box">
//                   <div className="day-tracker">
//                     <FlipClock />
//                   </div>
//                   <div className="monster-selection">
                    
//                       <div onClick={() => {dmgHandler('Anxiety')}} className="monster-container">
//                       <Tooltip title="Anxiety">
//                         <img src={Anxiety} className="monster" />
//                       </Tooltip>
//                       </div>
                      
//                       <div onClick={handleHPDmg} className="monster-container">
//                         <Tooltip title="Failure">
//                           <img src={Failure} className="monster" />
//                         </Tooltip>
//                       </div>
                      
//                       <div onClick={handleHPDmg} className="monster-container">
//                         <Tooltip title="Rejection">
//                             <img src={Rejection} className="monster" />
//                           </Tooltip>
//                       </div>
                      
//                       <div onClick={handleHPDmg} className="monster-container">
//                         <Tooltip title="Overwhelmed">
//                             <img src={Overwhelmed} className="monster" />
//                         </Tooltip>
//                       </div>

//                   </div>
//                 </div>
//             </div>
            
//          </div>
//       </div>

//   )
// }

export default Overview;
