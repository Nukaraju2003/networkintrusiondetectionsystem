
import { toast } from "sonner";

const API_URL = "http://localhost:5000/api";

interface ApiResponse {
  status: string;
  data?: any;
  message?: string;
}

export const predictBinaryClassification = async (inputData: string[]): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}/binary/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input_data: inputData }),
    });

    const result: ApiResponse = await response.json();

    if (!response.ok || result.status === "error") {
      throw new Error(result.message || "Failed to process binary classification");
    }

    return result.data;
  } catch (error) {
    console.error("Binary classification error:", error);
    toast.error("Error processing binary classification");
    throw error;
  }
};

export const predictMultiClassification = async (inputData: string[]): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}/multi/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input_data: inputData }),
    });

    const result: ApiResponse = await response.json();

    if (!response.ok || result.status === "error") {
      throw new Error(result.message || "Failed to process multi classification");
    }

    return result.data;
  } catch (error) {
    console.error("Multi classification error:", error);
    toast.error("Error processing multi classification");
    throw error;
  }
};
