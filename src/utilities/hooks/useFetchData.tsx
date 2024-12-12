import { useEffect, useState } from "react";



// because of token repeating and same process I made this Custom Hook

const useFetchData = (url: string) => {
  const uri = import.meta.env.VITE_API_URL;

  const [fetchedData, setFetchedData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token") || "";

    fetch(`${uri}${url}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setFetchedData(data);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, [uri, url]);

  return fetchedData;
};

export default useFetchData;
