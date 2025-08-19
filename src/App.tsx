import  { useState } from "react";
import { InputField } from "./components/InputField";
import { DataTable, type Column } from "./components/DataTable";

interface Person {
  id: number;
  name: string;
  age: number;
  role: string;
}

export default function App() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const data: Person[] = [
    { id: 1, name: "Kunal", age: 21, role: "Manager" },
    { id: 2, name: "Ankur", age: 21, role: "Designer" },
    { id: 3, name: "Subhanshu", age: 21, role: "Developer" },
    { id: 3, name: "Roushan", age: 22, role: "Developer" },
  ];

  const columns: Column<Person>[] = [
    { key: "name", title: "Name", dataIndex: "name", sortable: true },
    { key: "age", title: "Age", dataIndex: "age", sortable: true },
    { key: "role", title: "Role", dataIndex: "role", sortable: true },
  ];

  return (
    <div className="min-h-screen bg-gray-400 dark:bg-gray-900 text-gray-900 dark:text-white flex justify-center">
      <div className="max-w-5xl w-full p-8 space-y-12">
        <h1 className="text-3xl font-bold">Assignment Components</h1>

      {/* InputField Section */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Input Fields</h2>
        <InputField
          label="Your Name"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          helperText="Type your full name"
          clearable
        />
        <InputField
          label="Password"
          placeholder="Enter password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          invalid={password.length > 0 && password.length < 6}
          errorMessage="Min 6 characters"
        />
        <InputField label="Disabled" placeholder="Disabled field" disabled />
        <InputField label="Loading" placeholder="Loading..." loading />
      </section>

      {/* DataTable Section */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Data Table</h2>
        <DataTable data={data} columns={columns} selectable />
      </section>
    </div>
    </div>
  );
}


