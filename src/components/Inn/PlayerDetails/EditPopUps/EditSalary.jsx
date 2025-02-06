import { X } from "lucide-react";
import React from "react";

const EditSalary = ({onClose}) => {
    return(
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="relative h-3/4 w-2/3 bg-white flex justify-center items-center">
                <div className="absolute top-2 right-2 hover:cursor-pointer" onClick={onClose}>
                    <X />
                </div>
                
            </div>
        </div>
    );
}

export default EditSalary;