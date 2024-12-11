import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { config } from "../../config/Environment";
import { Context } from "../../context/Context";
import { login, selectToken, selectUser } from "../../redux/UserSlice";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles.scss";

export default function Login(): JSX.Element {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch, isFetching, setToken } = useContext(Context);
  const user = useSelector(selectUser);
  const userToken = useSelector(selectToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && userToken) {
      navigate("/");
    }
  }, [navigate, user, userToken]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({ type: "LOGIN_START" });

    try {
      const res = await axios.post(`${config.APP_URL}/auth/login`, {
        userName,
        password,
      });
      dispatch(login(res.data));
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      setToken(res.data.accessToken);
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  //console.log("Your Token", userToken);

  return (
    <div className="d-flex justify-content-center align-items-center login p-5 mt-4 mb-4">
      <Card
        title="Giriş Yap!"
        className="shadow-3 p-4 w-100 register-card mb-4"
        style={{ maxWidth: "400px" }}
      >
        <form className="loginForm" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Kullanıcı Adınız
            </label>
            <InputText
              id="username"
              className="form-control"
              placeholder="Kullanıcı Adınızı Giriniz..."
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Şifre
            </label>
            <Password
              id="password"
              className="form-control"
              placeholder="Şifrenizi Giriniz..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              inputClassName="p-password-input"
            />
          </div>

          <Button
            label="Giriş!"
            type="submit"
            className="w-100 p-mt-2 p-button-primary"
            disabled={isFetching}
          />
        </form>
        <Button
          label="Kayıt Ol!"
          className="w-100 mt-2 p-button-text p-mt-2"
          onClick={() => navigate("/register")}
        />
      </Card>
    </div>
  );
}
