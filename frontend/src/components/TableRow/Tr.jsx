import React from "react";
import { Link } from "react-router-dom";

function Tr({ title, img,views, blogId }) {
  return (
    <tr className="border-b bg-gray-800 border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium  whitespace-nowrap text-white"
      >
        <div className="w-[50px] h-[90%] overflow-hidden">
          <img className="object-cover w-full rounded-md" src={img} alt="" />
        </div>
      </th>
      <td className="px-6 py-4">{title}</td>
      <td className="px-6 py-4">
        <Link
          to={`/edit-blogs/${blogId}`}
          className="font-medium text-blue-600  hover:underline"
        >
          Edit
        </Link>
      </td>
    </tr>
  );
}

export default Tr;
