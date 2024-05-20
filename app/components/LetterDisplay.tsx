type Props = {
    letters: string[];
  };
  
  const LetterDisplay = ({ letters }: Props) => {
    return (
      <div className="text-2xl font-bold">
        {letters.join(' ')}
      </div>
    );
  };
  
  export default LetterDisplay;
  