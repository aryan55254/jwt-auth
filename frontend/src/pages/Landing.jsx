import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
function Landing() {
  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center font-sans">
      <div className="w-full max-w-4xl mx-auto bg-transparent text-white text-center p-8">
        {/* --- Page Header --- */}
        <h1 className="text-5xl md:text-7xl font-bold text-teal-400 leading-tight mb-4">
          End To End Stateless JWT Authentication
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mt-4 max-w-2xl mx-auto">
          Experience a seamless and intuitive Authentication Experience With My
          JWT stateless Auth Project And see Your Username
        </p>

        {/* --- Call to Action Button --- */}
        <div className="mt-12">
          <Link
            to="/login"
            className={`inline-flex items-center justify-center gap-2 py-4 px-8 bg-teal-500 hover:bg-teal-600 rounded-lg font-semibold text-white transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg shadow-teal-500/20`}
          >
            Get Started
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;
