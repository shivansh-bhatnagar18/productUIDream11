function CaptainSelectionHeader() {
  return (
    <div className="mx-auto w-full h-auto py-8 rounded-[10px] flex-col items-center justify-center  shadow-inner">
      <div className="flex items-center justify-evenly">
        <div>
          <h3 className="text-center text-[#ebebf5]/60 text-[18px]  leading-[68px]">
            Captain gets
          </h3>
          <p className="text-center text-white text-[15px] font-bold  leading-[28px]">
            2X Points
          </p>
        </div>
        <div className="w-[44px] h-[0px] origin-top-left rotate-90 border border-white"></div>
        <div>
          <h3 className="text-center text-[#ebebf5]/60 text-[18px] leading-[68px]">
            Vice Captain gets
          </h3>
          <p className="text-center text-white text-[15px] font-bold  leading-[28px]">
            2X Points
          </p>
        </div>
      </div>
    </div>
  );
}

export default CaptainSelectionHeader;
