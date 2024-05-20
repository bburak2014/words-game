type Props = {
    word: string | null;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    gameOver: boolean;
  };
  
  const WordInput = ({ word, onChange, gameOver }: Props) => {
    return (
      <input
        type="text"
        value={word ?? ''}
        onChange={onChange}
        className="p-2 text-lg border rounded"
        disabled={gameOver}
      />
    );
  };
  
  export default WordInput;
  