import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Snippet,
} from "@nextui-org/react";
import { FaFacebook, FaFacebookMessenger } from "react-icons/fa6";
import {
  AiFillTwitterCircle,
  AiFillInstagram,
  AiFillTikTok,
} from "react-icons/ai";
import {
  IoLogoWhatsapp,
  IoShareSocialOutline,
  IoRocket,
  IoLogoYoutube,
} from "react-icons/io5";
import { Link } from "@nextui-org/link";
import { PiQrCodeFill } from "react-icons/pi";
import { TbCodeCircle2Filled } from "react-icons/tb";
import { MdEmail } from "react-icons/md";

type ShareModalProps = {
  title?: string;
  triggerButton?: React.ReactNode;
};

const ShareModal = ({ title, triggerButton }: ShareModalProps) => {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();

  return (
    <>
      {triggerButton ? (
        <div onClick={onOpen}>{triggerButton}</div>
      ) : (
        <Button
          color="default"
          endContent={<IoShareSocialOutline />}
          variant="shadow"
          onPress={onOpen}
        >
          Share
        </Button>
      )}
      <Modal
        className="mx-0 my-0 rounded-b-none sm:rounded-b-lg"
        classNames={{
          base: "h-[87dvh] sm:h-auto",
        }}
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <ModalHeader className=" text-default-400 bg-gradient-to-tr from-[#CCC2FF] to-white text-center">
            <p className="text-xl sm:text-2xl font-bold">
              {title || "Share with your community for greater reach 💜"}
            </p>
          </ModalHeader>
          <ModalBody className="text-default-600 py-4 gap-4">
            <div className="flex flex-col gap-4">
              <p className="text-sm sm:text-md font-bold">
                Choose your favorite way to share
              </p>
              <div className="grid grid-cols-4 gap-4 md:grid-cols-2 justify-start">
                <Link
                  isExternal
                  className="cursor-pointer flex flex-col sm:flex-row gap-2 items-center"
                  color="foreground"
                >
                  <Button isIconOnly className="rounded-full " variant="light">
                    <FaFacebook size="24" />
                  </Button>
                  <p className="text-xs">Facebook</p>
                </Link>
                <Link
                  isExternal
                  className="cursor-pointer flex flex-col sm:flex-row gap-2 items-center"
                  color="foreground"
                >
                  <Button isIconOnly className="rounded-full " variant="light">
                    <AiFillInstagram size="26" />
                  </Button>
                  <p className="text-xs">Instagram</p>
                </Link>
                <Link
                  isExternal
                  className="cursor-pointer flex flex-col sm:flex-row gap-2 items-center"
                  color="foreground"
                >
                  <Button isIconOnly className="rounded-full " variant="light">
                    <AiFillTwitterCircle size="26" />
                  </Button>
                  <p className="text-xs">Twitter</p>
                </Link>
                <Link
                  isExternal
                  className="cursor-pointer flex flex-col sm:flex-row gap-2 items-center"
                  color="foreground"
                >
                  <Button isIconOnly className="rounded-full " variant="light">
                    <FaFacebookMessenger size="24" />
                  </Button>
                  <p className="text-xs">Messenger</p>
                </Link>
                <Link
                  isExternal
                  className="cursor-pointer flex flex-col sm:flex-row gap-2 items-center"
                  color="foreground"
                >
                  <Button isIconOnly className="rounded-full " variant="light">
                    <IoLogoWhatsapp size="24" />
                  </Button>
                  <p className="text-xs">WhatsApp</p>
                </Link>
                <div
                  className="cursor-pointer flex flex-col sm:flex-row gap-2 items-center"
                  color="foreground"
                >
                  <Button isIconOnly className="rounded-full " variant="light">
                    <PiQrCodeFill size="24" />
                  </Button>
                  <p className="text-xs">QR Code</p>
                </div>
                <Link
                  isExternal
                  className="cursor-pointer flex flex-col sm:flex-row gap-2 items-center"
                  color="foreground"
                >
                  <Button isIconOnly className="rounded-full " variant="light">
                    <MdEmail size="28" />
                  </Button>
                  <p className="text-xs">Email</p>
                </Link>
                <div
                  className="cursor-pointer flex flex-col sm:flex-row gap-2 items-center"
                  color="foreground"
                >
                  <Button isIconOnly className="rounded-full " variant="light">
                    <TbCodeCircle2Filled size="28" />
                  </Button>
                  <p className="text-xs">Widget</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm sm:text-md font-bold">Page link</p>
              <Snippet
                className="my-2 bg-default-100/80 border-1 border-secondary text-sm"
                color="default"
                symbol="🔗"
                variant="bordered"
              >
                Quick Share link
              </Snippet>
            </div>
            <div className="bg-default-100/80 flex flex-col gap-1 p-2 rounded-large border-1 border-secondary text-center text-sm w-10/12 m-auto my-0 shadow-md">
              <p className="flex items-center gap-1 justify-center">
                <IoRocket size="16" />
                Add this link to your social profiles
              </p>
              <div className="flex gap-4 justify-center items-center">
                <AiFillTikTok size="24" />
                <FaFacebook size="20" />
                <AiFillInstagram size="24" />
                <IoLogoYoutube size="24" />
                <AiFillTwitterCircle size="24" />
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ShareModal;
