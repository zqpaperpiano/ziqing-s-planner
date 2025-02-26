import React from 'react';

const DaySelector = ({ day, anchorDate, offset, selectedDate, setSelectedDate }) => {
    const anchorDay = anchorDate.getDate();
    const isToday = !offset && anchorDay === Number.parseInt(day.date);
    const selectedToday = selectedDate.getDate() === Number.parseInt(day.date);


    return(
        <div 
        onClick={() => setSelectedDate(day.fullDate)}
        className={`h-full w-full border-2 border-deepPink rounded-lg flex flex-col items-center justify-center font-silkscreen ${isToday ? 'bg-[#F8C471]' : 'bg-bgPink'} ${day.day === 'Sun' ? 'text-[#FF6347]' : ''}
        ${day.day === 'Sat' ? 'text-[#1E3A8A]' : ''}  ${selectedToday? 'underline': ''} hover:cursor-pointer `}>
            <p>{day.date}</p>
            <p>{day.day[0]}</p>
        </div>
    );
}

export default DaySelector;