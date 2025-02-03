export const getIpData = async () => {
  try {
    const response = await fetch("http://127.0.0.1:1234/api/ip-info");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was an error with the fetch operation:", error);
    return null;
  }
};
