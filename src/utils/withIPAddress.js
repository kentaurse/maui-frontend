import { useState, useEffect } from "react";

function WithIPAddress() {
  const [loading, setLoading] = useState(true);
  const [ipAddress, setIpAddress] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetch('https://api.ipify.org?format=json&callback=?');
        const json = await data.json();

        if (json) {
          setLoading(false);
          setIpAddress(json.ip);
        }
      } catch (error) {
        console.log('error', error);
        setLoading(false);
        setError(error.message);
      }

      setLoading(false);
    }

    fetchData();
  }, []);

  return {
    error,
    loading,
    ipAddress
  };
}

export default WithIPAddress;
