import React from "react";

const ProgressBar = ({ tasks }) => {
  const totalTasks = tasks.length;
  const calculateProgress = () => {
    if (totalTasks === 0) {
      return 0;
    }
    const completedTasks = tasks.filter((task) => task && task.completed);
    return Math.round((completedTasks.length / totalTasks) * 100);
  };

  const progress = calculateProgress();
  const percentText = `${progress}%`;

  return (
    <div className="progress-bar">
      <div className="progress" style={{ width: `${progress}%` }}>
        <div className="percent-text">{percentText}</div>
      </div>
    </div>
  );
};

export default ProgressBar;
