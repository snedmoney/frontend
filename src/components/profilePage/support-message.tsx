import { Avatar, Button, Input } from '@nextui-org/react';
import { useRef, useState, FocusEvent, FormEvent } from 'react';
import { TbMessagePlus } from "react-icons/tb";
import { RiSendPlaneFill } from "react-icons/ri";

type SupportMessageProps = {
  name?: string;
  message?: string;
  initialReply?: string;
  imageSrc?: string;
}

const SupportMessage = ({ name = 'Anonymous', message, initialReply = '', imageSrc = '' }: SupportMessageProps) => {
  const [replyText, setReplyText] = useState('');
  const [replied, setReplied] = useState(initialReply);
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const replyFormRef = useRef<HTMLFormElement>(null);

  const handleReplySubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (replyText.trim()) {
      setReplied(replyText);
      setReplyText('');
      setIsReplying(false);
      // Here you would typically send the reply to your backend
    }
  };

  const handleBlur = (e: FocusEvent<HTMLFormElement>) => {
    if (replyFormRef.current && !replyFormRef.current.contains(e.relatedTarget as Node)) {
      setIsReplying(false);
    }
  };

  return (
    <div className="flex items-start gap-4 md:gap-6">
      <Avatar
        isBordered
        radius="full"
        showFallback
        color='default'
        name={name.charAt(0)}
        src={imageSrc}
        className='h-[24px] w-[24px] md:h-[38px] md:w-[38px] shrink-0'
      />
      <div className="flex-grow">
        <div className="flex items-center justify-between">
          <h3 className="text-foreground text-sm md:text-md font-semibold">{name} sent a tip! 🥳</h3>
          {!replied && !isReplying && (
            <button
              onClick={() => setIsReplying(true)}
              className="text-primary hover:text-primary-dark ml-2"
              aria-label="Reply"
            >
              <TbMessagePlus className='w-[16px] h-[16px] md:w-[20px] md:h-[20px]' />
            </button>
          )}
        </div>
        {message && (
          <p className="text-foreground/60 mt-1 text-xs md:text-small w-[90%]">{message}</p>
        )}
        <div className={replied ? 'mt-3' : ''}>
          {replied ? (
            <div className="p-3 bg-default/80 rounded-lg w-[90%]">
              <p className="text-default-foreground text-xs md:text-sm">{replied}</p>
            </div>
          ) : isReplying && (
            <form
              ref={replyFormRef}
              onSubmit={handleReplySubmit}
              onBlur={handleBlur}
              className="mt-2"
            >
              <Input
                type="text"
                placeholder="Say something nice..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                radius='sm'
                variant='underlined'
                autoFocus
                className='w-[90%]'
                classNames={{
                  inputWrapper: 'after:bg-primary',
                  input: 'text-xs md:text-small'
                }}
                endContent={
                  <Button
                    isIconOnly
                    color="primary"
                    aria-label="Send"
                    type="submit"
                    variant='light'
                  >
                    <RiSendPlaneFill className='w-[16px] h-[16px] md:w-[20px] md:h-[20px]' />
                  </Button>
                }
              />
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default SupportMessage;