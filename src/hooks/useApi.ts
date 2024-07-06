import axios from "axios";
import { useEffect, useState } from "react";

interface ApiResponse<T> {
  data: T | null;
  error: null | string;
}

const useApi = <T>(url: string) => {
  const [data, setData] = useState<ApiResponse<T>>({ data: null, error: null });

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setData({ data: response.data, error: null });
      })
      .catch((error) => {
        setData({ data: null, error: error.message });
      });
  }, [url]);

  return data;
};

export default useApi;
