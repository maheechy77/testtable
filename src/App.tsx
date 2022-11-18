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
  const [showAsnDecDropdown, setAsnDecShowDropdown] = useState<Boolean>(false);
  const [dropdownText, setDropdownText] = useState<string>("-----");
  const [asnDecText, setAsnDecText] = useState<string>("-----");
  const buttonRef = useRef<any>();
  const asnDecbuttonRef = useRef<any>();
  const searchDataRef = useRef<any>();

  useEffect(() => {
    const getUserData = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const usersData: usersType[] = await response.json();
      setUsers(usersData);
    };
    console.log(users);
    getUserData();
  }, []);

  const searchData = () => {
    let searchValue = searchDataRef.current.value;
    const filteredValue = users.filter((user) =>
      Object.values(user).some(
        (val) => typeof val === "string" && val.includes(searchValue)
      )
    );
    setUsers(filteredValue);
  };

  const closeDropDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target !== buttonRef.current) {
      setShowDropdown(false);
    }
    if (e.target !== asnDecbuttonRef.current) {
      setAsnDecShowDropdown(false);
    }
  };

  const setSortValue = (sortText: string, sortType: string): void => {
    if (sortType !== asnDecText) {
      setAsnDecText(sortType);
      if (sortText !== "-----") {
        let tempUsers = users.sort((a, b): any => {
          if (sortText === "name") {
            return asnDecText === "asn"
              ? b.name.localeCompare(a.name)
              : a.name.localeCompare(b.name);
          } else if (sortText === "phone") {
            return asnDecText === "asn"
              ? b.phone.localeCompare(a.phone)
              : a.phone.localeCompare(b.phone);
          } else if (sortText === "username") {
            return asnDecText === "asn"
              ? b.username.localeCompare(a.username)
              : a.username.localeCompare(b.username);
          }
        });
        setUsers(tempUsers);
      } else {
        let tempUsers = users.sort((a, b) => {
          return asnDecText === "asn" ? a.id - b.id : b.id - a.id;
        });

        setUsers(tempUsers);
      }

      setDropdownText(sortText);
    } else {
      console.log("2", sortType === asnDecText, asnDecText, sortType);
      let tempUsers = users.sort((a, b): any => {
        if (sortText === "name") {
          return asnDecText === "asn"
            ? b.name.localeCompare(a.name)
            : a.name.localeCompare(b.name);
        } else if (sortText === "phone") {
          return asnDecText === "asn"
            ? b.phone.localeCompare(a.phone)
            : a.phone.localeCompare(b.phone);
        } else if (sortText === "username") {
          return asnDecText === "asn"
            ? b.username.localeCompare(a.username)
            : a.username.localeCompare(b.username);
        }
      });
      setUsers(tempUsers);
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
          <p>Sort By:</p>
          <p
            ref={buttonRef}
            onClick={() => setShowDropdown((prevState) => !prevState)}
            className="cursor-pointer relative"
          >
            {dropdownText}
            {showDropdown && (
              <div className="absolute z-10 top-10 text-base list-none bg-slate-500 text-gray-200 flex flex-col items-center space-y-4 px-3 py-2">
                <li onClick={() => setSortValue("name", asnDecText)}>Name</li>
                <li onClick={() => setSortValue("username", asnDecText)}>
                  Username
                </li>
                <li onClick={() => setSortValue("phone", asnDecText)}>Phone</li>
              </div>
            )}
          </p>
          <p
            ref={asnDecbuttonRef}
            onClick={() => setAsnDecShowDropdown((prevState) => !prevState)}
            className="cursor-pointer relative"
          >
            {asnDecText}
            {showAsnDecDropdown && (
              <div className="absolute z-10 top-12 -left-4 text-base list-none bg-slate-500 text-gray-200 flex flex-col items-center space-y-4 px-3 py-2">
                <li onClick={() => setSortValue(dropdownText, "asn")}>
                  Ascending
                </li>
                <li onClick={() => setSortValue(dropdownText, "des")}>
                  Descending
                </li>
              </div>
            )}
          </p>

          <input
            ref={searchDataRef}
            placeholder="search"
            className="p-2 rounded-md text-black"
          />
          <button
            onClick={searchData}
            className="bg-blue-800 px-6 py-2 rounded-md"
          >
            Search
          </button>
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
