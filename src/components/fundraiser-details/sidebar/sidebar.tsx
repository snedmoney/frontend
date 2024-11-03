import { FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Input, Textarea } from "@nextui-org/react";
import { useState, ChangeEvent } from "react";

import SidebarHeader from "./header";

import PaymentWidgetMobile from "@/components/paymentWidget/payment-widget-mobile";
import PaymentWidget from "@/components/paymentWidget/payment-widget";
import DonationList from "@/components/donation-list";
import { FundraiserData, TransactionDataType } from "@/types";

type SidebarProps = Pick<FundraiserData, "goalAmount" | "destinationToken"> & {
  destinationWalletAddress: string;
  destinationChainId: number;
  linkId: string;
  transactions?: TransactionDataType[];
};

const Sidebar = ({
  goalAmount,
  destinationToken,
  destinationWalletAddress,
  destinationChainId,
  linkId,
  transactions,
}: SidebarProps) => {
  const [input, setInput] = useState("");
  const [textArea, setTextArea] = useState("");
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  const handleTextAreaChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTextArea(e.target.value);
  };
  const bodyContent = (
    <div className="flex flex-col gap-6 mt-2 lg:mt-6">
      <Input
        isClearable
        placeholder="Your name or leave it blank 🥲"
        radius="sm"
        value={input}
        variant="bordered"
        onChange={handleInputChange}
        onClear={() => setInput("")}
      />
      <Textarea
        minRows={6}
        placeholder="Leave a message for Joe..."
        value={textArea}
        variant="bordered"
        onChange={handleTextAreaChange}
      />
    </div>
  );

  return (
    <div className="[grid-area:sidebar] lg:ml-6 lg:mt-6">
      <PaymentWidgetMobile
        bodyContent={bodyContent}
        className="lg:hidden"
        destinationChainId={destinationChainId}
        destinationWalletAddress={destinationWalletAddress}
        headerContent={
          <SidebarHeader
            goalAmount={goalAmount}
            logoURI={destinationToken.logoURI}
            totalDonations={transactions?.length}
          />
        }
        linkId={linkId}
        message={textArea}
        name={input}
        transactionType="donation"
      />
      <div className="sticky top-[70px] hidden lg:block">
        <PaymentWidget
          bodyContent={bodyContent}
          destinationChainId={destinationChainId}
          destinationWalletAddress={destinationWalletAddress}
          footerContent={
            transactions && transactions.length > 0 ? (
              <DonationList transactions={transactions} />
            ) : null
          }
          headerContent={
            <SidebarHeader
              goalAmount={goalAmount}
              logoURI={destinationToken.logoURI}
              totalDonations={transactions?.length}
            />
          }
          linkId={linkId}
          message={textArea}
          name={input}
          transactionType="donation"
        />
        <Link
          className="text-primary font-bold flex items-center mt-4"
          to="/create/fundraiser"
        >
          Create your donation <FiChevronRight size={22} />
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
