import fs from 'fs';
import path from 'path';
import { GetServerSideProps } from 'next';
import { useState } from 'react';

type Click = {
  id: string;
  timestamp: string;
  userAgent: string;
  ip: string;
};

type ClickStats = {
  id: string;
  totalClicks: number;
  lastClick: string;
};

export default function Dashboard({ stats, isAuthenticated }: { stats: ClickStats[], isAuthenticated: boolean }) {
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password === process.env.NEXT_PUBLIC_DASHBOARD_PASSWORD) {
      window.location.reload();
    } else {
      setAuthError('Invalid password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center">
        <div className="bg-zinc-800 p-8 rounded-lg max-w-md w-full">
          <h1 className="text-2xl font-bold mb-6 text-center">Analytics Dashboard</h1>
          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded text-white"
                placeholder="Enter dashboard password"
              />
            </div>
            {authError && (
              <p className="text-red-400 text-sm">{authError}</p>
            )}
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded"
            >
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-zinc-900 text-white px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Affiliate Click Dashboard</h1>

      <table className="w-full text-left border border-zinc-700 rounded overflow-hidden">
        <thead className="bg-zinc-800 text-sm uppercase">
          <tr>
            <th className="px-4 py-3">Product ID</th>
            <th className="px-4 py-3">Total Clicks</th>
            <th className="px-4 py-3">Last Click Time</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((entry) => (
            <tr key={entry.id} className="border-t border-zinc-700">
              <td className="px-4 py-3">{entry.id}</td>
              <td className="px-4 py-3">{entry.totalClicks}</td>
              <td className="px-4 py-3 text-sm text-zinc-400">
                {new Date(entry.lastClick).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const password = req.headers.authorization?.replace('Bearer ', '') || 
                  req.cookies.dashboardAuth;
  
  const isAuthenticated = password === process.env.DASHBOARD_PASSWORD;
  
  let stats: ClickStats[] = [];
  
  if (isAuthenticated) {
    const filePath = path.resolve('./clicks.json');
    const clicks: Click[] = fs.existsSync(filePath)
      ? JSON.parse(fs.readFileSync(filePath, 'utf-8'))
      : [];

    const grouped: Record<string, ClickStats> = {};

    clicks.forEach((click) => {
      if (!grouped[click.id]) {
        grouped[click.id] = {
          id: click.id,
          totalClicks: 0,
          lastClick: click.timestamp,
        };
      }

      grouped[click.id].totalClicks++;
      if (new Date(click.timestamp) > new Date(grouped[click.id].lastClick)) {
        grouped[click.id].lastClick = click.timestamp;
      }
    });

    stats = Object.values(grouped).sort((a, b) => b.totalClicks - a.totalClicks);
  }

  return {
    props: {
      stats,
      isAuthenticated,
    },
  };
};
