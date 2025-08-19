import type { Meta, StoryObj } from "@storybook/react";
import { DataTable, type Column } from "../components/DataTable";

interface Person {
  id: number;
  name: string;
  age: number;
  role: string;
}

const meta: Meta<typeof DataTable<Person>> = {
  title: "Components/DataTable",
  component: DataTable,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof DataTable<Person>>;

const sampleData: Person[] = [
  { id: 1, name: "Kunal", age: 21, role: "Manager" },
  { id: 2, name: "Ankur", age: 21, role: "Designer" },
  { id: 3, name: "Subhanshu", age: 21, role: "Manager" },
  { id: 3, name: "Roushan", age: 22, role: "Developer" },
];

const columns: Column<Person>[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
  { key: "role", title: "Role", dataIndex: "role", sortable: true },
];

export const Default: Story = {
  render: () => <DataTable data={sampleData} columns={columns} />,
};

export const Selectable: Story = {
  render: () => <DataTable data={sampleData} columns={columns} selectable />,
};

export const Loading: Story = {
  render: () => <DataTable data={[]} columns={columns} loading />,
};

export const Empty: Story = {
  render: () => <DataTable data={[]} columns={columns} />,
};