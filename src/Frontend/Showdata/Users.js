import React, { useState, useEffect, useId } from "react";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  setDoc,
} from "firebase/firestore/lite";

import { firestore } from "../../config/firebase";

import "../../../node_modules/bootstrap/dist/js/bootstrap.bundle";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default function Users() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataToBeEdit, setDataToBeEdit] = useState({});

  const handleChange = (e) => {
    setDataToBeEdit({ ...dataToBeEdit, [e.target.name]: e.target.value });
  };

  const collectionName = "users";
  const docsCollectionRef = collection(firestore, collectionName);

  const readDocs = async () => {
    let array = [];

    const querySnapshot = await getDocs(docsCollectionRef);
    // setLoading(true);
    querySnapshot.forEach((doc) => {
      array.push({ ...doc.data(), id: doc.id });
    });
    setLoading(false);

    setDocuments(array);
  };
  useEffect(() => {
    readDocs();
  }, []);
  const handleEdit = (docu) => {
    console.log(docu.id);
    setDataToBeEdit(docu);
    console.log(docu);
  };

  const handleUpdate = async (docu) => {
    await setDoc(doc(firestore, "users", docu.id), docu, { merge: true });

    console.log("document updated");

    let newUsers = documents.map((oldUser) => {
      if (oldUser.id === docu.id) {
        return docu;
      } else {
        return oldUser;
      }
    });
    toast.success("Users Updated", {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setDocuments(newUsers);

    setDataToBeEdit({});
  };

  const handleDelete = async (docu) => {
    await deleteDoc(doc(firestore, "users", docu.id));
    console.log("document deleted");

    let newDocument = documents.filter((newDoc) => {
      return docu.id !== newDoc.id;
    });
    toast.error("User Is Delete", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setDocuments(newDocument);
  };

  return (
    <>
      <div className="container text-center  mt-5">
        {loading ? (
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table">
              <thead className="table-info">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Number</th>
                  <th scope="col">Update</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc, i) => (
                  <tr key={i}>
                    <td>{doc.userName}</td>
                    <td>{doc.userNum}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-success btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={() => {
                          handleEdit(doc);
                        }}
                      >
                        Update
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => {
                          handleDelete(doc);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-center" id="exampleModalLabel">
                Update User
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <label className="py-2">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Your Name"
                  name="userName"
                  value={dataToBeEdit.userName}
                  onChange={handleChange}
                />
                <label className="py-2">PhoneNumber</label>
                <input
                  type="Number"
                  className="form-control"
                  placeholder="Enter Your number"
                  name="userNum"
                  value={dataToBeEdit.userNum}
                  onChange={handleChange}
                />
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                    onClick={() => {
                      handleUpdate(dataToBeEdit);
                    }}
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
