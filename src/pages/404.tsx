import { Link } from "@nextui-org/link";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const logoURL = new URL("../assets/logos/sample-logo1.png", import.meta.url)
  .href;

const NotFound404 = () => {
  const navigate = useNavigate();
  const flyingAnimation = {
    y: [0, -25, 0],
    rotate: [0, 10, -10, 0],
    transition: {
      duration: 3,
      ease: "easeInOut",
      times: [0, 0.5, 1],
      repeat: Infinity,
    },
  };
  return (
    <>
      <div className="p-4 md:absolute bg-transparent z-20">
        <Link className="flex items-center" color="foreground" href="/">
          <div className="flex items-center ml-0 md:ml-[20px]">
            <img src={logoURL} height="52px" width="52px" />
            <p className="font-bold pl-2 text-foreground/80 text-3xl hidden md:block">
              Sned
            </p>
          </div>
        </Link>
      </div>
      <div className="bg-background h-screen flex justify-center items-center">
        <div className="flex flex-col items-center justify-center gap-8">
          <motion.svg
            animate={flyingAnimation}
            width={200}
            height={200}
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
            style={{ color: "#ccccff" }}
          >
            <motion.path
              d="M91.235 393.964c24.724.878 106.592 1.956 97.278-18.532-9.232-20.315 6.641-24.062 37.803-25.043-24.955-40.408-39.955-86.362-55.981-95.386-41.776-23.504-92.688-65.236-127.008-95.118-23.266-20.256-40.772-27.912-38.906-35.072 1.219-4.683 28.046 10.036 55.535 23.684 41.612 20.665 102.426 53.826 111.134 43.53-4.683-48.042 11.815-185.249 18.416-167 6.605 18.249-2.342 111.97 35.361 183.257 25.006 47.284 105.09 84.213 89.822 59.579-15.264-24.642 5.612-39.338 18.96-52.904 13.35-13.566-10.886-106.12-25.798-153.909-14.912-47.782 12.094-13.38 12.094-13.38s8.663 6.4 79.998 87.997c70.48 80.341 72.137 104.173 29.819 129.804-46.611 28.232-41.538 56.308 1.561 61.348 43.099 5.04 49.96 41.5 72.498 46.793 19.951 4.684-1.494 15.626-16.547 17.892-15.053 2.268-40.828 10.012-59.642 12.852-17.004 2.564-52.283 19.892-114.036 9.515-2.439-7.463-2.621-14.25-2.509-20.085-10.511 8.593-14.726 21.542-13.19 37.583 4.356 45.537 1.854 69.272-114.561 50.28-73.625-12.012-143.268-55.521-168.565-72.075C-16.432 389.474-1.639 390.663 91.235 393.964z"
              fill="currentColor"
            />
          </motion.svg>
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="text-foreground-500 text-4xl">
              <div>4 0 4</div>
            </div>
            <div className="text-foreground-500 text-2xl text-center">
              Sorry, We couldn't find what you are looking for!
            </div>
          </div>
          <div className="flex justify-center gap-8 w-full">
            <button
              onClick={() => navigate(-1)}
              className="text-foreground-500 text-xl bg-default-200 p-3 rounded-lg hover:shadow-md transition duration-300 ease-in-out"
            >
              Go back
            </button>
            <a
              href="/"
              className="text-background text-xl bg-foreground p-3 rounded-lg hover:shadow-md transition duration-300 ease-in-out"
            >
              Go Home
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound404;
