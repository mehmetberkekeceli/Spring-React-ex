import "../../styles.scss";
import HomePhoto from "../../assets/HomePhoto.png";

const Header = (): JSX.Element => {
  return (
    <div className="header">
      <div className="header-titles">
        <img className="header-img" src={HomePhoto} alt="" />
      </div>
    </div>
  );
};

export default Header;
