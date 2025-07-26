import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { fetchGoals } from "./api";

import GoalDashboard from "./components/GoalDashboard";
import Overview from "./components/Overview";
import AddGoalForm from "./components/AddGoalForm";
import EditGoalForm from "./components/EditGoalForm";

function App() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const loadGoals = async () => {
      const data = await fetchGoals();
      setGoals(data);
    };
    loadGoals();
  }, []);

  return (
    <Router>
      <div className="app">
        <h1>Smart Goal Planner</h1>
        <Routes>
          <Route
            path="/"
            element={<GoalDashboard goals={goals} setGoals={setGoals} />}
          />
          <Route
            path="/add-goal"
            element={<AddGoalForm setGoals={setGoals} />}
          />
          <Route
            path="/edit-goal/:id"
            element={<EditGoalForm setGoals={setGoals} />}
          />
          <Route path="/overview" element={<Overview goals={goals} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
