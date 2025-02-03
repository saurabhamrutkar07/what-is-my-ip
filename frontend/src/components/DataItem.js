// src/components/Dashboard.js
import React, { useEffect, useState } from "react";
import { getIpData } from "../api";
import DataItem from "./DataItem";

function Dashboard() {
  const [ipData, setIpData] = useState({
    public_ip: "Loading...",
    local_ip: "Loading...",
    location: "Loading...",
  });

  useEffect(() => {
    // Fetch data from the "API"
    getIpData().then((data) => {
      setIpData(data);
    });
  }, []);

  return (
    <div className="dashboard-container">
      <div className="header">
        <h1>IP & Location Dashboard</h1>
        <p>Your technical details at a glance.</p>
      </div>
      <div className="card">
        <DataItem
          icon="fas fa-globe"
          label="Public IP"
          value={ipData.public_ip}
        />
        <hr />
        <DataItem
          icon="fas fa-network-wired"
          label="Local IP"
          value={ipData.local_ip}
        />
        <hr />
        <DataItem
          icon="fas fa-map-marker-alt"
          label="Location"
          value={ipData.location}
        />
      </div>
      <footer>&copy; 2025 Tech Solutions Inc.</footer>
    </div>
  );
}

export default Dashboard;
