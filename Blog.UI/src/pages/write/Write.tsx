import { useContext, useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { Context } from "../../context/Context";
import { config } from "../../config/Environment";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import classNames from "classnames";
import "../../styles.scss";

interface NewPost {
  id: number;
  title: string;
  text: string;
  userId: number;
}

export default function Write() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const { user, token } = useContext(Context);
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (!user) return;

    const newPost: NewPost = {
      id: -1,
      title: title,
      text: text,
      userId: user.userId,
    };

    const res = await axios.post(
      `${config.APP_URL}/posts`,
      {
        id: newPost.id,
        title: newPost.title,
        text: newPost.text,
        userId: newPost.userId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    navigate(`/post/${res.data.id}`);
  };

  return (
    <div className="write">
      <div className="write-container">
        <form onSubmit={handleSubmit} className="p-fluid write-form">
          <InputText
            id="title"
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
            placeholder="Başlık"
            className={classNames({ "p-invalid": submitted && !title })}
          />
          {submitted && !title && (
            <small className="p-error">Başlık gerekli.</small>
          )}
          <InputTextarea
            id="content"
            value={text}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setText(e.target.value)
            }
            rows={10}
            placeholder="İçerik"
            className={classNames({ "p-invalid": submitted && !text })}
          />
          {submitted && !text && (
            <small className="p-error">İçerik gerekli.</small>
          )}
          <Button
            label="Yayınla"
            icon="pi pi-check"
            className="write-submit"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
}
