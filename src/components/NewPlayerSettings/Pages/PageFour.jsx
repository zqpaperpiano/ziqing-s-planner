import React, { useState } from "react";
import { ReactTyped } from "react-typed";

const PageFour = () => {
    const [onSalary, setOnSalary] = useState(false);

    return(
        <div className="h-full w-1/5 backgrounds whitespace-pre-line">
            {
                !onSalary &&
                <div className="h-full w-full font-silkscreen text-2xl flex flex-col justify-around items-center">
                    <div className="text-center">
                        <ReactTyped
                            
                            backSpeed={0}
                            typeSpeed={25}
                            strings={[`
                                    Very well.\n Lastly, will you be receiving regular compensation from the guild?
                                `]}
                        />
                    </div>


                    <div className="h-1/3 w-2/3 bg-[#ffcdac] text-xl flex flex-col gap-8 justify-center p-4">
                                <div className="border">
                                    <p>Yes, let's discuss my compensation.</p>
                                </div>
                                <div>
                                    <p>Not for now. Let's talk about it another time. </p>
                                </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default PageFour; 