import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateGoal, fetchGoals } from '../api';

const EditGoalForm = ({ setGoals }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [goal, setGoal] = useState({
    name: '',
    targetAmount: 0,
    savedAmount: 0,
    category: '',
    deadline: ''
  });

  useEffect(() => {
    const loadGoal = async () => {
      const goals = await fetchGoals();
      const foundGoal = goals.find(g => g.id === id);
      if (foundGoal) setGoal(foundGoal);
    };
    loadGoal();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateGoal(id, goal);
    const updatedGoals = await fetchGoals();
    setGoals(updatedGoals);
    navigate('/');
  };

  return (
    <div className="form-container">
      <h2>Edit Goal</h2>
      <form onSubmit={handleSubmit}>
        {/* Add your form fields here matching AddGoalForm */}
        <button type="submit" className="btn">Update Goal</button>
      </form>
    </div>
  );
};

export default EditGoalForm;