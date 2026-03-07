const FeatureCards = ({ title, description }) => {
return (

    <div className="flex flex-col items-center justify-center p-8 rounded-[2rem] border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl min-h-[250px] transition-transform hover:scale-105">
    
    <div className="w-full bg-white rounded-full py-3 px-6 mb-6 shadow-lg flex items-center justify-center">
        <h3 className="text-[#00a884] font-bold text-lg text-center leading-none">
        {title}
        </h3>
    </div>

    <div className="w-full bg-white rounded-full py-4 px-6 shadow-md flex items-center justify-center">
        <p className="text-[#00a884] text-xs md:text-sm font-medium text-center leading-tight">
        {description}
        </p>
    </div>
    </div>
    );
};

export default FeatureCards;