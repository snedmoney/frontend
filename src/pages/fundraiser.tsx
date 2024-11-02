import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import CTA from "@/components/cta";
import FundraiserDetails from "@/components/fundraiser-details";
import useGetLink from "@/hooks/use-get-link";

const FundraiserPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading } = useGetLink(id);

  useEffect(() => {
    if (!id) {
      navigate("/404", { replace: true });
    }
  }, [id, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="container mx-auto px-4">
      {data && (
        <>
          <FundraiserDetails data={data} />
          <CTA />
        </>
      )}
    </div>
  );
};

export default FundraiserPage;