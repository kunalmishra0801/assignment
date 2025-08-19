import type { Meta, StoryObj } from "@storybook/react";
import { InputField } from "../components/InputField";
import { useState } from "react";

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <InputField
        label="Default Input"
        placeholder="Type here"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        helperText="Helper text example"
        clearable
      />
    );
  },
};

export const Password: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <InputField
        label="Password"
        placeholder="Enter password"
        type="password"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        errorMessage={value.length < 6 ? "Too short" : ""}
        invalid={value.length > 0 && value.length < 6}
      />
    );
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <InputField label="Filled" placeholder="Type..." variant="filled" />
      <InputField label="Outlined" placeholder="Type..." variant="outlined" />
      <InputField label="Ghost" placeholder="Type..." variant="ghost" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <InputField label="Small" placeholder="Small input" size="sm" />
      <InputField label="Medium" placeholder="Medium input" size="md" />
      <InputField label="Large" placeholder="Large input" size="lg" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="space-y-4">
      <InputField label="Disabled" placeholder="Can't type" disabled />
      <InputField label="Loading" placeholder="Loading..." loading />
      <InputField
        label="Invalid"
        placeholder="Error state"
        invalid
        errorMessage="Something went wrong"
      />
    </div>
  ),
};