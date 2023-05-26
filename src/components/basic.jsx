import React from "react";
import "./basic.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Basic = () => {
  let [contents, setContents] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const loadData = async () => {
    await axios
      .get("http://localhost:8000/api/v1/contents")
      .then((res) => {
        setContents(res.data.contents);
      })
      .catch((err) => console.log(err));
  };
  console.log(contents);
  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/contents",
        {
          Content: inputValue,
        }
      );
      const newNote = response.data;
      setContents([...contents, newNote]);
      setInputValue("");
      loadData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/contents/${id}`);
      loadData();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="header">
        <h2>Note App</h2>
      </div>
      <div className="main">
        <div>
          <textarea
            name=""
            id=""
            onChange={(e) => setInputValue(e.target.value)}
            cols="50"
            rows="10"
            placeholder="Title"
          ></textarea>
          <button onClick={handleSubmit}>+</button>
        </div>
      </div>
      <div className="container">
        {contents?.map((content) => {
          return (
            <div className="content" key={content.ContentId}>
              <button onClick={() => handleDelete(content.ContentId)}>
                <i class="fa-solid fa-trash"></i>
              </button>
              {content.Content}
            </div>
          );
        })}
      </div>
      ;
    </div>
  );
};

export default Basic;
