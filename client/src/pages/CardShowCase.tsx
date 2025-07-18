import TextCard from '../components/ui/text-card';
import CountryFlagCard from '../components/ui/countryflag-card';
import { FileText, Briefcase, Heart } from 'lucide-react';

const CardShowcase = () => {
    const handleCardClick = (cardName: string) => {
        console.log(`${cardName} card clicked!`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-white text-center mb-12">
                    Card Showcase
                </h1>

                {/* Text Cards Section */}
                <div className="mb-16">
                    <h2 className="text-2xl font-bold text-white mb-8">Text Cards</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Clickable Text Cards */}
                        <TextCard
                            title="IDMkyc"
                            subtitle="Identity Verification"
                            description="Secure identity management system"
                            icon={<FileText size={32} />}
                            gradient="bg-gradient-to-br from-red-400 to-pink-500"
                            onClick={() => handleCardClick('IDMkyc')}
                        />

                        <TextCard
                            title="IDMkyb"
                            subtitle="Business Verification"
                            description="Know your business platform"
                            icon={<Briefcase size={32} />}
                            gradient="bg-gradient-to-br from-blue-400 to-blue-600"
                            onClick={() => handleCardClick('IDMkyb')}
                        />

                        <TextCard
                            title="IDMaml"
                            subtitle="Anti-Money Laundering"
                            description="Compliance and risk management"
                            icon={<Heart size={32} />}
                            gradient="bg-gradient-to-br from-purple-500 to-purple-700"
                            isSubscribed={true}
                            onClick={() => handleCardClick('IDMaml')}
                        />

                        {/* Disabled Text Card */}
                        <TextCard
                            title="IDMpro"
                            subtitle="Premium Service"
                            description="Advanced features coming soon"
                            icon={<FileText size={32} />}
                            gradient="bg-gradient-to-br from-gray-400 to-gray-600"
                            isDisabled={true}
                        />
                    </div>
                </div>

                {/* Country Flag Cards Section */}
                <div>
                    <h2 className="text-2xl font-bold text-white mb-8">Country Flag Cards</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Clickable Country Cards */}
                        <CountryFlagCard
                            countryName="Afghanistan- 1"
                            flagUrl="https://flagcdn.com/w320/af.png"
                            subtitle="Official Voter Register"
                            description="Democratic registration system"
                            onClick={() => handleCardClick('Afghanistan')}
                        />

                        <CountryFlagCard
                            countryName="Aland Islands- 1"
                            flagUrl="https://flagcdn.com/w320/ax.png"
                            subtitle="Utility - Phone Register"
                            description="Telecom service registration"
                            isSubscribed={true}
                            onClick={() => handleCardClick('Aland Islands')}
                        />

                        <CountryFlagCard
                            countryName="Albania- 1"
                            flagUrl="https://flagcdn.com/w320/al.png"
                            subtitle="Official Voter Register"
                            description="Electoral system database"
                            onClick={() => handleCardClick('Albania 1')}
                        />

                        <CountryFlagCard
                            countryName="Albania- 2"
                            flagUrl="https://flagcdn.com/w320/al.png"
                            subtitle="Utility - Phone Register"
                            description="Telecommunications registry"
                            isSubscribed={true}
                            onClick={() => handleCardClick('Albania 2')}
                        />

                        {/* Disabled Country Card */}
                        <CountryFlagCard
                            countryName="Germany- 1"
                            flagUrl="https://flagcdn.com/w320/de.png"
                            subtitle="Official Voter Register"
                            description="Coming soon..."
                            isDisabled={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardShowcase;