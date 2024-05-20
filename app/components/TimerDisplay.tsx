type Props = {
    timeLeft: number;
  };
  
  const TimerDisplay = ({ timeLeft }: Props) => {
    return (
      <div className="text-lg">
        Time Left: {timeLeft}
      </div>
    );
  };
  
  export default TimerDisplay;
  