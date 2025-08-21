"use server";

import { PlanProps } from "@/utils/interfaces";

export const getGaragesAction = async (currentPage: number, pageSize: number, token: string, garageName?: string) => {
  try {
    const params = new URLSearchParams({
      currentPage: currentPage.toString(),
      pageSize: pageSize.toString(),
    });

    if (garageName) {
      params.append("garageName", garageName);
    }

    const response = await fetch(
      `https://mock.apidog.com/m1/1022746-1009361-default/GetGaragesPaginatedList?${params.toString()}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching garages:", error);
    throw new Error("Failed to get garages.");
  }
};
export const getGarageAction = async (garageId: string, token: string) => {
  try {
    const params = new URLSearchParams({
      garageId,
    });
    const response = await fetch(`https://mock.apidog.com/m1/1022746-1009361-default/garage?${params.toString()}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching garage:", error);
    throw new Error("Failed to get garage.");
  }
};
export const getPlansAction = async (garageId: string, token: string) => {
  try {
    const params = new URLSearchParams({
      garageId,
    });
    const response = await fetch(`https://mock.apidog.com/m1/1022746-1009361-default/plans?${params.toString()}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching plans:", error);
    throw new Error("Failed to get plans.");
  }
};
export const createPlanAction = async (plan: PlanProps, token: string) => {
  try {
    const response = await fetch("https://mock.apidog.com/m1/1022746-1009361-default/plan", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(plan),
    });
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating plan:", error);
    throw new Error("Failed to create plan");
  }
};
export const loginAction = async (username: string, password: string) => {
  try {
    const params = { username, password };

    const response = await fetch("https://mock.apidog.com/m1/1022746-1009361-default/Authenticate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const jsonData = await response.json();
    const token = jsonData?.data?.token as string;

    if (!token) {
      throw new Error("Token not found in response.");
    }
    return token;
  } catch (error) {
    console.error("Error on login:", error);
    throw new Error("Failed to login.");
  }
};
