import { deleteUser, getUsers } from "@/app/features/users/userSlice";
import Modal from "@/components/Modal";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Users = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [checkedData, setCheckedData] = useState("");
  const dispatch = useDispatch();
  const { users, loading, error, searchData } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) {
    console.log(error, "users");
    return <div>Something went wrong!</div>;
  }
  if (!users) return <div>No user</div>;

  return (
    <div>
      <h1 className="text-xl font-bold pb-3">User List</h1>
      <div className="flex items-center gap-2 pb-4">
        <div className="flex gap-2">
          <input
            type="radio"
            name="gender"
            id="all"
            value=""
            checked={checkedData === ""}
            onChange={(e) => setCheckedData(e.target.value)}
          />
          <label htmlFor="all">All</label>
        </div>
        <div className="flex gap-2">
          <input
            type="radio"
            name="gender"
            id="male"
            value="Male"
            checked={checkedData === "Male"}
            onChange={(e) => setCheckedData(e.target.value)}
          />
          <label htmlFor="male">Male</label>
        </div>
        <div className="flex gap-2">
          <input
            type="radio"
            name="gender"
            id="female"
            value="Female"
            checked={checkedData === "Female"}
            onChange={(e) => setCheckedData(e.target.value)}
          />
          <label htmlFor="female">Female</label>
        </div>
      </div>
      <div>
        {users.length > 0 ? (
          users
            .filter((user) =>
              searchData.length === 0
                ? user
                : user.name.toLowerCase().includes(searchData.toLowerCase())
            )
            .filter((user) =>
              checkedData ? user.gender === checkedData : user
            )
            .map((user) => (
              <div
                className="flex flex-wrap justify-between items-center border border-gray-400 p-2 mb-2 gap-2"
                key={user._id}
              >
                <Link
                  href={`/users/${user._id}`}
                  className="font-semibold hover:underline"
                >
                  {user.name}
                </Link>
                <p>{user.email}</p>
                <p>{user.gender}</p>

                <button
                  onClick={() => setModalOpen(true)}
                  className="font-semibold text-sm"
                >
                  View
                </button>
                <Link href={`/users/${user._id}`} className="text-blue-800">
                  Edit
                </Link>
                <button
                  onClick={() => dispatch(deleteUser(user._id))}
                  className="text-red-400"
                >
                  Delete
                </button>
                <Modal
                  isOpen={isModalOpen}
                  closeModal={() => setModalOpen(false)}
                  title="My Modal"
                >
                  <p>{user?.phone}</p>
                  <p>{user?.address}</p>
                  <p>{user.dateOfBirth && user?.dateOfBirth.slice(0, 10)}</p>
                </Modal>
              </div>
            ))
        ) : (
          <div className="text-black">mfmsngsnfdgnfdng</div>
        )}
      </div>
    </div>
  );
};

export default Users;
