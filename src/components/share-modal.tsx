import { Modal, ModalContent, ModalHeader, ModalBody, Button, Snippet, Chip } from "@nextui-org/react";
import { FaFacebook, FaFacebookMessenger, } from "react-icons/fa6";
import { AiFillTwitterCircle, AiFillInstagram, AiFillTikTok } from "react-icons/ai";
import { IoLogoWhatsapp, IoRocket, IoLogoYoutube } from "react-icons/io5";
import { Link } from "@nextui-org/link";
import { PiQrCodeFill } from "react-icons/pi";
import { TbCodeCircle2Filled } from "react-icons/tb";
import { MdEmail } from "react-icons/md";
import { useEffect, useCallback } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

type ShareModalProps = {
  title?: string;
};

const ShareModal = ({ title }: ShareModalProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const getBaseUrl = () => {
    const { host, pathname } = window.location;
    return `${host}${pathname}`;
  };

  const searchParams = new URLSearchParams(location.search);
  const isOpen = searchParams.get('openShareModal') === 'true';

  const clearQueryParam = useCallback(() => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('openShareModal');
    navigate({ search: newSearchParams.toString() }, { replace: true });
  }, [navigate, searchParams]);

  const handleClose = useCallback(() => {
    clearQueryParam();
  }, [clearQueryParam]);

  useEffect(() => {
    if (searchParams.get('openShareModal') !== null && searchParams.get('openShareModal') !== 'true') {
      clearQueryParam();
    }
  }, [searchParams, clearQueryParam]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        classNames={{
          base: "h-[calc(100dvh-88px)] sm:h-auto"
        }}
        className="mx-0 my-0 rounded-b-none sm:rounded-b-lg"
        portalContainer={document.body}
      >
        <ModalContent>
          <ModalHeader className=" text-default-400 bg-gradient-to-tr from-[#CCC2FF] to-white text-center">
            <p className='text-xl sm:text-2xl font-bold'>{title || 'Share with your community for greater reach 💜'}</p>
          </ModalHeader>
          <ModalBody className='text-default-600 py-4 gap-4'>
            <div className="flex flex-col gap-4">
              <>
                <div className='flex gap-2 items-center'>
                  <p className='text-sm sm:text-md font-bold'>Choose your favorite way to share</p>
                  <Chip color='primary' variant='flat' className='text-default-600' size='sm' classNames={{ content: 'font-bold' }}>Coming soon</Chip>
                </div>
                <div className="grid grid-cols-4 gap-4 sm:grid-cols-3 lg:grid-cols-2 justify-start opacity-30 pointer-events-none">
                  <Link color='foreground' isExternal className="cursor-pointer flex flex-col sm:flex-row gap-2 items-center">
                    <Button variant='light' isIconOnly className="rounded-full ">
                      <FaFacebook size="24" />
                    </Button>
                    <p className="text-xs">Facebook</p>
                  </Link>
                  <Link color='foreground' isExternal className="cursor-pointer flex flex-col sm:flex-row gap-2 items-center">
                    <Button variant='light' isIconOnly className="rounded-full ">
                      <AiFillInstagram size="26" />
                    </Button>
                    <p className="text-xs">Instagram</p>
                  </Link>
                  <Link color='foreground' isExternal className="cursor-pointer flex flex-col sm:flex-row gap-2 items-center">
                    <Button variant='light' isIconOnly className="rounded-full ">
                      <AiFillTwitterCircle size="26" />
                    </Button>
                    <p className="text-xs">Twitter</p>
                  </Link>
                  <Link color='foreground' isExternal className="cursor-pointer flex flex-col sm:flex-row gap-2 items-center">
                    <Button variant='light' isIconOnly className="rounded-full ">
                      <FaFacebookMessenger size="24" />
                    </Button>
                    <p className="text-xs">Messenger</p>
                  </Link>
                  <Link color='foreground' isExternal className="cursor-pointer flex flex-col sm:flex-row gap-2 items-center">
                    <Button variant='light' isIconOnly className="rounded-full ">
                      <IoLogoWhatsapp size="24" />
                    </Button>
                    <p className="text-xs">WhatsApp</p>
                  </Link>
                  <div color='foreground' className="cursor-pointer flex flex-col sm:flex-row gap-2 items-center" onClick={() => { }}>
                    <Button variant='light' isIconOnly className="rounded-full ">
                      <PiQrCodeFill size="24" />
                    </Button>
                    <p className="text-xs text-foreground">QR Code</p>
                  </div>
                  <Link color='foreground' isExternal className="cursor-pointer flex flex-col sm:flex-row gap-2 items-center">
                    <Button variant='light' isIconOnly className="rounded-full ">
                      <MdEmail size="28" />
                    </Button>
                    <p className="text-xs">Email</p>
                  </Link>
                  <div color='foreground' className="cursor-pointer flex flex-col sm:flex-row gap-2 items-center" onClick={() => { }}>
                    <Button variant='light' isIconOnly className="rounded-full ">
                      <TbCodeCircle2Filled size="28" />
                    </Button>
                    <p className="text-xs text-foreground">Widget</p>
                  </div>
                </div>
              </>
            </div>
            <div className="flex flex-col gap-1">
              <p className='text-sm sm:text-md font-bold'>Page link</p>
              <Snippet variant="bordered" color="default" symbol="🔗" className='my-2 bg-default-100/80 border-1 border-secondary text-sm [&>pre]:whitespace-normal'>{getBaseUrl()}</Snippet>
            </div>
            <div className='bg-default-100/80 flex flex-col gap-1 p-2 rounded-large border-1 border-secondary text-center text-sm w-10/12 m-auto my-0 shadow-md'>
              <p className='flex items-center gap-1 justify-center'><IoRocket size='16'></IoRocket>Add this link to your social profiles</p>
              <div className='flex gap-4 justify-center items-center'>
                <AiFillTikTok size='24' />
                <FaFacebook size="20" />
                <AiFillInstagram size="24" />
                <IoLogoYoutube size='24' />
                <AiFillTwitterCircle size="24" />
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ShareModal;