import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Activity } from "@shared/schema";

interface ActivityCardProps {
  activity: Activity;
  onClick: () => void;
}

export default function ActivityCard({ activity, onClick }: ActivityCardProps) {
  const getActivityColor = (type: string) => {
    switch (type) {
      case "read_aloud":
        return "from-blue-500/10 to-blue-600/10 border-blue-200 text-blue-600";
      case "picture_talk":
        return "from-green-500/10 to-green-600/10 border-green-200 text-green-600";
      case "daily_chat":
        return "from-orange-500/10 to-orange-600/10 border-orange-200 text-orange-600";
      default:
        return "from-gray-500/10 to-gray-600/10 border-gray-200 text-gray-600";
    }
  };

  const getXPColor = (type: string) => {
    switch (type) {
      case "read_aloud":
        return "text-blue-600";
      case "picture_talk":
        return "text-green-600";
      case "daily_chat":
        return "text-orange-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <Card 
      className="hover:shadow-md transition-shadow cursor-pointer group"
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-r ${getActivityColor(activity.type)}`}>
            <i className={`${activity.icon} text-xl`} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
              {activity.name}
            </h3>
            <p className="text-sm text-slate-500 capitalize">
              {activity.type.replace('_', ' ')}
            </p>
          </div>
        </div>
        
        <p className="text-slate-600 text-sm mb-4 line-clamp-2">
          {activity.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${getActivityColor(activity.type)}`}>
            {activity.duration} mins
          </span>
          <span className={`text-sm font-medium ${getXPColor(activity.type)}`}>
            +{activity.xpReward} XP
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
