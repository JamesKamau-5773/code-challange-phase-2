function Overview({ goals }) {
  const totalGoals = goals.length;
  const totalSaved = goals.reduce((sum, goal) => sum + goal.savedAmount, 0);
  const totalTarget = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const completedGoals = goals.filter(goal => goal.savedAmount >= goal.targetAmount).length;
  
  const today = new Date();
  const warningGoals = goals.filter(goal => {
    const deadline = new Date(goal.deadline);
    const timeDiff = deadline - today;
    const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysRemaining <= 30 && goal.savedAmount < goal.targetAmount && daysRemaining > 0;
  });
  
  const overdueGoals = goals.filter(goal => {
    const deadline = new Date(goal.deadline);
    return deadline < today && goal.savedAmount < goal.targetAmount;
  });

  return (
    <div className="overview">
      <h2>Savings Overview</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Goals</h3>
          <p>{totalGoals}</p>
        </div>
        
        <div className="stat-card">
          <h3>Total Saved</h3>
          <p>${totalSaved.toLocaleString()}</p>
        </div>
        
        <div className="stat-card">
          <h3>Total Target</h3>
          <p>${totalTarget.toLocaleString()}</p>
        </div>
        
        <div className="stat-card">
          <h3>Goals Completed</h3>
          <p>{completedGoals}</p>
        </div>
      </div>
      
      {warningGoals.length > 0 && (
        <div className="alert warning">
          <h3>Approaching Deadlines ({warningGoals.length})</h3>
          <ul>
            {warningGoals.map(goal => (
              <li key={goal.id}>
                {goal.name} - ${goal.targetAmount - goal.savedAmount} remaining
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {overdueGoals.length > 0 && (
        <div className="alert danger">
          <h3>Overdue Goals ({overdueGoals.length})</h3>
          <ul>
            {overdueGoals.map(goal => (
              <li key={goal.id}>
                {goal.name} - ${goal.targetAmount - goal.savedAmount} remaining
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Overview;