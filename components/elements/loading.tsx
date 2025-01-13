import { CircularProgress } from "@mui/material";
import { useLoadingContext } from "../context/loading_context";
import { useEffect } from "react";

export default function LoadingComponent() {
  const { loading, setLoading } = useLoadingContext();

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 15000);

      clearTimeout(timer);
    }
  }, []);

  if (loading) {
    return (
      <>
        <CircularProgress className="loader" />
      </>
    );
  }
}
