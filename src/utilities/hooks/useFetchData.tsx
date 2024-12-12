import { useEffect, useState } from "react";



// because of token repeating and same process I made this Custom Hook


interface IResult{
  result:any
}

const useFetchData = (url: string) => {
  const uri = import.meta.env.VITE_API_URL;

  const [fetchedData, setFetchedData] = useState<IResult | null>(null);

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

  return fetchedData?.result;
};

export default useFetchData;
