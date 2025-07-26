import { useState } from "react";
import { updateGoal } from "../api";

function DepositForm({ goals, setGoals, selectedGoal, setSelectedGoal }) {
  const [amount, setAmount] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedGoal || !amount) return;
    
    const goal = goals.find(g => g.id === selectedGoal);
    const updatedGoal = {
      ...goal,
      savedAmount: goal.savedAmount + Number(amount),
    };
    
    await updateGoal(selectedGoal, { savedAmount: updatedGoal.savedAmount });
    setGoals(goals.map(g => g.id === selectedGoal ? updatedGoal : g));
    setAmount("");
  };

  return (
    <div className="deposit-form">
      <h3>Make a Deposit</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Select Goal:</label>
          <select
            value={selectedGoal || ""}
            onChange={(e) => setSelectedGoal(e.target.value)}
          >
            <option value="">Select a goal</option>
            {goals.map(goal => (
              <option key={goal.id} value={goal.id}>
                {goal.name} (${goal.savedAmount} / ${goal.targetAmount})
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label>Amount ($):</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="1"
            disabled={!selectedGoal}
          />
        </div>
        
        <button 
          type="submit" 
          className="btn"
          disabled={!selectedGoal || !amount}
        >
          Deposit
        </button>
      </form>
    </div>
  );
}

export default DepositForm;