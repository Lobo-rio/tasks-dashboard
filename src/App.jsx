import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './routes/Dashboard';
import UsersPage from './routes/UsersPage';
import SquadsPage from './routes/SquadsPage';
import TasksPage from './routes/TasksPage';

// Use HashRouter for Electron to easier handle file:// protocol routing or use BrowserRouter if properly configured with history API fallback in Electron
// Electron usually works better with HashRouter out of the box for simple setups.
// But the user example used BrowserRouter. I'll stick to BrowserRouter but if it fails in Electron build (blank screen on reload), I might switch.
// Actually, standard Vite+Electron templates often use HashRouter.
// I will use HashRouter to be safe for Electron production builds.

import { Toaster } from 'react-hot-toast';

import AiSearchPage from './routes/AiSearchPage';
import VideoAnalysisPage from './routes/VideoAnalysisPage';
import SettingsPage from './routes/SettingsPage';

export default function App() {
  return (
    <HashRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="squads" element={<SquadsPage />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="ai-search" element={<AiSearchPage />} />
          <Route path="video-analysis" element={<VideoAnalysisPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
