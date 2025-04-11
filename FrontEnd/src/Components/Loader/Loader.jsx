import React from 'react'
import { ClimbingBoxLoader } from 'react-spinners'

function Loader() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
      }}
    >
      <ClimbingBoxLoader color="#008000" />
    </div>
  );
}

export default Loader