import React, { useState, useEffect } from "react";
import "./styles.css";
import axios from "axios";

export default function App() {
  const [id, setId] = useState(1);
  const [idFromButtonClick, setIdFromButtonClick] = useState(1);
  const [post, setPost] = useState({});
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIdFromButtonClick(id);
  };

  const handleInputTextBox = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    event.persist();
    const { value } = event.target;
    setId(value);
  };

  const fetchPostById = () => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${idFromButtonClick}`)
      .then((res) => setPost(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchPostById();
  }, [idFromButtonClick]);
  return (
    <div className="App">
      <input type="text" value={id} onChange={(e) => handleInputTextBox(e)} />
      <button onClick={handleClick}> Click </button>
      <p>{post.id + ". " + post.title}</p>
    </div>
  );
}
