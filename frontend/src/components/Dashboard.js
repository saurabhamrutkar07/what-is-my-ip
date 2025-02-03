import React, { useEffect, useState } from "react";
import { getIpData } from "../api";
import "./Dashboard.css";

function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const ipData = await getIpData();
        if (ipData) {
          setData(ipData);
        } else {
          setError("Unable to fetch IP data");
        }
      } catch (err) {
        setError("An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);
  console.log("This is api data ", data);
  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="card">
          <div className="header">
            <h1>Loading...</h1>
            <p>Fetching your IP information</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="card">
          <div className="header">
            <h1>Error</h1>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="card">
        <div className="header">
          <h1>IP Dashboard</h1>
          <p>Your current connection details</p>
        </div>

        <div className="data-item">
          <div className="data-icon globe-icon"></div>
          <div className="data-details">
            <div className="data-label">Local IP Address</div>
            <div className="data-value">{data?.local_ip}</div>
          </div>
        </div>

        <hr />

        <div className="data-item">
          <div className="data-icon location-icon"></div>
          <div className="data-details">
            <div className="data-label">Location</div>
            <div className="data-value">{`${data?.location?.address}`}</div>
          </div>
        </div>

        <hr />

        <div className="data-item">
          <div className="data-icon wifi-icon"></div>
          <div className="data-details">
            <div className="data-label">Public Ip Address</div>
            <div className="data-value">{data?.public_ip}</div>
          </div>
        </div>

        <footer>
          <span className="info-icon"></span>
          Data refreshes automatically every session
        </footer>
      </div>
    </div>
  );
}

export default Dashboard;
