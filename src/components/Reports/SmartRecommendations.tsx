import React from "react";
import "./SmartRecommendations.css";

interface SmartRecommendationsProps {
  recommendations: string[];
}

const SmartRecommendations: React.FC<SmartRecommendationsProps> = ({ recommendations }: SmartRecommendationsProps) => {
  return (
    <div className="smart-recommendations">
      <h2>🤖 AI-Powered Recommendations</h2>
      <ul>
        {recommendations.length > 0 ? (
          recommendations.map((rec, index) => <li key={index}>✅ {rec}</li>)
        ) : (
          <p>No recommendations available.</p>
        )}
      </ul>
    </div>
  );
};

export default SmartRecommendations;
