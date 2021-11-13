import { Employees } from 'pages/Employees';
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/employees" element={<Employees />} />
      <Route path="*" element={<Navigate to="/employees" />} />
    </Routes>
  );
}

export default App;
