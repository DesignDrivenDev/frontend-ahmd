import DownloadProductsButton from "@/components/DownloadProductsButton";
import Login from "@/components/Login";
import RegisterForm from "@/components/RegistrationForm";
import TodoList from "@/components/todos";
import { useEffect, useState } from "react";

export default function Home() {
  useEffect(() => {
    const isAuthenticated = () => !!localStorage.getItem("token");
    console.log(isAuthenticated(), "isAuthenticated");
  }, []);

  // const [file, setFile] = useState(null);

  // const handleFileChange = (e) => {
  //   setFile(e.target.files[0]);
  // };

  // const handleFileUpload = async () => {
  //   const formData = new FormData();
  //   formData.append("file", file);

  //   try {
  //     const response = await axios.post(
  //       "http://localhost:5000/upload",
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  return (
    <main>
      {/* <TodoList /> */}
      {/* <Home /> */}
      <p>Hello world</p>
      {/* {isAuthenticated ? <Home /> : <Login />} */}

      {/* <div className="py-20 ">
        <input type="file" onChange={handleFileChange} />
        <button
          onClick={handleFileUpload}
          className="border border-black px-4 py-0.5 rounded-sm"
        >
          Upload
        </button>
      </div>
      <div>
        <DownloadProductsButton />
      </div> */}
    </main>
  );
}
