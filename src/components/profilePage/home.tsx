import { Input, Textarea, Divider } from "@nextui-org/react";
import { ChangeEvent, useState } from "react";

import PaymentWidget from "../paymentWidget/payment-widget";

import SupportMessage from "./support-message";

const Home = () => {
  const [input, setInput] = useState("");
  const [textArea, setTextArea] = useState("");
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  const handleTextAreaChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTextArea(e.target.value);
  };

  //TODO: onclick needs to make sure transaction is a success to send comment to backend
  const headerContent = (
    <div className="text-lg md:text-xl font-semibold">
      Support Joe by sending a tip 👏
    </div>
  );
  const bodyContent = (
    <div className="flex flex-col gap-4 mt-6">
      <Input
        isClearable
        placeholder="You name or leave it blank 🥲"
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
    <div className="mt-0 md:mt-4">
      <div className="flex justify-center">
        <PaymentWidget
          bodyContent={bodyContent}
          handleClick={() => {}}
          headerContent={headerContent}
        />
      </div>
      <Divider className="my-4 md:my-8" />
      <h2 className="text-lg mb-4 md:text-xl font-semibold md:mb-8">
        Recent Supports
      </h2>
      <div className="flex flex-col gap-6 md:pl-1">
        <SupportMessage message="ty so much keep up the good work ty so much keep up the good work ty so much keep up the good work ty so much keep up the good work ty so much keep up the good work ty so much keep up the good workty so much keep up the good workty so much" />
        <SupportMessage
          imageSrc="https://i.pravatar.cc/150?u=a042581f4e29026024d"
          initialReply="Thank you!"
          message="Great job everyone!"
          name="Alex"
        />
        <SupportMessage name="Emma" />
        <SupportMessage initialReply="Thank you so much!" name="Tom" />
      </div>
    </div>
  );
};

export default Home;
