import './Overview.css';
import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import { format, startOfWeek, addDays, isToday, addWeeks, max, set } from 'date-fns';
import { EventContext } from '../../contexts/EventContext';
import DaySelector from './components/DaySelector';
import DayScheduleOverview from './components/DayScheduleOverview';
import { Button } from '@mui/material';
import {AuthContext}  from '../../contexts/authContext';
import { UserStatContext } from '../../contexts/userStatContext';
import BraindumpTab from './components/BraindumpTab';
import TabBar from './components/TabBar';
import {SmileIcon, MehIcon, FrownIcon } from 'raster-react'

const Overview = () => {
  const [offset, SetOffset] = useState(0);
  const anchorDate = new Date();
  const [selectedDate, setSelectedDate] = useState(anchorDate);
  const { eventList } = useContext(EventContext);
  const { tokenRefresh } = useContext(AuthContext);
  const { userStats } = useContext(UserStatContext);

  const dayString = useMemo(() => {
  const convertedTime = new Date(selectedDate.toUTCString()) + (8 * 60 * 60 * 1000);
  const arr = convertedTime.split(' ');
    return `${arr[0]} ${arr[1]} ${arr[2]} ${arr[3]}`;
  }, [selectedDate])

  const expBarWidth = useMemo(() => {
      return `${(userStats.xp / userStats.toNextLevel) * 100}%`;
  }, [userStats.xp])

  const validSchedule = useMemo(() => {
    if(eventList.length > 0){
      const selectedDaySchedule = eventList.filter((event) => {
        return event.start.toDateString() === selectedDate.toDateString();
      })
      const sortedSchedule = selectedDaySchedule.sort((a, b) => 
        new Date(a.start) - new Date(b.start)
      )
      return sortedSchedule;
    }
  });


  const braindumpDiv = useRef(null);
  const [braindumps, setBraindumps] = useState(
    {
      0: {title: 'Braindump 1', content: '', start: {x: 0, y:0}, open: true}
    }
  );
  const [parentWidth, setParentWidth] = useState(0);
  const [parentHeight, setParentHeight] = useState(0);

  useEffect(() => {
    if(!braindumps || Object.keys(braindumps).length < 1){
      setBraindumps({
        0: {title: 'Braindump', content: '', start: {x: 0, y: 0}, open: true}
      })
      localStorage.setItem('braindumps', JSON.stringify({
        0: {title: 'Braindump', content: '', start: {x: 0, y: 0}, open: true}
      }));
    } 
  }, [braindumps])

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      setParentWidth(braindumpDiv.current?.clientWidth - 16 || 0);
      setParentHeight(braindumpDiv.current?.clientHeight -16 || 0);
    });

    if(braindumpDiv.current){
      observer.observe(braindumpDiv.current);
    };

    return() => observer.disconnect();
  })

  const maxBraindumpsPerRow = useMemo(() => {
    return parentWidth ? Math.floor(parentWidth / 20) : 5
  }, [parentWidth])
  const openTabList = useMemo(() => {
    const newList =  Object.entries(braindumps).filter((tab) => tab[1].open).reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});

    return newList;
  }, [braindumps])

  const minimisedTabList = useMemo(() => {
    const newList =  Object.entries(braindumps).filter((tab) => !tab[1].open).reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});

    return newList;

  }, [braindumps])
  const tabBar = useRef(null);
  const tabWidth = useMemo(() => {
    const noOfTabs = Object.keys(minimisedTabList).length;
    const fullWidth = tabBar.current?.clientWidth;
    const supposedWidth = fullWidth / noOfTabs;

    if(supposedWidth < 2){
      return 2;
    }else if(supposedWidth > fullWidth / 5){
      return fullWidth / 5;
    }
    return supposedWidth;
  }, [minimisedTabList])


  const onAddTabs = () => {
    const arrLen = Object.keys(braindumps).length;
    const nextKey = Number.parseInt(Object.keys(braindumps)[arrLen - 1] )+ 1;
    const lastBraindump = Object.values(braindumps)[arrLen - 1];

    let newX = lastBraindump.start.x + 20;
    let newY = lastBraindump.start.y + 10;

    if(arrLen >= maxBraindumpsPerRow){
      if(arrLen / maxBraindumpsPerRow > 2){
        console.log('You have too many tabs open! Pleasse close some before opening new ones');
        return;
      }

      newX = 0;
      newY = lastBraindump.start.y + (parentHeight / 2);
    }
    
    const newBraindump = {
      title: `Braindump`,
      content: '',
      start: {x: newX, y: newY},
      open: true
    }

    setBraindumps((prev) => ({
      ...prev,
      [nextKey]: newBraindump
    }));
    localStorage.setItem('braindumps', JSON.stringify({...braindumps, [nextKey]: newBraindump}));
  }

  const onDeleteTabs = (index) => {
    console.log('deleting tab: ', index);
    if(Object.keys(braindumps).length <= 1){
      console.log('You cannot delete the last tab!');
      return;
    }

    const filteredList =  Object.keys(braindumps).filter(key => key !== index)
    .reduce((obj, key) => {
      obj[key] = braindumps[key];
      return obj;
    }, {});
    // console.log('the filtered list: ', filteredList);
    setBraindumps(filteredList);
    localStorage.setItem('braindumps', JSON.stringify(filteredList));
  }

  const onMinimiseTabs = (index) => {
    console.log('minimising tabs');
    setBraindumps((prev) => {
      const updatedBraindump = {
        ...prev,
        [index]: {
          ...prev[index],
          open: false
        }
      };

      localStorage.setItem('braindumps', JSON.stringify(updatedBraindump));
      return updatedBraindump;
    })
  }

  const onMaximiseTabs = (index) => {
    setBraindumps((prev) => {
      const updatedBraindump = {
        ...prev,
        [index]: {
          ...prev[index],
          open: true
        }
      };

      localStorage.setItem('braindumps', JSON.stringify(updatedBraindump));
      return updatedBraindump;
    })
  }

  const onChangeName = (index, newName) => {
    setBraindumps((prev) => {
      const updatedBraindump = {
        ...prev,
        [index]: {
          ...prev[index],
          title: newName
        }
      };

      localStorage.setItem('braindumps', JSON.stringify(updatedBraindump));
      return updatedBraindump;
    })
  }

  const onChangeContent = (index, newContent) => {
    setBraindumps((prev) => {
      const updatedBraindump = {
        ...prev,
        [index]: {
          ...prev[index],
          content: newContent
        }
      };

      localStorage.setItem('braindumps', JSON.stringify(updatedBraindump));
      return updatedBraindump;
    })
    
  }

  useEffect(() => {
    // console.log('getting from localStorage: ');
    const cached = localStorage.getItem('braindumps');
    if (cached) {
      // console.log('loaded from localStorage:', cached);
      setBraindumps(JSON.parse(cached));
    } else {
      console.log('no cached braindumps found');
    }
  }, []);



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

      {/* left side of overview page */}
      <div className="h-full w-1/4  pl-2 py-4 border-darkPink flex flex-col items-center justify-between gap-2">
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
                <div className="h-3/4 w-full flex flex-col overflow-y-auto">
                {
                  validSchedule && validSchedule.length > 0 ?
                  validSchedule.map((event, index) => {
                    return <DayScheduleOverview key={index} event={event} />
                  }) :
                  <div className="h-full w-full items-center justify-center">
                    <p className="text-center">You have nothing scheduled today!</p>
                  </div>
                }
                <div className="mt-2 flex justify-center items-center">
                  {
                    validSchedule && validSchedule.length > 0 &&
                    <p className="text-slate-400">End of Schedule</p> 
                  }
                </div>
                </div>
              </div>
          </div>
      </div>  

      {/* middle of overview page */}
      <div className="h-full w-1/2 items-center px-2 py-4 justify-between flex flex-col gap-2">

          {/* top part to see level overview/progress */}
          <div 
          style={{
            backgroundImage: `url("https://i.pinimg.com/736x/f1/32/d1/f132d1696d40df8cb4a762d63dc80bc6.jpg")`,
            backgroundSize: 'contain',
          }}
          className='h-1/3 w-full p-2 rounded-lg '>
              <div className="h-full w-full font-silkscreen flex flex-col gap-2 justify-center items-center">
                <p className="text-xl">Adventurer Level {userStats.level}</p>
                <div className="h-2 w-2/3 bg-white rounded-lg p-2">
                  <div className="h-1 bg-white rounded-lg" style={{width: expBarWidth}}>
                  </div>  
                </div>
              </div>
          </div>

          {/* bottom part as a brain dump area */}
          <div 
          ref={braindumpDiv}
          className="h-2/3 w-full px-4 pt-4 pb-2 rounded-lg bg-darkPink flex flex-col font-silkscreen justify-between">
            <div className="h-90p w-full relative">
              {
                Object.entries(openTabList).map((braindump) => {
                  // console.log('braindump!: ', braindump);
                  return <BraindumpTab tab={braindump} key={braindump[0]}  onAddTabs={onAddTabs} onDeleteTabs={onDeleteTabs}
                    onChangeContent={onChangeContent} onChangeName={onChangeName} onMinimiseTabs={onMinimiseTabs} />

                })
              }
            </div>
            <div 
            ref={tabBar}
            className="h-10p w-full flex items-end">
              {
                Object.entries(minimisedTabList).map((braindump) => {
                  return <TabBar tab={braindump} key={braindump[0]} width={tabWidth} onMaximiseTab={onMaximiseTabs}/>
                })
              }
            </div>
            
            
          </div>


      </div>

      {/* right of overview page */}
      <div className="h-full w-1/4 pr-2 py-4 flex flex-col gap-2">
          <div className="h-1/4 w-full p-2 rounded-lg bg-darkPink flex flex-col  justify-center items-center font-silkscreen justify-between">
              <p className="h-fit text-xl text-center">How are you feeling?</p>
              <div className="flex-1 items-center justify-between w-full flex">

                <div className="h-full w-1/3 flex justify-center items-center hover:cursor-pointer">
                <FrownIcon size={75} color="#1E3A8A" strokeWidth={0.25} radius={1} />
                </div>

                <div className="h-full w-1/3 flex justify-center items-center hover:cursor-pointer">
                  <MehIcon size={75} color="#6B7280" strokeWidth={0.25} radius={1} />
                </div>

                <div className="h-full w-1/3 flex justify-center items-center hover:cursor-pointer">
                  <SmileIcon size={75} color="#F59E0B" strokeWidth={0.25} radius={1} />
                </div>
              </div>

          </div>

          <div className="h-3/4 w-full p-2 rounded-lg bg-deepPink flex flex-col font-silkscreen justify-between">
             <p>Deadlines: </p>
             
          </div>
      </div>

    </div>
  );
}



export default Overview;
