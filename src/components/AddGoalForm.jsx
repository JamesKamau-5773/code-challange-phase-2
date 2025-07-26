import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addGoal } from "../api";

function AddGoalForm({ setGoals }) {
  const [formData, setFormData] = useState({
    name: "",
    targetAmount: "",
    category: "Travel",
    deadline: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newGoal = {
      ...formData,
      targetAmount: Number(formData.targetAmount),
      savedAmount: 0,
      createdAt: new Date().toISOString().split("T")[0],
    };
    
    const addedGoal = await addGoal(newGoal);
    setGoals(prev => [...prev, addedGoal]);
    navigate("/");
  };

  return (
    <div className="form-container">
      <h2>Add New Goal</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Goal Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Target Amount ($)</label>
          <input
            type="number"
            name="targetAmount"
            value={formData.targetAmount}
            onChange={handleChange}
            min="1"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="Travel">Travel</option>
            <option value="Emergency">Emergency</option>
            <option value="Electronics">Electronics</option>
            <option value="Real Estate">Real Estate</option>
            <option value="Vehicle">Vehicle</option>
            <option value="Education">Education</option>
            <option value="Shopping">Shopping</option>
            <option value="Retirement">Retirement</option>
            <option value="Home">Home</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Deadline</label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            required
          />
        </div>
        
        <button type="submit" className="btn">Add Goal</button>
      </form>
    </div>
  );
}

export default AddGoalForm;