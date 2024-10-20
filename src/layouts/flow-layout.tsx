import { ComponentProps, ReactNode } from "react";

type TFlowLayoutProps = ComponentProps<"div"> & {
  leftContent: ReactNode;
  rightContent: ReactNode;
};

const FlowLayout = ({ leftContent, rightContent }: TFlowLayoutProps) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 basis-2/5 flex flex-col justify-center p-8">
        {leftContent}
      </div>
      <div className="flex-1 basis-3/5 bg-white p-8 flex flex-col justify-center shadow-lg rounded-ss-[60px]">
        {rightContent}
      </div>
    </div>
  );
};

export default FlowLayout;
