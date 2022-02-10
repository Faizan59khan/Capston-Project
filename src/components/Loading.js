import React from "react";
import { motion } from "framer-motion";
import './Loading.scss'

const containerStyle = {
  position: "relative",
  width: "4rem",
  height: "4rem",
  boxSizing: "border-box"
};

const circleStyle = {
  display: "block",
  width: "4rem",
  height: "4rem",
  border: "0.5rem solid #e9e9e9",
  borderTop: "0.5rem solid #f98169",
  borderRadius: "50%",
  position: "absolute",
  boxSizing: "border-box",
  top: 0,
  left: 0
};

const spinTransition = {
  loop: Infinity,
  ease: "linear",
  duration: 1
};

export default function CircleLoader() {
  return (
    <div className="loader">
    <div style={containerStyle}>
      <motion.span
        style={circleStyle}
        animate={{ rotate: 360 }}
        transition={spinTransition}
      />
    </div>
    <h3>Loading...</h3>
    </div>
  );
}