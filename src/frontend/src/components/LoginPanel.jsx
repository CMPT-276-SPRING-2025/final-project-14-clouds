import { useEffect, useState } from "react";
import "../styling/Login.css";
import X from "../assets/letter-x.png";
import { useNavigate } from "react-router-dom";

function LoginPanel({ displayStatus, setter }) {
  const [errorStatus, setErrorStatus] = useState("none");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <>
      <div className="loginPanel" style={{ display: displayStatus }}>
        <img
          onClick={() => setter("none")}
          src={X}
          alt="cancel icon"
          style={{ height: "40px" }}
        />

        <h1 style={{ top: "3vh", left: "11vw" }}>Login</h1>

        <div className="inputs">
          <input
            placeholder="Username"
            onChange={(event) => setUsername(event.target.value)}
          />
          <input
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
            style={{ marginTop: "5vh" }}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "2vh",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <p style={{ display: errorStatus }}>
            *ERROR: Username or Password is not filled in *
          </p>
          <br></br>

          <button
            onClick={() => {
              if (username === "" || password === "") {
                setErrorStatus("block");
              } else {
                navigate("/Dashboard");
              }
            }}
            className="formButton"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default LoginPanel;
