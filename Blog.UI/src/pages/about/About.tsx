import React from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import "../../styles.scss";
import ProfilePhoto from "../../assets/ProfilePhoto.jpg";

const About: React.FC = () => {
  return (
    <div className="about">
      <Card className="about-card">
        <div className="about-header">
          <img className="about-profile" src={ProfilePhoto} alt="Profile" />
          <h1 className="head-profile">
            MBRKCL <i className="fa-solid fa-rocket"></i>
          </h1>
          <p className="about-text">
            Merhaba! Ben Berke, 1996 yılında Ankara'da doğdum ve Karabük
            Üniversitesinden lisans mezunuyum. Şu anda Yönetim Bilişim
            Sistemleri alanında 2. lisans eğitimime devam ediyorum. Teknolojiye
            olan ilgim çocukluk yıllarıma dayanıyor; bilgisayar oyunları ve spor
            da hobilerim arasında. Yaklaşık 2 yıldır yazılım geliştirme ile
            ilgileniyorum ve özellikle web teknolojilerine yoğunlaşıyorum. Java
            (Spring) & React ve C#(.NET) & Angular üzerine aldığım eğitimler
            sayesinde bu alandaki yetkinliğimi artırıyorum. Şu anda bir projede
            bu teknolojileri kullanarak kendimi geliştirmeye devam ediyorum.
            <br />
            İletişim: berke.keceli96@gmail.com
          </p>
        </div>
        <div className="about-footer">
          <h2 className="about-follow">Projelerimi Takip Etmek İster Misin?</h2>
          <Button
            icon="pi pi-github"
            className="p-button-rounded p-button-secondary"
            onClick={() =>
              window.open("https://github.com/mehmetberkekeceli", "_blank")
            }
          />
        </div>
      </Card>
    </div>
  );
};

export default About;
