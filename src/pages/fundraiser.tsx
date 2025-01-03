import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import CTA from "@/components/cta";
import FundraiserDetails from "@/components/fundraiser-details";
import useGetLink from "@/hooks/use-get-link";
import { SnedBirdIcon } from "@/components/sned-bird-icon";

const FundraiserPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: fundraiser, isLoading, isError } = useGetLink(id);

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

  if (isError) {
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center gap-3">
        <SnedBirdIcon />
        <h3>Oops, there&apos;s no user with the linkID {id}</h3>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      {fundraiser && (
        <>
          <FundraiserDetails data={fundraiser} />
          <CTA />
        </>
      )}
    </div>
  );
};

export default FundraiserPage;
