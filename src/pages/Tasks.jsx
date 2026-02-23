import Table from "../components/common/Table";
const data = [
  { id: 1, name: "John Doe", email: "john@mail.com", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@mail.com", status: "Inactive" },
  { id: 1, name: "John Doe", email: "john@mail.com", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@mail.com", status: "Inactive" },{ id: 1, name: "John Doe", email: "john@mail.com", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@mail.com", status: "Inactive" },{ id: 1, name: "John Doe", email: "john@mail.com", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@mail.com", status: "Inactive" }
];
const fields = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "status", label: "Status" },
];
export default function Tasks() {
  return (
    <Table
      fields={fields}
      data={data}
      keyField="id"
      onRowClick={(row) => console.log("Clicked:", row)}
    />
  );
}