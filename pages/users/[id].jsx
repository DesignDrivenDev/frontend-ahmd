import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUser } from "@/app/features/users/userSlice";
import { useRouter } from "next/router";
import { formatDate } from "@/lib/helper";

const UserDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const { selectedUser, loading, error } = useSelector((state) => state.users);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    dateOfBirth: "",
    address: "",
    phone: "",
    gender: "",
  });

  useEffect(() => {
    if (id) {
      dispatch(getUser(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedUser) {
      setUserData({
        name: selectedUser.name || "",
        email: selectedUser.email || "",
        password: selectedUser.password || "", // Preserving password field handling
        dateOfBirth: formatDate(selectedUser.dateOfBirth) || "",
        address: selectedUser.address || "",
        phone: selectedUser.phone || "",
        gender: selectedUser.gender || "", // Ensure default empty string if sex is undefined
      });
    }
  }, [selectedUser]);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateUser({ id, userData }));
    router.push("/users");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.log(error, "user edit or create");
    return <p>Error: {error}</p>;
  }

  return (
    <div className="max-w-2xl mx-auto w-11/12 py-20">
      <h1 className="text-3xl font-bold pb-4">Update User</h1>
      <div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
              placeholder="Name"
              required
              className="w-full p-2 rounded-md border border-gray-500"
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full p-2 rounded-md border border-gray-500"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-2 rounded-md border border-gray-500"
            />
          </div>
          <div>
            <input
              type="tel"
              name="phone"
              value={userData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="w-full p-2 rounded-md border border-gray-500"
            />
          </div>
          <div>
            <input
              type="date"
              name="dateOfBirth"
              value={userData.dateOfBirth}
              onChange={handleChange}
              className="w-full p-2 rounded-md border border-gray-500"
            />
          </div>
          <div>
            <input
              type="text"
              name="address"
              value={userData.address}
              onChange={handleChange}
              placeholder="Address"
              className="w-full p-2 rounded-md border border-gray-500"
            />
          </div>
          <div>
            <select
              name="gender"
              value={userData.gender}
              onChange={handleChange}
              className="w-full p-2 rounded-md border border-gray-500"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-1.5 border border-gray-600 rounded-md hover:bg-slate-400"
          >
            {loading ? "Loading..." : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserDetails;
