"use client";

import { FC, ReactNode, useState } from "react";
import { PlusIcon, XIcon } from "lucide-react";
import { motion } from "framer-motion";

const CONTAINER_SIZE = 200;

interface FamilyButtonProps {
  children: React.ReactNode;
}

const FamilyButton: React.FC<FamilyButtonProps> = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div className="dark:border-yellow-400/20 shadow-sm border border-black/10 rounded-[24px]">
      <div className="border border-black/10 rounded-[23px]">
        <div className="border-white/50 dark:border-stone-800 border rounded-[22px]">
          <div className="flex justify-center items-center border-neutral-950/20 border rounded-[21px]">
            <FamilyButtonContainer
              isExpanded={isExpanded}
              toggleExpand={toggleExpand}
            >
              {isExpanded ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: {
                      delay: 0.3,
                      duration: 0.4,
                      ease: "easeOut",
                    },
                  }}
                >
                  {children}
                </motion.div>
              ) : null}
            </FamilyButtonContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

// A container that wraps content and handles animations
interface FamilyButtonContainerProps {
  isExpanded: boolean;
  toggleExpand: () => void;
  children: ReactNode;
}

const FamilyButtonContainer: FC<FamilyButtonContainerProps> = ({
  isExpanded,
  toggleExpand,
  children,
}) => {
  return (
    <motion.div
      className="relative z-10 flex flex-col items-center space-y-1 border-white/10 bg-stone-900 bg-gradient-to-b shadow-lg border text-white cursor-pointer"
      layoutRoot
      layout
      initial={{ borderRadius: 21, width: "4rem", height: "4rem" }}
      animate={
        isExpanded
          ? {
              borderRadius: 20,
              width: CONTAINER_SIZE,
              height: CONTAINER_SIZE + 50,

              transition: {
                type: "spring",
                damping: 25,
                stiffness: 400,
                when: "beforeChildren",
              },
            }
          : {
              borderRadius: 21,
              width: "4rem",
              height: "4rem",
            }
      }
    >
      {children}

      <motion.div
        className="absolute"
        initial={{ x: "-50%" }}
        animate={{
          x: isExpanded ? "0%" : "-50%",
          transition: {
            type: "tween",
            ease: "easeOut",
            duration: 0.3,
          },
        }}
        style={{
          left: isExpanded ? "" : "50%",
          bottom: 6,
        }}
      >
        {isExpanded ? (
          <motion.div
            className="border-neutral-600 bg-neutral-800/50 hover:bg-neutral-200/10 shadow-2xl p-[10px] border rounded-full transition-colors duration-300 group"
            onClick={toggleExpand}
            layoutId="expand-toggle"
            initial={false}
            animate={{
              rotate: -360,
              transition: {
                duration: 0.4,
              },
            }}
          >
            <XIcon className="group-hover:text-neutral-200 w-7 h-7 text-cyan-100/30 dark:text-neutral-400/80 transition-colors duration-200" />
          </motion.div>
        ) : (
          <motion.div
            className="border-cyan-100/10 bg-neutral-200 dark:bg-cyan-500/90 shadow-2xl p-[10px] border text-cyan-50 transition-colors duration-200 group"
            style={{ borderRadius: 24 }}
            onClick={toggleExpand}
            layoutId="expand-toggle"
            initial={{ rotate: 180 }}
            animate={{
              rotate: -180,
              transition: {
                duration: 0.4,
              },
            }}
          >
            <PlusIcon className="w-7 h-7 text-black dark:text-neutral-900" />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export { FamilyButton, FamilyButtonContainer };
