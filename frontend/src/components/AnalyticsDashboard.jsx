import {
  useEffect,
  useState
} from "react";

import API from "../services/api";

import {
  Pie
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function AnalyticsDashboard() {

  const [stats, setStats] = useState(null);

  const fetchAnalytics = async () => {

    try {

      const response = await API.get(
        "/admin/analytics",
        {
          headers: {
            Authorization:
              `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      console.log(response.data);

      setStats(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (!stats) {

    return (
      <h1 className="p-10 text-2xl">
        Loading Analytics...
      </h1>
    );
  }

  const chartData = {

    labels: [
      "Approved",
      "Rejected",
      "Pending"
    ],

    datasets: [
      {
        data: [
          stats.approvedDocuments,
          stats.rejectedDocuments,
          stats.pendingDocuments
        ]
      }
    ]
  };

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold text-purple-600 mb-10">
        Manager Dashboard
      </h1>

      <div className="grid grid-cols-2 gap-6 mb-10">

        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-xl font-bold">
            Total Users
          </h2>

          <p className="text-5xl mt-4">
            {stats.totalUsers}
          </p>

        </div>

        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-xl font-bold">
            Total Documents
          </h2>

          <p className="text-5xl mt-4">
            {stats.totalDocuments}
          </p>

        </div>

        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-xl font-bold text-green-600">
            Approved
          </h2>

          <p className="text-5xl mt-4">
            {stats.approvedDocuments}
          </p>

        </div>

        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-xl font-bold text-red-600">
            Rejected
          </h2>

          <p className="text-5xl mt-4">
            {stats.rejectedDocuments}
          </p>

        </div>

      </div>

      <div className="bg-white p-10 rounded-xl shadow w-[500px]">

        <Pie data={chartData} />

      </div>

    </div>
  );
}

export default AnalyticsDashboard;