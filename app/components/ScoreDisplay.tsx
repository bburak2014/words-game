type Props = {
    score: number;
  };
  
  const ScoreDisplay = ({ score }: Props) => {
    return (
      <div className="text-lg">
        Score: {score}
      </div>
    );
  };
  
  export default ScoreDisplay;
  