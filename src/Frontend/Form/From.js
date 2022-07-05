import React, { useState } from "react";

import { collection, addDoc } from "firebase/firestore/lite";

import { firestore } from "../../config/firebase";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default function From() {
  const [name, setName] = useState("");

  const [number, setNumber] = useState("");

  const [array, setArray] = useState([]);

  const HandleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      userName: name,
      userNum: number,
    };

    setArray([...array, formData]);

    try {
      const docRef = await addDoc(collection(firestore, "users"), formData);
      console.log("Document written with ID: ", docRef.id);
      toast.success("User Has Been Added", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setName("");
      setNumber("");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-center my-5">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-8 col-lg-4  mx-auto">
              <div className="card p-3">
                <h5 className="text-center ">ADD USERS</h5>
                <hr />

                <form onSubmit={HandleSubmit}>
                  <label className="py-2">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Your Name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label className="py-2">PhoneNumber</label>
                  <input
                    type="Number"
                    className="form-control"
                    placeholder="Enter Your number"
                    name="number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                  />
                  <button className="btn btn-success w-100 mt-2">
                    ADD USER
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
