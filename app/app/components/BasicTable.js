"use client";

export default function BasicTable({columns, dataColumns, data, actions}) {
  return (
    <div
      className="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md bg-clip-border">
      <table className={"w-full text-left table-auto min-w-max"}>
        <thead>
        <tr className={"p-4 border-b border-slate-300 bg-slate-50 border"}>
          {columns.map((col, index) => (
            <th className={"p-4 border-b border-slate-300 bg-slate-50"} key={index}>{col}</th>
          ))}
        </tr>
        </thead>
        <tbody>
        {data ? data.map((row, rowIndex) => (
          <tr className={"hover:bg-slate-50"} key={rowIndex}>
            {dataColumns.map((col, colIndex) => (
              <td className={"p-4 border-b border-slate-200"} key={colIndex}>
                {row[col]}
              </td>
            ))}
            {actions && <td className={"p-4 border-b border-slate-200"}>
              {actions.update && <button className={"text-gray-700"}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                  <path
                    d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z"/>
                  <path
                    d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z"/>
                </svg>
              </button>}
              {actions.delete && <button className={"text-gray-700 ml-1"}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                  <path fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                        clipRule="evenodd"/>
                </svg>
              </button>}
            </td>}
          </tr>
        )) : <tr className={"border"}>
          <td>Empty</td>
        </tr>}
        </tbody>
      </table>
    </div>
  );
}