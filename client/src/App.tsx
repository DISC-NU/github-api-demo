import { useState } from "react";
import axios from "axios";
import { GitHubStats } from "@/lib/types";
import GitHubReceipt from "@/components/GithubReceipt";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function App() {
  const [username, setUsername] = useState("");
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchGitHubStats = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get<GitHubStats>(
        `http://localhost:5001/api/github/${username}`
      );
      setStats(response.data);
    } catch (err) {
      setError("Error fetching GitHub data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4 mb-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">GitHub Receipt</h1>
          <p className="text-gray-500">
            Generate a receipt-style summary of your GitHub profile
          </p>
          <p className="text-sm text-gray-400">
            made by{" "}
            <a href="https://ethan-pineda.vercel.app/" className="underline">
              ethan pineda
            </a>{" "}
          </p>
        </div>
        <div className="flex space-x-2">
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter GitHub username"
            className="flex-1"
          />
          <Button
            onClick={fetchGitHubStats}
            disabled={loading || !username}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8"
          >
            {loading ? "Loading..." : "Generate"}
          </Button>
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}
      </div>

      {stats && <GitHubReceipt data={stats} />}
    </div>
  );
}
