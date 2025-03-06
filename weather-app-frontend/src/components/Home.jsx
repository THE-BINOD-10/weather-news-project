import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    
    return (
        <div className="min-w-screen flex items-center justify-center">
            <div className="flex flex-row gap-4">
                <div
                    className="p-4 bg-gray-200 rounded-2xl text-black cursor-pointer shadow-lg"
                    onClick={() => navigate("/weather")}
                >
                    <h1 className="text-xl">Weather</h1>
                </div>
                <div
                    className="p-4 bg-gray-200 rounded-2xl text-black cursor-pointer shadow-lg"
                    onClick={() => navigate("/news")}
                >
                    <h1 className="text-xl">News</h1>
                </div>
            </div>
        </div>
    );
};

export default Home;
