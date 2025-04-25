import React from "react";
import { Card } from "@/components/ui/card";
import { AlertCircle, User, DollarSign, Home } from "lucide-react";
import { useAppSelector } from "@/lib/hook";
import { UserInputs } from "@/lib/features/user/userSlice";

// Define sections with messages and descriptions
const PROFILE_SECTIONS = [
  {
    id: "personal",
    title: "Personal Details",
    icon: User,
    color: "text-blue-500",
    bgColor: "bg-blue-100",
    fields: [
      {
        key: "age" as keyof UserInputs,
        label: "Age",
        validate: (value: unknown): boolean =>
          typeof value === "number" && value > 0 && value <= 120,
      },
      {
        key: "gender" as keyof UserInputs,
        label: "Gender",
        validate: (value: unknown): boolean =>
          typeof value === "string" &&
          ["male", "female", "other"].includes(value),
      },
      {
        key: "marital_status" as keyof UserInputs,
        label: "Marital Status",
        validate: (value: unknown): boolean =>
          typeof value === "string" &&
          ["single", "married", "divorced", "widowed"].includes(value),
      },
      {
        key: "location" as keyof UserInputs,
        label: "Location",
        validate: (value: unknown): boolean =>
          typeof value === "string" && value.trim().length > 0,
      },
    ],
    messages: {
      none: "Start by adding your basic personal information",
      partial: "Some personal details need to be filled in",
      complete: "Personal details are complete",
    },
    description:
      "Basic information about you helps us personalize your retirement plan",
  },
  {
    id: "financial",
    title: "Financial Information",
    icon: DollarSign,
    color: "text-green-500",
    bgColor: "bg-green-100",
    fields: [
      {
        key: "monthly_income" as keyof UserInputs,
        label: "Monthly Income",
        validate: (value: unknown): boolean =>
          typeof value === "number" && value >= 0,
      },
      {
        key: "monthly_savings" as keyof UserInputs,
        label: "Monthly Savings",
        validate: (value: unknown): boolean =>
          typeof value === "number" && value >= 0,
      },
      {
        key: "current_retirement_savings" as keyof UserInputs,
        label: "Current Savings",
        validate: (value: unknown): boolean =>
          typeof value === "number" && value >= 0,
      },
    ],
    messages: {
      none: "Add your monthly income and savings details",
      partial: "Complete your financial information",
      complete: "Financial details are set",
    },
    description: "Your financial details are crucial for retirement planning",
  },
  {
    id: "retirement",
    title: "Retirement Goals",
    icon: Home,
    color: "text-purple-500",
    bgColor: "bg-purple-100",
    fields: [
      {
        key: "desired_retirement_age" as keyof UserInputs,
        label: "Retirement Age",
        validate: (value: unknown): boolean =>
          typeof value === "number" && value > 0 && value <= 120,
      },
      {
        key: "expected_pension" as keyof UserInputs,
        label: "Expected Pension",
        validate: (value: unknown): boolean =>
          typeof value === "number" && value >= 0,
      },
    ],
    messages: {
      none: "Set your retirement goals",
      partial: "Add more details about your retirement plans",
      complete: "Retirement goals are set",
    },
    description: "These details help us calculate your retirement readiness",
  },
];

const CircularProgress = ({
  value,
  size = "lg",
  color = "text-blue-500",
}: {
  value: number;
  size?: "sm" | "lg";
  color?: string;
}) => {
  const radius = size === "lg" ? 30 : 20;
  const circumference = 2 * Math.PI * radius;
  const progress = ((100 - value) * circumference) / 100;
  const width = size === "lg" ? "w-20 h-20" : "w-14 h-14";
  const fontSize = size === "lg" ? "text-xl" : "text-sm";

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg className={`transform -rotate-90 ${width}`}>
        <circle
          className="text-gray-200"
          strokeWidth="8"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size === "lg" ? "40" : "28"}
          cy={size === "lg" ? "40" : "28"}
        />
        <circle
          className={color}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={progress}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size === "lg" ? "40" : "28"}
          cy={size === "lg" ? "40" : "28"}
        />
      </svg>
      <span className={`absolute ${fontSize} font-bold`}>{value}%</span>
    </div>
  );
};

const ProfileCompletion = () => {
  const userInputs = useAppSelector((state) => state.user.user_inputs);

  // Calculate completion for each section
  const sectionProgress = PROFILE_SECTIONS.map((section) => {
    const completedFields = section.fields.filter((field) => {
      const value = userInputs[field.key];
      return value !== undefined && value !== null && field.validate(value);
    });
    return {
      ...section,
      completed: completedFields.length,
      total: section.fields.length,
      percentage: Math.round(
        (completedFields.length / section.fields.length) * 100
      ),
    };
  });

  const totalCompleted = sectionProgress.reduce(
    (acc, section) => acc + section.completed,
    0
  );
  const totalFields = sectionProgress.reduce(
    (acc, section) => acc + section.total,
    0
  );
  const completionPercentage = Math.round((totalCompleted / totalFields) * 100);

  const getMessage = (
    progress: number,
    messages: { none: string; partial: string; complete: string }
  ) => {
    if (progress === 0) return messages.none;
    if (progress === 100) return messages.complete;
    return messages.partial;
  };

  return (
    <div className="space-y-6 p-5">
      {/* Overall Progress Card */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Profile Completion</h3>
              <div className="flex items-center gap-2">
                <CircularProgress value={completionPercentage} size="sm" />
                <p className="text-sm text-muted-foreground">
                  {completionPercentage === 100
                    ? "Your profile is complete! We can now provide accurate retirement insights."
                    : `Your profile is ${completionPercentage}% complete. Complete missing information for better retirement planning.`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Section Progress */}
      <div className="flex flex-col space-y-4">
        {sectionProgress.map((section) => {
          const message = getMessage(section.percentage, section.messages);
          const remainingFields = section.total - section.completed;

          return (
            <Card
              key={section.id}
              className={`p-4 ${
                section.percentage === 100 ? "border-green-200" : ""
              }`}
            >
              <div className="flex items-center gap-6">
                <div className={`p-3 rounded-full ${section.bgColor} shrink-0`}>
                  <section.icon className={`h-6 w-6 ${section.color}`} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="space-y-1">
                      <h3 className="font-semibold text-lg">{section.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {section.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-end">
                        <p className="text-sm font-medium">{message}</p>
                        {remainingFields > 0 && (
                          <p className="text-xs text-amber-600 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {remainingFields} field
                            {remainingFields > 1 ? "s" : ""} remaining
                          </p>
                        )}
                      </div>
                      <CircularProgress
                        value={section.percentage}
                        size="sm"
                        color={section.color}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Action Message */}
      {completionPercentage < 100 && (
        <Card className="p-4 border-yellow-200 bg-yellow-50">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-yellow-500" />
            <p className="text-sm text-yellow-700">
              Complete your profile to receive more accurate retirement planning
              insights
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ProfileCompletion;
