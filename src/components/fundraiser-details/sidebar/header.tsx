import { Progress } from "@nextui-org/progress";

type SidebarHeaderProps = {
  goalAmount: number;
  logoURI: string;
};

const SidebarHeader = ({ goalAmount, logoURI }: SidebarHeaderProps) => {
  return (
    <div className="w-full my-4 lg:my-0">
      <div className="flex items-baseline gap-1 mb-2">
        <span className="text-2xl inline-flex items-center gap-1">
          <img alt="logo" className="w-5 h-5" src={logoURI} />
          6000
        </span>
        <span className="inline-flex items-center gap-1">
          raised of{" "}
          <span className="inline-flex items-center gap-1">
            <img alt="logo" className="w-4 h-4" src={logoURI} />
            {goalAmount}
          </span>{" "}
          goal
        </span>
      </div>
      <Progress aria-label="Loading..." color="success" size="sm" value={60} />
      <p className="mt-2">23 donations</p>
    </div>
  );
};

export default SidebarHeader;