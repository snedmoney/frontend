import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TypewriterEffectSmooth } from '@/components/magicui/typewriter-effect';
import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/link';
import { SiCashapp } from "react-icons/si";

const emojis: string[] = ['💰', '🚀', '💡', '💜', '👍', '🔓', '💸', '💸', '💸', '🎁'];

interface Position {
  x: number;
  y: number;
}

interface EmojiCardProps {
  emoji: string;
  position: Position;
  onComplete: () => void;
}

interface EmojiInstance {
  id: number;
  emoji: string;
  position: Position;
}

const EmojiCard = ({ emoji, position, onComplete }: EmojiCardProps) => {
  return (
    <motion.div
      className="absolute bg-background rounded-full border border-default-200 shadow-lg p-4 w-8 h-8 md:w-16 md:h-16 flex items-center justify-center"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
      }}
      initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      exit={{ opacity: 0, scale: 0.5, rotate: 10 }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
      onAnimationComplete={onComplete}
    >
      <span className="text-l md:text-3xl">{emoji}</span>
    </motion.div>
  );
};

const HeroSection = () => {
  const words = [
    {
      text: "Unlock",
    },
    {
      text: "Extra",
    },
    {
      text: "Revenue",
      className: 'bg-foreground text-background dark:text-background'
    },
    {
      text: "Streams",
    },
    {
      text: "with",
    },
    {
      text: "Sned.",
      className: "text-primary dark:text-primary",
    },
  ];
  // const [emojiInstances, setEmojiInstances] = useState<EmojiInstance[]>([]);

  // const addEmoji = useCallback(() => {
  //   const position: Position = {
  //     x: Math.random() * 90 + 5,
  //     y: Math.random() * 90 + 5,
  //   };

  //   const newEmoji: EmojiInstance = {
  //     id: Date.now(),
  //     emoji: emojis[Math.floor(Math.random() * emojis.length)],
  //     position,
  //   };
  //   setEmojiInstances(prev => [...prev, newEmoji]);
  // }, []);

  // const removeEmoji = useCallback((id: number) => {
  //   setEmojiInstances(prev => prev.filter(instance => instance.id !== id));
  // }, []);

  // useEffect(() => {
  //   const interval = setInterval(addEmoji, 1000);
  //   return () => clearInterval(interval);
  // }, [addEmoji]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0 z-0 flex">
        <div className="w-full md:w-1/2 h-screen overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1664277497095-424e085175e8?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt='hero image 1'
            className="w-full h-full object-cover blur-[1px]"
          />
        </div>
        <div className="hidden md:flex w-1/2 h-screen overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1673648955144-9523b7ee91d7?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt='hero image 2'
            className="w-full h-full object-cover blur-[1px]"
          />
        </div>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-background/40 z-10"></div>

      {/* Emoji Animation */}
      {/* <div className="absolute inset-0 z-20">
        <AnimatePresence>
          {emojiInstances.map(({ id, emoji, position }) => (
            <EmojiCard
              key={id}
              emoji={emoji}
              position={position}
              onComplete={() => setTimeout(() => removeEmoji(id), 2000)}
            />
          ))}
        </AnimatePresence>
      </div> */}

      {/* Main Content */}
      <div className="relative z-30 flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center px-4 max-w-2xl">
          <TypewriterEffectSmooth
            className='font-hero tracking-wider my-0 text-center'
            cursorClassName='hidden'
            words={words.slice(0, 3)}
          />
          <TypewriterEffectSmooth
            className='font-hero tracking-wider mb-2 mt-2 text-center'
            words={words.slice(3,)}
          />
          <p className="text-md md:text-xl text-foreground mb-6 mx-8 text-center">
            Join 1000+ creators earning through tips, NFT memberships, and sales in your favorite crypto.
          </p>
          <div className="inline-block">
            <Button
              as={Link}
              variant='solid'
              size="lg"
              color='primary'
              href='create/profile'
              target="_blank"
              className="flex items-center gap-2 mb-4"
            >
              <SiCashapp />
              <span>Start Earning</span>
            </Button>
            <p className="text-xs md:text-md text-foreground text-center">
              It's free. Simply connect your wallet!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;