import React from "react";
import "../../styles.scss";

const Footer: React.FC = () => {
  const year: number = new Date().getFullYear();

  return (
    <footer className="p-d-flex p-jc-center p-ai-center p-mt-3">
      <div className="footer-content">{`Copyright © for BMEDIUM ${year}`}</div>
    </footer>
  );
};

export default Footer;
