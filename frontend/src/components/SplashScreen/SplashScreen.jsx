import React from "react";
import "./SplashScreen.css";

function SplashScreen() {
  return (
    <div className="w-full h-screen flex bg-slate-950 justify-center items-center">
      <div className="terminal-loader">
        <div className="terminal-header">
          <div className="terminal-title">Status</div>
          <div className="terminal-controls">
            <div className="control close"></div>
            <div className="control minimize"></div>
            <div className="control maximize"></div>
          </div>
        </div>
        <div class="text">Loading...</div>
      </div>
    </div>
  );
}

export default SplashScreen;
