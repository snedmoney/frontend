import { Link } from "@nextui-org/link";
import { useNavigate } from "react-router-dom";
import { SnedBirdIcon } from "@/components/sned-bird-icon";
import { useConnectModal } from "@rainbow-me/rainbowkit";

const logoURL = new URL("../assets/logos/sample-logo1.png", import.meta.url).href;

const NotFound404 = ({ message, showConnectButton = false }: { message?: string, showConnectButton?: boolean }) => {
  const navigate = useNavigate();
  const { openConnectModal } = useConnectModal();

  return (
    <>
      <div className="p-4 md:absolute bg-transparent z-20">
        <Link className="flex items-center" color="foreground" href="/">
          <div className="flex items-center ml-0 md:ml-[20px]">
            <img src={logoURL} height="52px" width="52px" alt="Logo" />
            <p className="font-bold pl-2 text-foreground/80 text-3xl hidden md:block">
              Sned
            </p>
          </div>
        </Link>
      </div>
      <div className="bg-background h-screen flex justify-center items-center">
        <div className="flex flex-col items-center justify-center gap-8">
          <SnedBirdIcon />
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="text-foreground-500 text-4xl">
              <div>4 0 4</div>
            </div>
            <div className="text-foreground-500 text-2xl text-center">
              Sorry, We couldn't find what you are looking for!
            </div>
            {message && (
              <div className="text-foreground-500 text-2xl text-center">
                {message}
              </div>
            )}
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 w-full">
            {!showConnectButton && (
              <button
                onClick={() => navigate(-1)}
                className="text-foreground-500 text-xl bg-default-200 p-3 rounded-lg hover:shadow-md transition duration-300 ease-in-out"
              >
                Go back
              </button>
            )}
            <a
              href="/"
              className="text-background text-xl bg-foreground p-3 rounded-lg hover:shadow-md transition duration-300 ease-in-out text-center"
            >
              Go Home
            </a>
            {showConnectButton && (
              <button
                onClick={openConnectModal}
                className="text-background text-xl bg-primary p-3 rounded-lg hover:shadow-md transition duration-300 ease-in-out"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound404;