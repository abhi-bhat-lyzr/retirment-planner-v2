"use client";

import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hook";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Edit2,
} from "lucide-react";
import { useUpdateUserMutation } from "@/lib/features/user/userAPI";
import { updateUserInputs } from "@/lib/features/user/userSlice";
import { toast } from "sonner";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";


const userFormSchema = z.object({
  age: z.number().min(18).max(120).optional(),
  current_retirement_savings: z.number().min(0).optional(),
  debts: z.number().min(0).optional(),
  desired_retirement_age: z.number().min(30).max(100).optional(),
  expected_inflation_rate: z.number().min(0).max(100).optional(),
  expected_pension: z.number().min(0).optional(),
  gender: z.enum(["male", "female", "other"]).optional(),
  healthcare_costs_estimate: z.number().min(0).optional(),
  location: z.string().min(2).optional(),
  marital_status: z
    .enum(["single", "married", "divorced", "widowed"])
    .optional(),
  monthly_income: z.number().min(0).optional(),
  monthly_savings: z.number().min(0).optional(),
  other_passive_income: z.number().min(0).optional(),
  target_savings_rate: z.number().min(0).max(100).optional(),
  risk_appetite: z.enum(["conservative", "moderate", "aggressive"]).optional(),
});

type UserFormValues = z.infer<typeof userFormSchema>;


const FORM_SECTIONS = [
  {
    title: "Personal Information",
    fields: [
      { key: "age", label: "Age", type: "number" },
      { key: "gender", label: "Gender", type: "select" },
      { key: "marital_status", label: "Marital Status", type: "select" },
      { key: "location", label: "Location", type: "text" },
    ],
  },
  {
    title: "Monthly Finances",
    fields: [
      { key: "monthly_income", label: "Monthly Income", type: "number" },
      { key: "monthly_savings", label: "Monthly Savings", type: "number" },
    ],
  },
  {
    title: "Retirement Planning",
    fields: [
      {
        key: "current_retirement_savings",
        label: "Current Retirement Savings",
        type: "number",
      },
      {
        key: "desired_retirement_age",
        label: "Desired Retirement Age",
        type: "number",
      },
      { key: "expected_pension", label: "Expected Pension", type: "number" },
    ],
  },
  {
    title: "Additional Financial Details",
    fields: [
      { key: "debts", label: "Total Debts", type: "number" },
      {
        key: "healthcare_costs_estimate",
        label: "Healthcare Costs Estimate",
        type: "number",
      },
      {
        key: "other_passive_income",
        label: "Other Passive Income",
        type: "number",
      },
    ],
  },
  {
    title: "Investment Preferences",
    fields: [
      {
        key: "expected_inflation_rate",
        label: "Expected Inflation Rate (%)",
        type: "number",
      },
      {
        key: "target_savings_rate",
        label: "Target Savings Rate (%)",
        type: "number",
      },
      { key: "risk_appetite", label: "Risk Appetite", type: "select" },
    ],
  },
];

const UserProfile = () => {
  const dispatch = useAppDispatch();
  const { user_inputs } = useAppSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [updateUser] = useUpdateUserMutation();

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: user_inputs as UserFormValues,
  });

  const onSubmit = async (data: UserFormValues) => {
    try {
      await updateUser(data).unwrap();
      dispatch(updateUserInputs(data));
      setIsEditing(false);
      toast.success("Profile updated successfully");
    } catch {
      toast.error("Failed to update profile");
    }
  };

  const handleCancel = () => {
    form.reset(user_inputs as UserFormValues);
    setIsEditing(false);
  };


  const formatValue = (value: unknown, type: string): string => {
    if (value === undefined || value === null) return "Not set";
    if (type === "number" && typeof value === "number") {
      return value.toLocaleString();
    }
    return String(value);
  };

  return (
    <Card className="w-full bg-card">
      {!isEditing && (
        <div className="flex flex-row items-center justify-end p-2">
          {!isEditing ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="h-9 px-4"
            >
              <Edit2 className="h-4 w-4 mr-2" />
              Update Profile
            </Button>
          ) : (
            <></>
          )}
        </div>
      )}

      <CardContent className="p-6">
        {isEditing ? (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-8 space-y-8"
            >
              {FORM_SECTIONS.map((section) => (
                <div key={section.title} className="space-y-4">
                  <h3 className="text-lg font-semibold">{section.title}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {section.fields.map((field) => (
                      <FormField
                        key={field.key}
                        control={form.control}
                        name={field.key as keyof UserFormValues}
                        render={({ field: formField }) => (
                          <FormItem>
                            <FormLabel>{field.label}</FormLabel>
                            <FormControl>
                              {field.type === "select" ? (
                                <Select
                                  onValueChange={formField.onChange}
                                  defaultValue={formField.value?.toString()}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue
                                        placeholder={`Select ${field.label}`}
                                      />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {field.key === "gender" ? (
                                      <>
                                        <SelectItem value="male">
                                          Male
                                        </SelectItem>
                                        <SelectItem value="female">
                                          Female
                                        </SelectItem>
                                        <SelectItem value="other">
                                          Other
                                        </SelectItem>
                                      </>
                                    ) : field.key === "marital_status" ? (
                                      <>
                                        <SelectItem value="single">
                                          Single
                                        </SelectItem>
                                        <SelectItem value="married">
                                          Married
                                        </SelectItem>
                                        <SelectItem value="divorced">
                                          Divorced
                                        </SelectItem>
                                        <SelectItem value="widowed">
                                          Widowed
                                        </SelectItem>
                                      </>
                                    ) : field.key === "risk_appetite" ? (
                                      <>
                                        <SelectItem value="conservative">
                                          Conservative
                                        </SelectItem>
                                        <SelectItem value="moderate">
                                          Moderate
                                        </SelectItem>
                                        <SelectItem value="aggressive">
                                          Aggressive
                                        </SelectItem>
                                      </>
                                    ) : null}
                                  </SelectContent>
                                </Select>
                              ) : (
                                <Input
                                  {...formField}
                                  type={field.type}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    formField.onChange(
                                      field.type === "number"
                                        ? Number(value)
                                        : value
                                    );
                                  }}
                                />
                              )}
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                </div>
              ))}

              <div className="flex justify-end pt-6 border-t">
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="default">
                    Save Changes
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        ) : (
          <div className="space-y-8">
            {FORM_SECTIONS.map((section) => (
              <div key={section.title} className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">
                  {section.title}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {section.fields.map((field) => (
                    <div key={field.key} className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        {field.label}
                      </p>
                      <p className="font-medium">
                        {formatValue(
                          user_inputs[field.key as keyof UserFormValues],
                          field.type
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserProfile;
