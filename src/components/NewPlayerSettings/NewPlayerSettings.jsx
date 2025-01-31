import React, { useState, useEffect, useContext } from "react";
import './NewPlayerSettings.css';
import PageOne from "./Pages/PageOne";
import PageTwo from "./Pages/PageTwo";
import PageThree from "./Pages/PageThree";
import PageFour from "./Pages/PageFour";
import PageFive from "./Pages/PageFive";
import { useNavigate } from "react-router";
import { AuthContext } from "../../config/authContext";
import config from '../../config/config.json';
import { auth } from "../../config/firebase";


const NewPlayerSettings = () => {
    const [currPage, setCurrPage] = useState(1);
    const [schedule, setSchedule] = useState([]);
    const [hasSchedule, setHasSchedule] = useState(false);
    const [salary, setSalary] = useState(0);
    const [hasSalary, setHasSalary] = useState(false);
    const [salaryFrequency, setSalaryFrequency] = useState(null);
    const { player, setPlayer } = useContext(AuthContext);
    const [displayName, setDisplayName] = useState(null);

    const categories = {
        cat1: {
            name: 'Clearing dungeons',
            color: '#ca4a55',
        },
        cat2: {
            name: 'Running errands',
            color: '#ee694b',
        },
        cat3: {
            name: 'Misc',
            color: '#fdb814'
        },
        cat4: {
            name: 'Meetings',
            color: '#30ad6e'
        },
        cat5: {
            name: 'Social activities',
            color: '#1d58a0'
        }
    }

    useEffect(() => {
        if(salary > 0 && salaryFrequency){
            setHasSalary(true);
        }
    }, [salary, salaryFrequency])

    useEffect(() => {
        setDisplayName(player.name);
    })

    useEffect(() => {
        if(player.completedCalibration){
            navigate('/');
        }
    })


    const handleSubmitPreferences = () => {
        let preferences = {
                hasSchedule: hasSchedule,
                schedule: schedule,
                hasSalary: hasSalary,
                salary: salary,
                salaryFrequency: salaryFrequency,
                categories: categories
        }

        // console.log('this is my preferences: ', preferences);

        const userToken = auth.currentUser.getIdToken();
        const uid = auth.currentUser.uid;

        fetch(`${config.development.apiURL}users/newUserPreferences`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            },
            body: JSON.stringify({
                'uid': uid,
                'displayName': displayName,
                'preferences': preferences
            })
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            setPlayer(data);
            localStorage.setItem('player', JSON.stringify(data));
            navigate('/');
        })
    }

    const handleSetSchedule = (schedule) => {
        setSchedule(schedule);
    }

    const handleHasSchedule = (bool) => {
        setHasSchedule(bool);
    }

    const changeDisplayName = (newName) => {
        setDisplayName(newName);
    }

    const handleSetHasSchedule = (val) => {
        setHasSchedule(val);
    }

    const handleSetSalary = (amt) => {
        setSalary(amt);
    }

    const handleSetHasSalary = (val) => {
        setHasSalary(val);
    }

    const handleSetSalaryFrequency = (freq) => {
        setSalaryFrequency(freq);
    }

    const navigate = useNavigate();

    const handleNextPage = () => {
        setCurrPage((prevVal) => prevVal +1)
    }

    const handlePrevPage = () => {
        setCurrPage((prevVal) => prevVal - 1);
    }


    return(
        <div className="bg-black fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items align">
            <div className="h-5/6 w-5/6 bg-white my-auto overflow-hidden ">
                <div className={`h-full w-5x flex transition-transform duration-700 
                    ${currPage === 1 && "translate-x-0"}
                    ${currPage === 2 && "-translate-x-20p"}
                    ${currPage === 3 && "-translate-x-40p"}
                    ${currPage === 4 && "-translate-x-60p"}
                    ${currPage === 5 && "-translate-x-80p"}
                    `}>
                    <PageOne handleNextPage={handleNextPage}/>
                    <PageTwo currPage={currPage} handleNextPage={handleNextPage} displayName={displayName} changeDisplayName={changeDisplayName}/>
                    <PageThree currPage={currPage} handleNextPage={handleNextPage} displayName={displayName} handlePrevPage={handlePrevPage} handleSetSchedule={handleSetSchedule} handleHasSchedule={handleHasSchedule}/>
                    <PageFour 
                        currPage={currPage} handleNextPage={handleNextPage} handlePrevPage={handlePrevPage}
                        setHasSalary={handleSetHasSalary} setSalary={handleSetSalary} setSalaryFrequency={handleSetSalaryFrequency}
                        />
                    <PageFive handlePrevPage={handlePrevPage} handleNextPage={handleSubmitPreferences} displayName={displayName}/>
                </div>

                    
            </div>


        </div>
    );
}

export default NewPlayerSettings;