import React, { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  type usersType = {
    name: string;
    username: string;
    phone: string;
    website: string;
    company: any[];
    id: number;
  };

  const [users, setUsers] = useState<Array<usersType>>([]);
  const [showDropdown, setShowDropdown] = useState<Boolean>(false);
  const buttonRef = useRef<any>();

  useEffect(() => {
    const getUserData = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const usersData: usersType[] = await response.json();
      await setUsers(usersData);
    };
    getUserData();
  }, []);

  const closeDropDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target !== buttonRef.current) {
      setShowDropdown(false);
    }
  };

  return (
    <div
      onClick={(e) => closeDropDown(e)}
      className="App flex flex-col space-y-4 justify-center items-center min-h-screen w-full bg-slate-800"
    >
      <div className="flex justify-between items-center space-x-6 max-w-4xl w-full">
        <h2 className="text-white font-bold text-2xl">Table</h2>
        <div className="text-white font-bold text-2xl flex justify-between items-center space-x-6 ">
          <p
            ref={buttonRef}
            onClick={() => setShowDropdown((prevState) => !prevState)}
            className="cursor-pointer relative"
          >
            Sort By
            {showDropdown && (
              <div
                onClick={() => console.log("clicked")}
                className="absolute z-10 top-10"
              >
                Nice
              </div>
            )}
          </p>

          <input placeholder="search" className="p-2 rounded-md" />
          <button className="bg-blue-800 px-6 py-2 rounded-md">Search</button>
        </div>
      </div>
      <table className="table-fixed border-separate border border-slate-500 text-xl font-semibold text-white">
        <thead className="bg-slate-700">
          <tr>
            <th className="border border-slate-600 px-6 py-4">Name</th>
            <th className="border border-slate-600 px-6 py-4">Username</th>
            <th className="border border-slate-600 px-6 py-4">Phone</th>
            <th className="border border-slate-600 px-6 py-4">Website</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border border-slate-700 px-6 py-4">{user.name}</td>
              <td className="border border-slate-700 px-6 py-4">
                {user.username}
              </td>
              <td className="border border-slate-700 px-6 py-4">
                {user.phone}
              </td>
              <td className="border border-slate-700 px-6 py-4">
                {user.website}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
