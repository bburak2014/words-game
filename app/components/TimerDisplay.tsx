import { motion } from "framer-motion";

type Props = {
  timeLeft: number;
};

const TimerDisplay = ({ timeLeft }: Props) => {
  return (

    <div>Time Left: 
      <motion.span
        className="text-lg font-bold"
        initial={{ scale: 0.7, opacity: 0.7}}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        key={timeLeft}
      >
        {timeLeft}
      </motion.span>
    </div>
  );
};

export default TimerDisplay;
