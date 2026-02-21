import { Link } from "react-router";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import Navbar from "../components/shared/Navbar";
import { Brain, Zap, MapPin, FileText, TrendingUp, ArrowRight } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";

export default function AIVisualization() {
  const nlpData = [
    { step: "Input", value: 100 },
    { step: "Tokenization", value: 95 },
    { step: "Normalization", value: 90 },
    { step: "Feature Extraction", value: 85 },
    { step: "Classification", value: 92 }
  ];

  const severityScores = [
    { factor: "Urgency", score: 94 },
    { factor: "Population Affected", score: 87 },
    { factor: "Resource Scarcity", score: 82 },
    { factor: "Geographic Isolation", score: 76 },
    { factor: "Time Sensitivity", score: 91 }
  ];

  const matchingData = [
    { category: "Location", ngo: 88, donor: 92, volunteer: 85 },
    { category: "Resources", ngo: 95, donor: 87, volunteer: 78 },
    { category: "Skills", ngo: 82, donor: 65, volunteer: 94 },
    { category: "Availability", ngo: 90, donor: 89, volunteer: 91 },
    { category: "History", ngo: 78, donor: 82, volunteer: 88 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AI System Visualization</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Understand how our advanced AI algorithms power intelligent disaster relief coordination through NLP, severity prediction, semantic matching, and geo-spatial analysis
          </p>
        </div>

        {/* NLP Normalization Flow */}
        <Card className="p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">NLP Processing Pipeline</h2>
              <p className="text-gray-600">Natural Language Processing for request normalization</p>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="space-y-3 flex-1">
                {["Raw Input", "Tokenization", "Normalization", "Feature Extraction", "Structured Output"].map((step, idx) => (
                  <div key={step} className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-gray-900">{step}</span>
                        <span className="text-sm text-gray-600">{nlpData[idx].value}%</span>
                      </div>
                      <Progress value={nlpData[idx].value} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
            <h3 className="font-bold text-gray-900 mb-3">Example Transformation</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Input (Raw Text):</p>
                <div className="bg-white p-3 rounded border text-sm text-gray-700">
                  "Urgent!!! Need food and water for 500 families affected by floods in Patna. Many children and elderly people."
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Output (Structured):</p>
                <div className="bg-white p-3 rounded border text-sm font-mono">
                  {`{
  "urgency": "high",
  "disaster": "flood",
  "location": "Patna",
  "items": ["food", "water"],
  "affected": 500,
  "vulnerable": ["children", "elderly"]
}`}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Severity Prediction */}
        <Card className="p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Severity Prediction Model</h2>
              <p className="text-gray-600">Multi-factor analysis for priority scoring</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Factor Weights</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={severityScores} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="factor" type="category" width={150} />
                  <Tooltip />
                  <Bar dataKey="score" fill="#ef4444" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Priority Score Calculation</h3>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-lg">
                  <div className="text-center mb-3">
                    <div className="text-5xl font-bold text-red-600">94</div>
                    <p className="text-sm text-gray-600 mt-1">Final Priority Score</p>
                  </div>
                  <div className="text-xs text-gray-700 space-y-1">
                    <p>• Urgency Level × 0.30 = 28.2</p>
                    <p>• Population Impact × 0.25 = 21.8</p>
                    <p>• Resource Scarcity × 0.20 = 16.4</p>
                    <p>• Geographic Factor × 0.15 = 11.4</p>
                    <p>• Time Sensitivity × 0.10 = 9.1</p>
                    <p className="font-bold pt-2 border-t">= 94.0 (High Priority)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Semantic Matching */}
        <Card className="p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Semantic Matching Engine</h2>
              <p className="text-gray-600">Multi-dimensional matching algorithm</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Matching Criteria Radar</h3>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={matchingData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="category" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar name="NGO" dataKey="ngo" stroke="#2563eb" fill="#2563eb" fillOpacity={0.3} />
                  <Radar name="Donor" dataKey="donor" stroke="#22c55e" fill="#22c55e" fillOpacity={0.3} />
                  <Radar name="Volunteer" dataKey="volunteer" stroke="#f97316" fill="#f97316" fillOpacity={0.3} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Match Confidence Breakdown</h3>
              <div className="space-y-3">
                {[
                  { label: "Skill Compatibility", score: 95, color: "blue" },
                  { label: "Location Proximity", score: 87, color: "green" },
                  { label: "Resource Availability", score: 92, color: "purple" },
                  { label: "Historical Performance", score: 88, color: "orange" },
                  { label: "Availability Match", score: 90, color: "red" }
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700">{item.label}</span>
                      <span className="text-sm font-bold text-gray-900">{item.score}%</span>
                    </div>
                    <Progress value={item.score} className="h-2" />
                  </div>
                ))}
                <div className="mt-6 p-4 bg-green-50 border-2 border-green-200 rounded-lg text-center">
                  <p className="text-sm text-gray-600 mb-1">Overall Match Confidence</p>
                  <p className="text-3xl font-bold text-green-600">90.4%</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Geo Distance Matching */}
        <Card className="p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Geo-Distance Matching (Haversine)</h2>
              <p className="text-gray-600">Location-based proximity calculation</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-4">Haversine Formula</h3>
              <div className="bg-white p-4 rounded border font-mono text-sm mb-4">
                <p>a = sin²(Δφ/2) + cos(φ₁) × cos(φ₂) × sin²(Δλ/2)</p>
                <p className="mt-2">c = 2 × atan2(√a, √(1−a))</p>
                <p className="mt-2">d = R × c</p>
              </div>
              <p className="text-sm text-gray-700">
                Where φ is latitude, λ is longitude, R is earth's radius (6,371km)
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Distance Calculation Example</h3>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="font-medium text-gray-900 mb-2">NGO Location (Patna)</p>
                  <p className="text-sm text-gray-700">Lat: 25.5941°, Lng: 85.1376°</p>
                </div>
                <div className="flex items-center justify-center">
                  <ArrowRight className="w-8 h-8 text-gray-400" />
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="font-medium text-gray-900 mb-2">Donor Location (Delhi)</p>
                  <p className="text-sm text-gray-700">Lat: 28.6139°, Lng: 77.2090°</p>
                </div>
                <div className="bg-purple-100 border-2 border-purple-300 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-600 mb-1">Calculated Distance</p>
                  <p className="text-3xl font-bold text-purple-600">987.4 km</p>
                  <p className="text-xs text-gray-600 mt-1">Proximity Score: 45/100</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* System Performance */}
        <Card className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">AI System Performance Metrics</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
              <p className="text-4xl font-bold text-blue-600 mb-2">94.2%</p>
              <p className="text-sm text-gray-700">Matching Accuracy</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
              <p className="text-4xl font-bold text-green-600 mb-2">2.3s</p>
              <p className="text-sm text-gray-700">Avg Processing Time</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
              <p className="text-4xl font-bold text-purple-600 mb-2">87%</p>
              <p className="text-sm text-gray-700">NLP Precision</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
              <p className="text-4xl font-bold text-orange-600 mb-2">1.2M</p>
              <p className="text-sm text-gray-700">Requests Processed</p>
            </div>
          </div>
        </Card>

        <div className="text-center mt-12">
          <Link to="/">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
