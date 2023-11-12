import React from "react";
import { render, fireEvent } from "@testing-library/react";
import HeaderContent from "../../src/contents/HeaderContent";
import { drawerStore } from "../../src/stores/drawerStore";

const mockUser = {
  authenticated: true,
  email: "test@example.com",
  balance: 100,
};

var container = null;

describe("HeaderContent component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    container = render(
      <HeaderContent user={mockUser} handleLogout={() => {}} />
    ).container;
  });

  it("renders correctly with authenticated user", () => {
    const titleElement = container.querySelector(
      "[identificator='header-title']"
    );
    expect(titleElement).toBeInTheDocument();

    const userInfoElement = container.querySelector(
      "[identificator='header-user-info']"
    );
    expect(userInfoElement).toBeInTheDocument();
    expect(userInfoElement.textContent).toContain(mockUser.email);
    expect(userInfoElement.textContent).toContain(
      `Balance: ${mockUser.balance}`
    );

    const logoutButton = container.querySelector(
      "[identificator='header-logout']"
    );
    expect(logoutButton).toBeInTheDocument();
  });

  it("calls handleLogout when logout button is clicked", () => {
    const handleLogoutMock = jest.fn();
    container = render(
      <HeaderContent user={mockUser} handleLogout={handleLogoutMock} />
    ).container;

    const logoutButton = container.querySelector(
      "[identificator='header-logout']"
    );
    fireEvent.click(logoutButton);

    expect(handleLogoutMock).toHaveBeenCalledTimes(1);
  });

  it("toggles drawer when menu button is clicked", () => {
    expect(drawerStore.get()).toBe(false);

    container = render(
      <HeaderContent user={mockUser} handleLogout={() => {}} />
    ).container;

    const menuButton = container.querySelector(
      "[identificator='header-open-drawer']"
    );
    fireEvent.click(menuButton);

    expect(drawerStore.get()).toBe(true);
  });
});
