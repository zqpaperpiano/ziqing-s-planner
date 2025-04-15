import React from "react";
import { motion } from "framer-motion";
import './loading.css';
import loadingAnimation from '../../images/loading-animation.png';

const LoadingScreen = () => {
    return (
        <motion.div 
        className="fixed absolute inset-0 flex items-center justify-center bg-black z-50 bg-opacity-30 backdrop-blur-sm"
        // initial={{ opacity: 1 }}
        // animate={{ opacity: 0 }}
        // transition={{ duration: 0.5, delay: 2.5 }}
    >
        {/* Running Pixel Man */}
        <div className="bg-no-repeat pixel-man" style={{height: '170px', width: '267px'}}>

        </div>

    </motion.div>
    )
}

export default LoadingScreen;