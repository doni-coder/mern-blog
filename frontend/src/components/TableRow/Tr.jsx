import React from "react";
import { Link } from "react-router-dom";

function Tr({ title, img,views, blogId }) {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        <div className="w-[50px] h-[90%] overflow-hidden">
          <img className="object-cover w-full rounded-md" src={img} alt="" />
        </div>
      </th>
      <td className="px-6 py-4">{title}</td>
      <td className="px-6 py-4">
        <Link
          to={`/edit-blogs/${blogId}`}
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          Edit
        </Link>
      </td>
    </tr>
  );
}

export default Tr;
