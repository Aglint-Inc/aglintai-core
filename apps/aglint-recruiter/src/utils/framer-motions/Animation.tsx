import { AnimatePresence, motion, Variants } from 'framer-motion';
import { ReactElement } from 'react';

const cardVariants: Variants = {
  offscreen: {
    y: 20,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    rotate: 0,
    opacity: 1,
    transition: {
      type: 'tween',
      duration: 0.4,
    },
  },
};

export function YTransform({
  children,
  uniqueKey,
  height,
}: {
  children: ReactElement;
  uniqueKey: any;
  height?: string;
}) {
  return (
    <AnimatePresence mode='wait'>
      <motion.div
        style={{ height: height ? height : '100%' }}
        key={uniqueKey}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.4 }}
        // style={{ height: '100%' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export function ScrollList({ children, uniqueKey }) {
  return (
    <motion.div
      key={uniqueKey}
      className='card-container'
      initial='offscreen'
      whileInView='onscreen'
      viewport={{ once: true, amount: 0.8 }}
    >
      <motion.div className='card' variants={cardVariants}>
        {children}
      </motion.div>
    </motion.div>
  );
}
