import { ComponentProps, ReactNode } from "react";
import {
  Link,
  Progress,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";

import BackgroundImage from "@/assets/flow-background.png";
import useCreateProfileFlow from "@/hooks/use-create-profile-flow";

type TFlowLayoutProps = ComponentProps<"div"> & {
  leftContent: ReactNode;
  rightContent: ReactNode;
  rightFooterContent?: ReactNode;
  totalSteps: number;
};

const logoURL = new URL("../assets/logos/sample-logo1.png", import.meta.url)
  .href;

const FlowLayout = ({
  leftContent,
  rightContent,
  rightFooterContent,
  totalSteps,
}: TFlowLayoutProps) => {
  const { currentStep } = useCreateProfileFlow();

  return (
    <div className="min-h-screen flex flex-col">
      <div
        className="absolute inset-0 bg-cover bg-center hidden md:block"
        style={{ backgroundImage: `url(${BackgroundImage})` }}
      />
      <div className="p-4 md:absolute bg-transparent z-20">
        <Link className="flex items-center" color="foreground" href="/">
          <div className="flex items-center ml-0 md:ml-[20px]">
            <img alt="logo" height="46px" src={logoURL} width="46px" />
            <p className="font-bold pl-2 text-foreground/80 text-xl hidden md:block">
              Sned
            </p>
          </div>
        </Link>
      </div>
      <div className="flex flex-grow w-full flex-col md:flex-row items-stretch md:items-center justify-center relative md:mt-0 px-4 md:px-8 md:py-8">
        <div className="w-full bg-background md:bg-background/70 md:backdrop-blur-sm md:rounded-[40px] md:shadow-2xl md:border md:border-gray-200 overflow-hidden">
          <div className="flex flex-col md:flex-row h-full">
            <div className="w-full md:w-2/5 flex flex-col justify-center md:p-8 bg-background md:bg-gradient-to-br md:from-gray-400 md:to-purple-100 md:h-[80vh] md:rounded-r-[40px]">
              <Progress
                showValueLabel
                aria-label="Sign up progress"
                className="my-3 md:my-2 block md:hidden"
                color="success"
                size="sm"
                value={33}
                valueLabel={`${currentStep} of ${totalSteps}`}
              />
              {leftContent}
            </div>
            <div className="w-full md:w-3/5 flex flex-col md:h-[80vh] relative md:mt-0 md:ml-[40px] md:flex-1">
              <Card className="w-full h-full border-0 overflow-hidden shadow-none p-0 flex flex-col bg-background md:bg-background/0 md:rounded-l-[40px]">
                <CardHeader className="md:mt-2 pb-0 md:pl-3 md:pr-8">
                  <Progress
                    showValueLabel
                    aria-label="Sign up progress"
                    className="hidden mb-6 md:block"
                    color="success"
                    size="sm"
                    value={Math.ceil((currentStep / totalSteps) * 100)}
                    valueLabel={`${currentStep} of ${totalSteps}`}
                  />
                </CardHeader>
                <CardBody className="flex-grow overflow-y-auto px-0 pt-0 pb-2 md:p-8 md:pt-0 md:pl-0 h-full">
                  {rightContent}
                </CardBody>
                {rightFooterContent && <Divider className="hidden md:block" />}
                {rightFooterContent && (
                  <CardFooter className="p-0 md:pl-3 md:pr-8 md:py-4">
                    {rightFooterContent}
                  </CardFooter>
                )}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlowLayout;
