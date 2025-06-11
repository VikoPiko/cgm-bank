import { login } from "@/lib/actions/actions";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { createSession } from "@/lib/sessions";

jest.mock("@/lib/prisma", () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
    },
  },
}));

jest.mock("bcryptjs", () => ({
  compare: jest.fn(),
}));

jest.mock("@/lib/sessions", () => ({
  createSession: jest.fn(),
}));

jest.mock("next/server", () => ({
  NextResponse: {
    redirect: jest.fn((url) => `redirected to ${url}`),
  },
}));

describe("login", () => {
  test("returns redirect on successful login", async () => {
    const formData = new FormData();
    formData.append("email", "test@example.com");
    formData.append("password", "password123");

    jest
      .spyOn(require("@/lib/actions/actions"), "loginSchema", "get")
      .mockReturnValue({
        safeParse: () => ({
          success: true,
          data: {
            email: "test@example.com",
            password: "password123",
          },
        }),
      });

    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      userId: "user123",
      role: "user",
      password: "hashedPassword",
    });
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (createSession as jest.Mock).mockResolvedValue(true);
    const result = await login({}, formData);
    expect(result).toBe(`redirected to http://localhost:3000/dashboard`);
  });
});

// пример с Playwright
import { test, expect } from "@playwright/test";

test("зарежда dashboard и показва последни транзакции", async ({ page }) => {
  // логваме се с тестов акаунт или задаваме бисквитка
  await page
    .context()
    .addCookies([
      { name: "session", value: "FAKE_SESSION", domain: "localhost" },
    ]);
  await page.goto("http://localhost:3000/dashboard");

  // проверяваме дали DOM съдържа елементи с очакваните данни
  await expect(
    page.locator("h2", { hasText: "Твоите транзакции" })
  ).toBeVisible();
  await expect(page.locator(".transaction-item")).toHaveCountGreaterThan(0);
});

// примерен unit/integration тест на компонент
import { render, screen, waitFor } from "@testing-library/react";
import Dashboard from "@/components/Dashboard";
import { server } from "@/mocks/server"; // mock сървър с MSW (Mock Service Worker)

test("показва списък с транзакции", async () => {
  render(<Dashboard />);

  // изчакваме да се заредят данните от mock API
  await waitFor(() => {
    expect(screen.getByText(/Последни транзакции/)).toBeInTheDocument();
    expect(screen.getAllByRole("listitem").length).toBeGreaterThan(0);
  });
});
