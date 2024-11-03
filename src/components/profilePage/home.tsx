import { Input, Textarea, Divider } from "@nextui-org/react";
import { ChangeEvent, useMemo, useState } from "react";

import PaymentWidget from "../paymentWidget/payment-widget";

import SupportMessage from "./support-message";

import useGetProfileByUsername from "@/hooks/use-get-profile-by-username";
import { useParams } from "react-router-dom";
import useGetProfileLinks from "@/hooks/use-get-profile-links";

const Home = () => {
  const [input, setInput] = useState("");
  const [textArea, setTextArea] = useState("");
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  const handleTextAreaChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTextArea(e.target.value);
  };
  const { username } = useParams();

  const { data } = useGetProfileByUsername(username);
  const destinationWalletAddress = useMemo(() => {
    if (!data?.user) return "";

    return data.user.wallets[0].address;
  }, [data?.user]);

  // Get the user's profile link, this is to get the linkId to be passed to POST transactions when we are making a transaction
  const { data: links } = useGetProfileLinks(destinationWalletAddress);

  const destinationChainId = useMemo(() => {
    if (!data?.user || !data.user.paymentMethods.length) return;

    return data.user.paymentMethods[0].chain?.id;
  }, [data?.user]);

  const destinationLinkId = useMemo(() => {
    const profileLink = links?.find((link) => link.type === "profile");

    return profileLink?.id;
  }, [links]);

  //TODO: onclick needs to make sure transaction is a success to send comment to backend
  const headerContent = (
    <div className="text-lg md:text-xl font-semibold">
      Support {data?.user.userName} by sending a tip 👏
    </div>
  );
  const bodyContent = (
    <div className="flex flex-col gap-6 mt-6">
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
        placeholder={`Leave a message for ${data?.user.userName}...`}
        value={textArea}
        variant="bordered"
        onChange={handleTextAreaChange}
      />
    </div>
  );

  return (
    <>
      <div className="flex justify-center">
        <PaymentWidget
          bodyContent={bodyContent}
          destinationChainId={destinationChainId}
          destinationWalletAddress={destinationWalletAddress}
          handleClick={() => {}}
          headerContent={headerContent}
          message={textArea}
          name={input}
          linkId={destinationLinkId}
        />
      </div>
      <Divider className="my-4 md:my-8" />
      <h2 className="text-lg mb-4 md:text-xl font-semibold md:mb-8">
        Recent Supports
      </h2>
      <div className="flex flex-col gap-6 md:pl-1">
        <SupportMessage message="ty so much keep up the good work!" />
        <SupportMessage
          imageSrc="https://i.pravatar.cc/150?u=a042581f4e29026024d"
          initialReply="Thank you!"
          message="Great job everyone!"
          name="Alex"
        />
        <SupportMessage name="Emma" />
        <SupportMessage initialReply="Thank you so much!" name="Tom" />
      </div>
    </>
  );
};

export default Home;