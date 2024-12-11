import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { Card } from "primereact/card";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { config } from "../../config/Environment";
import "../../styles.scss";

interface FormInputs {
  userName: string;
  email: string;
  password: string;
  fullName: string;
}

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setError(null);
    try {
      const res = await axios.post(`${config.APP_URL}/auth/register`, {
        userName: data.userName,
        email: data.email,
        password: data.password,
        fullName: data.fullName,
      });
      if (res.data) navigate("/login");
    } catch (err: any) {
      if (err.response && err.response.data) {
        setError(
          err.response.data.message || "Bir hata oluştu, lütfen tekrar deneyin."
        );
      } else {
        setError("Bir hata oluştu, lütfen tekrar deneyin.");
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center register p-5 mt-4 mb-4">
      <Card
        title="Kayıt Ol!"
        className="shadow-3 p-4 w-100 register-card mb-4"
        style={{ maxWidth: "400px" }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="fullName" className="form-label">
              Ad
            </label>
            <InputText
              id="fullName"
              {...register("fullName", {
                required: "Bu alanın doldurulması zorunludur",
              })}
              className={`form-control ${errors.fullName ? "p-invalid" : ""}`}
              placeholder="Adınızı Giriniz..."
            />
            {errors.fullName && (
              <Message severity="error" text={errors.fullName.message} />
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="userName" className="form-label">
              Kullanıcı Adı
            </label>
            <InputText
              id="userName"
              {...register("userName", {
                required: "Bu alanın doldurulması zorunludur",
              })}
              className={`form-control ${errors.userName ? "p-invalid" : ""}`}
              placeholder="Kullanıcı Adınızı Giriniz..."
            />
            {errors.userName && (
              <Message severity="error" text={errors.userName.message} />
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <InputText
              id="email"
              {...register("email", {
                required: "Bu alanın doldurulması gereklidir",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Lütfen geçerli bir mail adresi giriniz",
                },
              })}
              className={`form-control ${errors.email ? "p-invalid" : ""}`}
              placeholder="Emailinizi Giriniz..."
            />
            {errors.email && (
              <Message severity="error" text={errors.email.message} />
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Şifre
            </label>
            <InputText
              id="password"
              type="password"
              {...register("password", {
                required: "Bu alanın doldurulması gereklidir",
              })}
              className={`form-control ${errors.password ? "p-invalid" : ""}`}
              placeholder="Şifrenizi Giriniz..."
            />
            {errors.password && (
              <Message severity="error" text={errors.password.message} />
            )}
          </div>

          <Button
            label="Kayıt Ol!"
            type="submit"
            className="w-100 p-mt-2 p-button-primary"
          />
        </form>
        <Button
          label="Giriş Yap!"
          className="w-100 mt-2 p-button-text p-mt-2"
          onClick={() => navigate("/login")}
        />
        {error && <Message severity="error" text={error} className="p-mt-2" />}
      </Card>
    </div>
  );
}
