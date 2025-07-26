import { useState } from "react";
import { Link } from "react-router-dom";
import GoalCard from "./GoalCard";
import DepositForm from "./DepositForm";
import { deleteGoal } from "../api";

function GoalDashboard({ goals, setGoals }) {
  const [selectedGoal, setSelectedGoal] = useState(null);

  const handleDelete = async (id) => {
    await deleteGoal(id);
    setGoals(goals.filter(goal => goal.id !== id));
  };

  return (
    <div className="dashboard">
      <div className="controls">
        <Link to="/add-goal" className="btn">Add New Goal</Link>
        <Link to="/overview" className="btn">View Overview</Link>
      </div>
      
      <DepositForm 
        goals={goals} 
        setGoals={setGoals} 
        selectedGoal={selectedGoal}
        setSelectedGoal={setSelectedGoal}
      />
      
      <div className="goals-grid">
        {goals.map(goal => (
          <GoalCard 
            key={goal.id} 
            goal={goal} 
            onDelete={handleDelete}
            onSelect={() => setSelectedGoal(goal.id)}
            isSelected={selectedGoal === goal.id}
          />
        ))}
      </div>
    </div>
  );
}

export default GoalDashboard;