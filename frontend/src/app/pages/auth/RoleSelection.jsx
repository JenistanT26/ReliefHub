import { Link } from "react-router";
import { motion } from "motion/react";
import { Building2, Heart, Users } from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import Navbar from "../../components/shared/Navbar";

const roles = [
  {
    id: "ngo",
    title: "NGO / Organization",
    description: "Register your verified NGO to post relief requests and coordinate disaster response efforts.",
    icon: Building2,
    color: "blue",
    registerPath: "/register/ngo",
    features: [
      "Post relief requests",
      "AI-powered matching",
      "Track donations",
      "Priority alerts"
    ]
  },
  {
    id: "donor",
    title: "Donor",
    description: "Contribute resources to relief efforts and make a direct impact on disaster-affected communities.",
    icon: Heart,
    color: "green",
    registerPath: "/register/donor",
    features: [
      "Browse active requests",
      "Direct donations",
      "Real-time updates",
      "Impact tracking"
    ]
  },
  {
    id: "volunteer",
    title: "Volunteer",
    description: "Offer your skills and time to support relief operations and help communities in need.",
    icon: Users,
    color: "orange",
    registerPath: "/register/volunteer",
    features: [
      "Skill-based matching",
      "Nearby opportunities",
      "Flexible scheduling",
      "Recognition badges"
    ]
  }
];

const colorClasses = {
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    icon: "bg-blue-600",
    button: "bg-blue-600 hover:bg-blue-700"
  },
  green: {
    bg: "bg-green-50",
    border: "border-green-200",
    icon: "bg-green-600",
    button: "bg-green-600 hover:bg-green-700"
  },
  orange: {
    bg: "bg-orange-50",
    border: "border-orange-200",
    icon: "bg-orange-600",
    button: "bg-orange-600 hover:bg-orange-700"
  }
};

export default function RoleSelection() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Role</h1>
          <p className="text-xl text-gray-600">
            Select how you'd like to contribute to disaster relief efforts
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {roles.map((role, index) => {
            const Icon = role.icon;
            const colors = colorClasses[role.color];

            return (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`p-8 h-full hover:shadow-xl transition-shadow border-2 ${colors.border}`}>
                  <div className={`w-16 h-16 ${colors.icon} rounded-xl flex items-center justify-center mb-6`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mb-3">{role.title}</h2>
                  <p className="text-gray-600 mb-6">{role.description}</p>

                  <div className="space-y-2 mb-8">
                    {role.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                        <div className={`w-1.5 h-1.5 rounded-full ${colors.icon}`} />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <Link to={role.registerPath} className="block">
                    <Button className={`w-full ${colors.button}`}>
                      Register as {role.title.split('/')[0].trim()}
                    </Button>
                  </Link>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline font-medium">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
