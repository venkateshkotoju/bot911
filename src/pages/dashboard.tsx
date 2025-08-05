import fs from 'fs';
import path from 'path';
import { GetServerSideProps } from 'next';

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

export default function Dashboard({ stats }: { stats: ClickStats[] }) {
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

export const getServerSideProps: GetServerSideProps = async () => {
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

  const stats = Object.values(grouped).sort((a, b) => b.totalClicks - a.totalClicks);

  return {
    props: {
      stats,
    },
  };
};
