import { SnedBirdIcon } from "@/components/sned-bird-icon";
import { Spinner } from "@nextui-org/react";

type LoadingPageProps = {
  message?: string;
};

const LoadingPage = ({ message }: LoadingPageProps) => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-3">
      <SnedBirdIcon />
      {message && <h3>{message}</h3>}
    </div>
  );
};

export default LoadingPage;
