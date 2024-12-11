import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";
import { Menubar } from "primereact/menubar";
import "primeicons/primeicons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../../styles.scss";

interface MenuItem {
  label: string;
  icon: string;
  command: () => void;
}

const TopBar: React.FC = () => {
  const { user, dispatch } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const items: MenuItem[] = [
    {
      label: "AnaSayfa",
      icon: "pi pi-home",
      command: () => navigate("/"),
    },
    {
      label: "Hakkımda",
      icon: "pi pi-user",
      command: () => navigate("/about"),
    },
    {
      label: "Yayınla!",
      icon: "pi pi-pencil",
      command: () => navigate("/write"),
    },
    {
      label: "Haberler",
      icon: "pi pi-newspaper",
      command: () => navigate("/news"),
    },
    user
      ? {
          label: "Çıkış Yap",
          icon: "pi pi-sign-out",
          command: handleLogout,
        }
      : {
          label: "Giriş Yap",
          icon: "pi pi-sign-in",
          command: () => navigate("/login"),
        },
    !user && {
      label: "Kayıt Ol",
      icon: "pi pi-user-plus",
      command: () => navigate("/register"),
    },
  ].filter((item): item is MenuItem => item !== false);

  const handleBlogNameClick = () => {
    navigate("/");
  };

  const start = (
    <div className="topbar-left">
      <i className="fa-solid fa-meteor" style={{ color: "black" }}></i>
      <span className="blog-name" onClick={handleBlogNameClick}>
        BMEDIUM
      </span>
      <div className="social-icons">
        <a
          href="https://www.linkedin.com/in/berkekeceli"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-linkedin"></i>
        </a>
        <a
          href="https://github.com/mehmetberkekeceli"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-github"></i>
        </a>
      </div>
    </div>
  );

  return (
    <div className="topbar">
      <Menubar model={items} start={start} className="topbar-menubar" />
    </div>
  );
};

export default TopBar;
