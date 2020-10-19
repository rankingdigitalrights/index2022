interface CompanyRankCardProps {
  score: number;
  rank: number;
}

const CompanyRankCard = ({score, rank}: CompanyRankCardProps) => {
  return (
    <div className="flex">
      <div className="w-24">
        <div className="font-simplon-light text-lg text-medium-gray">Rank</div>
        <div className="mt-4 font-simplon-bold text-white rounded-full h-12 w-12 flex items-center justify-center bg-blue-500 text-xl">
          {rank}
        </div>
      </div>

      <div className="w-24">
        <div className="font-simplon-light text-lg text-medium-gray">Score</div>
        <div className="mt-4 font-simplon-bold h-16 w-16 flex items-center justify-center text-xl">
          {score}%
        </div>
      </div>
    </div>
  );
};

export default CompanyRankCard;
