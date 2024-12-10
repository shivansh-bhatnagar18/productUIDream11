'use client';
import React from 'react';

function Transaction(props: any) {

  const [fantasyPoint, setFantasyPoint] = React.useState(12);
  const [strikeRate, setStrikeRate] = React.useState(12);
  const [economyRate, setEconomyRate] = React.useState(12);

  React.useEffect(() => {
    if (props.fantasyPoint !== undefined) {
      setFantasyPoint(props.fantasyPoint);
    }
    if (props.strikeRate !== undefined) {
      setStrikeRate(props.strikeRate);
    }
    if (props.economyRate !== undefined) {
      setEconomyRate(props.economyRate);
    }
  }, [props.fantasyPoint, props.strikeRate, props.economyRate]);

  const { classname } = props;
  return (
    <div
      className={`flex flex-col w-full h-full justify-center border-[1px] border-opacity-10 border-b-black border-l-black border-t-white border-r-white shadow-inner shadow-white rounded-3xl align-middle bg-[#2E1919] ${classname}`}
    >
      <div className="w-full font-bold text-3xl text-center pb-3 mt-3 border-white border-opacity-5 border-b-2">
        Transaction
      </div>
      <div className="flex flex-col">
        <div className="w-full justify-between flex px-5 mb-4 mt-4">
          <p className="font-bold text-xl"> Fantasy Point</p>
            <div className={`px-8 py-1 rounded-sm w-fit font-bold text-2xl ${fantasyPoint > 0 ? 'bg-[#34C759] text-[#271919]' : 'bg-[#FF3B30] text-white'}`}>
              {fantasyPoint}
            </div>
        </div>
        <div className="w-full justify-between flex px-5 mb-4">
          <p className="text-xl"> Batting Strength </p>
            <div className={`px-8 py-1 rounded-sm w-fit font-bold text-2xl ${strikeRate > 0 ? 'text-[#34C759]' : 'text-[#FF3B30]'}`}>
            {strikeRate}
            </div>
        </div>
        <div className="w-full justify-between flex px-5 mb-4">
          <p className="text-xl"> Bowling Strength</p>
            <div className={`px-8 py-1 rounded-sm w-fit font-bold text-2xl ${economyRate > 0 ? 'text-[#34C759]' : 'text-[#FF3B30]'}`}>
            {economyRate}
            </div>
        </div>
      </div>
      <div className="flex flex-col  w-full items-center justify-center px-4 py-8 gap-y-2">
        <hr className="w-full border-t border-white opacity-50" />
        <span className="text-white text-[0.8rem]">
            <span className={fantasyPoint > 0 ? 'text-[#34C759]' : 'text-[#FF3B30]'}>
            {fantasyPoint > 0 ? 'THIS TRANSACTION BENEFITS YOUR TEAM' : 'THIS TRANSACTION HARMS YOUR TEAM'}
            </span>
        </span>
        <hr className="w-full border-t border-white opacity-50" />
      </div>
    </div>
  );
}

export default Transaction;
