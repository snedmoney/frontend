import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const useShareModal = () => {
  const navigate = useNavigate();

  const openShareModal = useCallback(() => {
    const searchParams = new URLSearchParams(window.location.search);

    searchParams.set("openShareModal", "true");
    navigate({ search: searchParams.toString() }, { replace: true });
  }, [navigate]);

  return openShareModal;
};

export default useShareModal;
