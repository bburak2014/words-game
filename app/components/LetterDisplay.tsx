// components/LetterDisplay.tsx
import { motion } from 'framer-motion';

type Props = {
  letters: string[];
};

const LetterDisplay = ({ letters }: Props) => {
  return (
    <div className="text-2xl font-bold flex flex-wrap gap-4 justify-center items-center">
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          className="inline-block w-10 h-10 border-2 border-slate-700 bg-white text-center align-middle rounded-lg shadow-lg"
          initial={{ opacity: 0, y: -50, rotate: -10 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20, delay: index * 0.2 }}
        >
          {letter}
        </motion.span>
      ))}
    </div>
  );
};

export default LetterDisplay;
