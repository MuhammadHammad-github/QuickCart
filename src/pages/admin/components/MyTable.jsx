import React from "react";

const MyTable = ({ children, cols }) => {
  return (
    <div className="overflow-x-auto smallScrollBar max-w-full ">
      <table className=" min-w-max w-full table-auto !max-w-full">
        <thead>
          <tr className="bg-gray-200">
            {cols.map((col, index) => {
              return (
                <th className="border px-4 py-2" key={index}>
                  {col}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="">{children}</tbody>
      </table>
    </div>
  );
};

export default MyTable;
