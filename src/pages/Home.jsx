import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Navigate } from "react-router-dom";
import Todo from "../components/Todo";
import { Context, server } from "../main";

const Home = () => {
  const { isAuthenticated } = useContext(Context);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [task, setTask] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const updateHandler = async (id) => {
    try {
      const { data } = await axios.put(
        `${server}/task/${id}`,
        {},
        { withCredentials: true }
      );

      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.respose.data.message);
    }
  };
  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`${server}/task/${id}`, {
        withCredentials: true,
      });

      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.respose.data.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        `${server}/task/create`,
        { title, description },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setTitle("");
      setDescription("");
      toast.success("Task added successfully");
      // console.log(data);
      setIsLoading(false);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);

      setIsLoading(false);
      // console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    axios
      .get(`${server}/task/all`, { withCredentials: true })
      .then((res) => {
        setTask(res.data.userTasks);
      })
      .catch((err) => console.log(err.message));
  }, [refresh]);

  if (!isAuthenticated) return <Navigate to={"/login"} />;

  return (
    <div className="container">
      <div className="login">
        <section>
          <form action="" onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              value={title}
              placeholder={"Title"}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <input
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              required
            />
            <button type="submit" disabled={isLoading}>
              Add Todo
            </button>
          </form>
        </section>
      </div>
      <div className="todosContainer">
        {task.map((task) => (
          <Todo
            key={task._id}
            title={task.title}
            description={task.description}
            isCompleted={task.isCompleted}
            updateHandler={updateHandler}
            deleteHandler={deleteHandler}
            id={task._id}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
