import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle, Users, TrendingUp, Shield, Zap, Globe } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import Navbar from "../components/shared/Navbar";
import { stats } from "../data/mockData";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const [counts, setCounts] = useState({
    totalRequests: 0,
    resourcesMatched: 0,
    volunteersActive: 0
  });

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setCounts({
        totalRequests: Math.floor(stats.totalRequests * progress),
        resourcesMatched: Math.floor(stats.resourcesMatched * progress),
        volunteersActive: Math.floor(stats.volunteersActive * progress)
      });

      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Coordinating Relief.{" "}
                <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  Saving Lives.
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                AI-powered disaster relief coordination platform connecting NGOs, donors, 
                and volunteers to deliver aid where it's needed most, faster than ever before.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/register/ngo">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Register as NGO
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/register/donor">
                  <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                    Donate Now
                  </Button>
                </Link>
                <Link to="/register/volunteer">
                  <Button size="lg" variant="outline">
                    Join as Volunteer
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl p-8 shadow-2xl">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-white">
                      <span className="text-sm font-medium">Active Emergencies</span>
                      <span className="text-2xl font-bold">24</span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-white rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: "75%" }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <div className="bg-white/10 rounded-lg p-3">
                        <p className="text-white/80 text-xs">AI Match Rate</p>
                        <p className="text-white text-xl font-bold">94%</p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-3">
                        <p className="text-white/80 text-xs">Avg Response</p>
                        <p className="text-white text-xl font-bold">2.3h</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-orange-500 rounded-full blur-3xl opacity-60" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-60" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Three simple steps to coordinate relief efforts</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-8 text-center hover:shadow-lg transition-shadow border-2">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">1. NGOs Post Requests</h3>
                <p className="text-gray-600">
                  Verified NGOs submit relief requests with detailed requirements, location, 
                  and urgency levels through our structured platform.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-8 text-center hover:shadow-lg transition-shadow border-2 border-blue-200">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">2. AI Matches Resources</h3>
                <p className="text-gray-600">
                  Our intelligent AI analyzes urgency, location, and resource availability 
                  to match requests with the right donors and volunteers.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-8 text-center hover:shadow-lg transition-shadow border-2">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">3. Donors & Volunteers Respond</h3>
                <p className="text-gray-600">
                  Matched donors provide resources and volunteers offer their skills, 
                  creating a coordinated relief response in real-time.
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Our Impact</h2>
            <p className="text-xl text-blue-100">Making a difference across India</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">
                {counts.totalRequests.toLocaleString()}+
              </div>
              <div className="text-blue-100 text-lg">Relief Requests Processed</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">
                {counts.resourcesMatched.toLocaleString()}+
              </div>
              <div className="text-blue-100 text-lg">Resources Matched</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">
                {counts.volunteersActive.toLocaleString()}+
              </div>
              <div className="text-blue-100 text-lg">Active Volunteers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why ReliefHub */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why ReliefHub?</h2>
            <p className="text-xl text-gray-600">Trusted by NGOs and humanitarian organizations</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <TrendingUp className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">AI-Powered Prioritization</h3>
              <p className="text-gray-600 text-sm">
                Intelligent algorithms ensure critical requests get immediate attention based on severity and impact.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <Globe className="w-10 h-10 text-green-600 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Geo-Proximity Matching</h3>
              <p className="text-gray-600 text-sm">
                Smart location-based matching connects nearby donors and volunteers for faster response times.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <Shield className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Verified NGOs Only</h3>
              <p className="text-gray-600 text-sm">
                All NGOs verified through NGO Darpan ensuring transparency and accountability in relief operations.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <Zap className="w-10 h-10 text-orange-600 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Real-Time Alerts</h3>
              <p className="text-gray-600 text-sm">
                Instant notifications keep all stakeholders updated on matches, donations, and critical updates.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">R</span>
                </div>
                <span className="font-bold text-white">ReliefHub</span>
              </div>
              <p className="text-sm text-gray-400">
                AI-powered disaster relief coordination platform saving lives across India.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">About</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Our Mission</a></li>
                <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Impact Stories</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Data Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li>Email: support@reliefhub.in</li>
                <li>Phone: 1800-123-4567</li>
                <li>24/7 Emergency Hotline</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2026 ReliefHub. All rights reserved. Built for humanitarian impact.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
