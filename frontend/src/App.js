import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [flag, setFlag] = useState('');
  const [teamId, setTeamId] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [score, setScore] = useState(null);

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/update_flag', {
        flag,
        team_id: teamId,
        service_id: serviceId
      });
      alert('Flag updated successfully');
    } catch (error) {
      console.error('Error updating flag:', error);
    }
  };

  const handleScoreCheck = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/score?team_id=${teamId}`);
      setScore(response.data.score);
    } catch (error) {
      console.error('Error fetching score:', error);
    }
  };

  return (
    <div>
      <h1>AD Competition</h1>
      <div>
        <h2>Update Flag</h2>
        <input type="text" placeholder="Flag" value={flag} onChange={(e) => setFlag(e.target.value)} />
        <input type="text" placeholder="Team ID" value={teamId} onChange={(e) => setTeamId(e.target.value)} />
        <input type="text" placeholder="Service ID" value={serviceId} onChange={(e) => setServiceId(e.target.value)} />
        <button onClick={handleSubmit}>Submit Flag</button>
      </div>
      <div>
        <h2>Check Score</h2>
        <input type="text" placeholder="Team ID" value={teamId} onChange={(e) => setTeamId(e.target.value)} />
        <button onClick={handleScoreCheck}>Get Score</button>
        {score !== null && <p>Score: {score}</p>}
      </div>
    </div>
  );
}

export default App;
