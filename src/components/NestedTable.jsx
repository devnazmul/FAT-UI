import React, { useState } from "react";

const NestedTable = () => {
  // Sample data
  const data = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      children: [
        { id: 101, name: "Task 1", status: "Completed" },
        { id: 102, name: "Task 2", status: "Pending" }
      ]
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      children: [
        { id: 201, name: "Task A", status: "Completed" },
        { id: 202, name: "Task B", status: "In Progress" }
      ]
    }
  ];

  const [expandedRows, setExpandedRows] = useState([]);

  const toggleRow = (id) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((parent) => (
            <React.Fragment key={parent.id}>
              <tr onClick={() => toggleRow(parent.id)}>
                <td>{parent.id}</td>
                <td>{parent.name}</td>
                <td>{parent.email}</td>
                <td>
                  <button className="btn btn-sm btn-outline">
                    {expandedRows.includes(parent.id) ? "Hide" : "Expand"}
                  </button>
                </td>
              </tr>
              {expandedRows.includes(parent.id) && (
                <tr className="">
                  <td colSpan="4" className={`bg-primary-content`}>
                    <table className="table table-compact w-full ">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Task</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {parent.children.map((child) => (
                          <tr key={child.id}>
                            <td>{child.id}</td>
                            <td>{child.name}</td>
                            <td>{child.status}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NestedTable;
