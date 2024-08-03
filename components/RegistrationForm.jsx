import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "@/app/features/users/userSlice";
import { useRouter } from "next/router";

const RegisterForm = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    dateOfBirth: "",
    address: "",
    phone: "",
    gender: "", // Add sex field
  });
  const router = useRouter();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.users.loading);
  const error = useSelector((state) => state.users.error);
  const user = useSelector((state) => state.users.users);

  // console.log(userData);
  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  // console.log(user, error, "user data form the slice");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(registerUser(userData));
    router.push("/users");
    setUserData({
      name: "",
      email: "",
      password: "",
      dateOfBirth: "",
      address: "",
      phone: "",
      gender: "", // Reset sex field
    });
  };

  return (
    <div className="max-w-2xl mx-auto w-11/12 py-20">
      <h1 className="text-3xl font-bold pb-4">Register</h1>
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
              required
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
              required
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-1.5 border border-gray-600 rounded-md hover:bg-slate-400"
          >
            {loading ? "Loading..." : "Register"}
          </button>
        </form>
      </div>
      {user && <p>{user.message}</p>}
      {user?.name && <p>Registration successful! Welcome, {user?.name}!</p>}
    </div>
  );
};

export default RegisterForm;
