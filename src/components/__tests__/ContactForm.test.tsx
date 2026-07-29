import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "@/components/ContactForm";

jest.mock("@/lib/analytics", () => ({ trackEvent: jest.fn() }));

const fetchMock = jest.fn();
global.fetch = fetchMock;

describe("ContactForm", () => {
  beforeEach(() => fetchMock.mockReset());

  it("shows validation errors when required fields are empty", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole("button", { name: /send enquiry/i }));

    expect(
      await screen.findByText("Please enter your name"),
    ).toBeInTheDocument();
    expect(screen.getByText("Please enter a valid email")).toBeInTheDocument();
    expect(
      screen.getByText("Please provide at least 15 characters"),
    ).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("submits a valid enquiry to the contact API", async () => {
    fetchMock.mockResolvedValue({ ok: true });
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText("Name"), "Jude Baptista");
    await user.type(screen.getByLabelText("Email"), "jude@example.com");
    await user.type(
      screen.getByLabelText("Project requirements"),
      "We need a water treatment site survey for our facility.",
    );
    await user.click(screen.getByRole("button", { name: /send enquiry/i }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/contact",
      expect.objectContaining({ method: "POST" }),
    );
  });
});
