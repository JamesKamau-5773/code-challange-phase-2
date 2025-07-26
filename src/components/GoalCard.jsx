import { Link } from "react-router-dom";
import ProgressBar from "./ProgressBar";

function GoalCard({ goal, onDelete, onSelect, isSelected }) {
  const progress = (goal.savedAmount / goal.targetAmount) * 100;
  const remaining = goal.targetAmount - goal.savedAmount;
  
  {/* Calculate days remaining*/}
  const deadline = new Date(goal.deadline);
  const today = new Date();
  const timeDiff = deadline - today;
  const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  
  let status = "active";
  if (daysRemaining <= 0 && progress < 100) status = "overdue";
  else if (daysRemaining <= 30 && progress < 100) status = "warning";
  else if (progress >= 100) status = "completed";

  return (
    <div className={`goal-card ${status} ${isSelected ? "selected" : ""}`} onClick={onSelect}>
      <div className="card-header">
        <h3>{goal.name}</h3>
        <span className="category">{goal.category}</span>
      </div>
      
      <div className="progress-container">
        <ProgressBar progress={progress} />
        <div className="amounts">
          <span>${goal.savedAmount.toLocaleString()} saved</span>
          <span>${remaining.toLocaleString()} remaining</span>
        </div>
      </div>
      
      <div className="deadline">
        {status === "completed" ? (
          <span className="completed">Goal Achieved!</span>
        ) : status === "overdue" ? (
          <span className="overdue">Overdue!</span>
        ) : (
          <span>{daysRemaining} days remaining</span>
        )}
      </div>
      
      <div className="card-actions">
        <Link to={`/edit-goal/${goal.id}`} className="btn">Edit</Link>
        <button onClick={() => onDelete(goal.id)} className="btn danger">Delete</button>
      </div>
    </div>
  );
}

export default GoalCard;