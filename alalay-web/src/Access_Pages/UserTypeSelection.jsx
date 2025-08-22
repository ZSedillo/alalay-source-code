import React from "react";
import { GraduationCap, Building2, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function UserTypeSelection() {
  const navigate = useNavigate();

  const handleUserTypeSelection = (userType) => {
    if (userType === 'student') {
      navigate('/Signup');
    } else if (userType === 'sponsor') {
      navigate('/SponsorSignup');
    }
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    navigate('/Login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#8A1A1C] to-[#5C1213] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl p-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Join Our Community</h1>
          <p className="text-gray-600 text-lg">Choose your account type to get started</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Student Card */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border-2 border-transparent hover:border-blue-300 transition-all duration-300 cursor-pointer group"
               onClick={() => handleUserTypeSelection('student')}>
            <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                <GraduationCap size={40} className="text-blue-600" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-4">I'm a Student</h2>
              
              <ul className="text-left space-y-3 mb-8 text-gray-700">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Seek scholarship opportunities
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Connect with generous sponsors
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Showcase your academic achievements
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Apply for financial support
                </li>
              </ul>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center group">
                Get Started as Student
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Sponsor Card */}
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-8 rounded-2xl border-2 border-transparent hover:border-amber-300 transition-all duration-300 cursor-pointer group"
               onClick={() => handleUserTypeSelection('sponsor')}>
            <div className="text-center">
              <div className="bg-amber-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-200 transition-colors">
                <Building2 size={40} className="text-amber-600" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-4">I'm a Sponsor</h2>
              
              <ul className="text-left space-y-3 mb-8 text-gray-700">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mr-3"></div>
                  Support deserving students
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mr-3"></div>
                  Create scholarship programs
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mr-3"></div>
                  Make a meaningful impact
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mr-3"></div>
                  Connect with talented individuals
                </li>
              </ul>

              <button className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center group">
                Get Started as Sponsor
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600">
            Already have an account?{" "}
            <button 
              className="text-[#8A1A1C] font-medium hover:underline"
              onClick={handleSignIn}
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserTypeSelection;