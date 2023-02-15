import style from "./AddNewColor.module.css";
import { useState, useEffect } from "react";
import Loading from "./Loading";
import { AiFillDelete } from "react-icons/ai";
import { GrEdit } from "react-icons/gr";
import { useHistory } from "react-router-dom";
import axios from "axios";
const AddNewColor = () => {
  const history = useHistory();
  const [redColor, setRedColor] = useState(0);
  const [blueColor, setBlueColor] = useState(0);
  const [greenColor, setGreenColor] = useState(0);
  const [allColorData, setAllColorData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const DeleteHandler = (key) => {
    setIsLoading(true);
    const userid = localStorage.getItem("user");
    axios
      .delete(
        `https://color-picker-ee145-default-rtdb.firebaseio.com/users/${userid}/${key}.json`
      )
      .then((response) => {
        getDataFromServer();
        setIsLoading(false);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const EditHandler = (key) => {
    console.log("i am inside");
    setIsLoading(true);
    const userid = localStorage.getItem("user");
    axios
      .put(
        `https://color-picker-ee145-default-rtdb.firebaseio.com/users/${userid}/${key}.json`,
        {
          red: redColor,
          green: greenColor,
          blue: blueColor,
        }
      )
      .then((response) => {
        getDataFromServer();
        setIsLoading(false);
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const newDivs = allColorData.map((box, index) => {
    return (
      <div
        key={index}
        style={{
          width: "6rem",
          height: "6rem",
          borderRadius: "0%",
          display: "flex",
          justifyContent: "space-between",
          fontSize: "2rem",
          cursor: "pointer",
          backgroundColor: `rgba(${box.red}, ${box.green}, ${box.blue})`,
        }}
      >
        <AiFillDelete onClick={() => DeleteHandler(box.key)} />
        <GrEdit onClick={() => EditHandler(box.key)} />
      </div>
    );
  });
  const redColorHandler = (event) => {
    setRedColor(event.target.value);
  };
  const greenColorHandler = (event) => {
    setGreenColor(event.target.value);
  };
  const blueColorHandler = (event) => {
    setBlueColor(event.target.value);
  };
  const addNewColorHandler = async (event) => {
    event.preventDefault();
    const userid = localStorage.getItem("user");
    setIsLoading(true);
    await axios
      .post(
        `https://color-picker-ee145-default-rtdb.firebaseio.com/users/${userid}.json`,
        {
          red: redColor,
          green: greenColor,
          blue: blueColor,
        }
      )
      .then((response) => {
        getDataFromServer();
        setIsLoading(false);
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const getDataFromServer = async (event) => {
    const userKey = localStorage.getItem("user");
    axios
      .get(
        `https://color-picker-ee145-default-rtdb.firebaseio.com/users/${userKey}.json`
      )
      .then((response) => {
        let colorDataContenner = [];
        for (let key in response.data) {
          let colorData = {
            red: response.data[key].red,
            blue: response.data[key].blue,
            green: response.data[key].green,
            key: key,
          };
          colorDataContenner.push(colorData);
        }
        setAllColorData(colorDataContenner);
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  useEffect(() => {
    getDataFromServer();
  }, []);
  const logoutHandler = () => {
    history.replace("/");
    localStorage.removeItem("key");
  };
  return (
    <div className={style.addNew}>
      {isLoading ? (
        <Loading />
      ) : (
        <form>
          <div
            style={{
              width: "8rem",
              height: "8rem",
              backgroundColor: `rgba(${redColor}, ${greenColor}, ${blueColor})`,
            }}
          ></div>
          <input
            onChange={redColorHandler}
            value={redColor}
            min={"0"}
            max={"255"}
            type={"range"}
          />
          <input
            onChange={greenColorHandler}
            value={greenColor}
            min={"0"}
            max={"255"}
            type={"range"}
          />
          <input
            onChange={blueColorHandler}
            value={blueColor}
            min={"0"}
            max={"255"}
            type={"range"}
          />

          <button type="submit" onClick={addNewColorHandler}>
            Add Color
          </button>
          <button onClick={logoutHandler}>Logout</button>
        </form>
      )}
      {!isLoading && <div className={style.outputBox}>{newDivs}</div>}
    </div>
  );
};
export default AddNewColor;
