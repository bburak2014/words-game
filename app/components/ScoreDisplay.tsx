// components/ScoreDisplay.tsx
import { motion } from 'framer-motion';

type Props = {
  score: number;
  language: string;

};

const ScoreDisplay = ({ score, language }: Props) => {
  return (
    <div>
      {language === 'en' ? ' Score: ' : ' Puan: '}
      <motion.span
        className="text-lg font-bold"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        key={score}
      >
        {score}
      </motion.span>
    </div>
  );
};

export default ScoreDisplay;
