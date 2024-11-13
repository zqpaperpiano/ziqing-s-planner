import React from "react";
import { ReactTyped } from "react-typed";

const PageOne = ({handleNextPage}) => {
    return(
        <div className={`bg-bgPink h-full w-1/5 p-2`}>
                        <div className="h-1/3 w-full flex flex-col items-center justify-center whitespace-pre-line">
                            <ReactTyped
                              className="silkscreen"
                                style={{
                                    fontSize: '2em',
                                    font: 'silkscreen',
                                    textAlign: 'center'
                                }}
                                backSpeed={50}
                                cursorChar=">"
                                strings={["Welcome\n Adventurer", 'Welcome\n Player', 'Welcome\n Conqueror of Dungeons']}
                                typeSpeed={50}
                                backDelay={1000}
                                loop={Infinity}
                                smartBackspace={true}
                            />
                        </div>
                        <div className="h-1/3 w-full flex flex-col items-center justify-center pt-12 text-center font-silkscreen text-xl">
                                <p>The Guild is glad to have you</p>
                                <p>Shall we get you signed up?</p>
                        </div>
                        <div className="h-1/3 w-full flex justify-center items-center">
                            <div 
                            onClick={handleNextPage}
                            className="h-fit w-fit hover:bg-gray-300 hover:cursor-pointer">
                                <p className="font-silkscreen text-3xl">Start</p>
                            </div>
                        </div>
                    </div>
    );
}

export default PageOne;