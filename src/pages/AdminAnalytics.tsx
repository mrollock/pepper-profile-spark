import { useState, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, CartesianGrid,
} from "recharts";

interface AnalyticsEvent {
  session_id: string;
  event_type: string;
  event_data: Record<string, unknown>;
  created_at: string;
}

const COLORS = ["#c8962e", "#a67825", "#8b5e1a", "#d4a843", "#e0bc5f", "#6b4513"];

export default function AdminAnalytics() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const { data, error: fnError } = await supabase.functions.invoke(
        "analytics-dashboard",
        { body: { password } }
      );
      if (fnError) throw fnError;
      if (data?.error) throw new Error(data.error);
      setEvents(data.events || []);
      setAuthed(true);
    } catch (e: any) {
      setError(e.message || "Invalid password");
    }
    setLoading(false);
  };

  const stats = useMemo(() => {
    if (!events.length) return null;

    const sessions = new Map<string, AnalyticsEvent[]>();
    events.forEach((e) => {
      const arr = sessions.get(e.session_id) || [];
      arr.push(e);
      sessions.set(e.session_id, arr);
    });

    const totalStarts = events.filter((e) => e.event_type === "start").length;
    const totalCompletes = events.filter((e) => e.event_type === "complete").length;
    const completionRate = totalStarts > 0 ? ((totalCompletes / totalStarts) * 100).toFixed(1) : "0";

    // Drop-off analysis: sessions with start but no complete
    const dropOffByItem: Record<string, number> = {};
    sessions.forEach((evts) => {
      const hasStart = evts.some((e) => e.event_type === "start");
      const hasComplete = evts.some((e) => e.event_type === "complete");
      if (hasStart && !hasComplete) {
        const answers = evts.filter((e) => e.event_type === "item_answer");
        if (answers.length > 0) {
          const last = answers[answers.length - 1];
          const key = `${(last.event_data as any).phase}:${(last.event_data as any).item_id}`;
          dropOffByItem[key] = (dropOffByItem[key] || 0) + 1;
        } else {
          dropOffByItem["before_first_item"] = (dropOffByItem["before_first_item"] || 0) + 1;
        }
      }
    });

    const dropOffData = Object.entries(dropOffByItem)
      .map(([key, count]) => ({ item: key, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20);

    // Gate frequency
    const gateCounts: Record<string, number> = {};
    events
      .filter((e) => e.event_type === "complete")
      .forEach((e) => {
        const gates = (e.event_data as any)?.gates as string[] | undefined;
        if (gates) {
          gates.forEach((g: string) => {
            gateCounts[g] = (gateCounts[g] || 0) + 1;
          });
        }
      });

    const gateData = Object.entries(gateCounts)
      .map(([gate, count]) => ({ gate, count }))
      .sort((a, b) => b.count - a.count);

    // Fire type distribution
    const fireCounts: Record<string, number> = {};
    events
      .filter((e) => e.event_type === "complete")
      .forEach((e) => {
        const fire = (e.event_data as any)?.primary_fire;
        if (fire) fireCounts[fire] = (fireCounts[fire] || 0) + 1;
      });

    const fireData = Object.entries(fireCounts)
      .map(([fire, count]) => ({ name: fire, value: count }))
      .sort((a, b) => b.value - a.value);

    return {
      totalStarts,
      totalCompletes,
      completionRate,
      totalSessions: sessions.size,
      dropOffData,
      gateData,
      fireData,
    };
  }, [events]);

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream-soft">
        <div className="w-full max-w-sm rounded-xl border border-cream-mid bg-cream p-8 shadow-md">
          <h1 className="mb-6 text-center font-display text-xl text-text-body">Analytics Dashboard</h1>
          <input
            type="password"
            placeholder="Admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="mb-4 w-full rounded-md border border-cream-mid bg-cream-soft px-4 py-3 font-body text-sm text-text-body focus:border-gold focus:outline-none"
          />
          {error && <p className="mb-3 text-sm text-ember">{error}</p>}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full rounded-md bg-gold px-4 py-3 font-body text-sm font-semibold text-dark transition-colors hover:bg-gold-light disabled:opacity-50"
          >
            {loading ? "Loading…" : "View Analytics"}
          </button>
        </div>
      </div>
    );
  }

  if (!stats) return <div className="p-8 text-center text-text-faint">No data yet.</div>;

  return (
    <div className="min-h-screen bg-cream-soft px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-8 font-display text-2xl text-text-body">Quiz Analytics Dashboard</h1>

        {/* KPI Cards */}
        <div className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: "Total Sessions", value: stats.totalSessions },
            { label: "Starts", value: stats.totalStarts },
            { label: "Completions", value: stats.totalCompletes },
            { label: "Completion Rate", value: `${stats.completionRate}%` },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-xl border border-cream-mid bg-cream p-5 text-center">
              <div className="font-display text-2xl text-gold">{kpi.value}</div>
              <div className="mt-1 text-xs text-text-faint">{kpi.label}</div>
            </div>
          ))}
        </div>

        {/* Drop-off Chart */}
        <div className="mb-10 rounded-xl border border-cream-mid bg-cream p-6">
          <h2 className="mb-4 font-display text-lg text-text-body">Drop-off Points</h2>
          {stats.dropOffData.length === 0 ? (
            <p className="text-sm text-text-faint">No drop-offs detected yet (all sessions completed).</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.dropOffData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(40 20% 85%)" />
                <XAxis dataKey="item" tick={{ fontSize: 11 }} angle={-45} textAnchor="end" height={80} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#c8962e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Scoville Gate Frequency */}
        <div className="mb-10 rounded-xl border border-cream-mid bg-cream p-6">
          <h2 className="mb-4 font-display text-lg text-text-body">Scoville Gate Triggers</h2>
          {stats.gateData.length === 0 ? (
            <p className="text-sm text-text-faint">No gates triggered yet.</p>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={stats.gateData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(40 20% 85%)" />
                <XAxis type="number" allowDecimals={false} />
                <YAxis dataKey="gate" type="category" width={120} tick={{ fontSize: 13 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#8b5e1a" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Primary Fire Distribution */}
        <div className="mb-10 rounded-xl border border-cream-mid bg-cream p-6">
          <h2 className="mb-4 font-display text-lg text-text-body">Primary Fire Distribution</h2>
          {stats.fireData.length === 0 ? (
            <p className="text-sm text-text-faint">No completions yet.</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={stats.fireData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                  {stats.fireData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}
