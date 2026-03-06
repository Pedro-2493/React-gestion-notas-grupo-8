const featureCards = ({ title, description }) => {
return (

    <div className="flex flex-col p-6 rounded-lg border border-cyan-400/50 bg-black/20 backdrop-blur-sm 
                    shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all duration-300 
                    hover:shadow-[0_0_25px_rgba(34,211,238,0.5)] hover:border-cyan-400">

    <div className="mb-4 border-b border-cyan-500/30 pb-2">
        <h3 className="text-cyan-400 font-bold uppercase tracking-wider text-center">
        {title}
        </h3>
    </div>

    <p className="text-gray-300 text-sm text-center leading-relaxed">
        {description}
    </p>
    </div>
    );
};

export default FeatureCard;