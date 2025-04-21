import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { DashboardCard, EarningsChart, RecentActivities } from '../../components/dashboard';
import { FaWallet, FaTasks, FaMoneyBillWave, FaHistory } from 'react-icons/fa';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    balance: 0,
    totalEarned: 0,
    tasksCompleted: 0,
    pendingWithdrawals: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get('/dashboard');
        setStats(response.data);
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div className="loading">Loading dashboard...</div>;

  return (
    <div className="dashboard-container">
      <h1>Welcome back, {user?.username}!</h1>
      <p className="subtitle">Here's what's happening with your account today</p>

      <div className="stats-grid">
        <DashboardCard 
          icon={<FaWallet />}
          title="Current Balance"
          value={`$${stats.balance.toFixed(2)}`}
          color="#4361ee"
        />
        <DashboardCard 
          icon={<FaMoneyBillWave />}
          title="Total Earned"
          value={`$${stats.totalEarned.toFixed(2)}`}
          color="#4cc9f0"
        />
        <DashboardCard 
          icon={<FaTasks />}
          title="Tasks Completed"
          value={stats.tasksCompleted}
          color="#3a0ca3"
        />
        <DashboardCard 
          icon={<FaHistory />}
          title="Pending Withdrawals"
          value={`$${stats.pendingWithdrawals.toFixed(2)}`}
          color="#f72585"
        />
      </div>

      <div className="dashboard-content">
        <div className="chart-section">
          <h2>Earnings Overview</h2>
          <EarningsChart />
        </div>
        
        <div className="activities-section">
          <h2>Recent Activities</h2>
          <RecentActivities />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;