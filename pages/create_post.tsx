import React, { FC, useEffect, useState } from "react";
import SendFile from "@/components/sendFile";
import styles from "@/styles/create_post.module.css";
import { useRouter } from "next/router";
import { Button, TextField } from "@mui/material";
import Head from "next/head";
import { useReplyContext } from "@/components/context/Reply_context";
import { useLoadingContext } from "@/components/context/loading_context";
import { useAuth } from "@/components/redux/api/authSlice";
const SignIn: FC = () => {
  const [image, setImage] = useState<null | Blob>(null);
  const [showImage, setShowImage] = useState("");
  const [caption, setCaption] = useState("");

  const router = useRouter();
  const { loading, setLoading } = useLoadingContext();
  const { setReply } = useReplyContext();

  const { userData } = useAuth();

  const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (caption.length > 0 && image) {
      console.log("submitted");
      setLoading(true);
      const form = new FormData();
      form.append("file", image);
      form.append("caption", caption);
      // form.append("userId", userCred.uid);
      // form.append("username", userCred.display_name);
      const response = await SendFile({
        data: form,
        route: "/api/create_post",
        // "https://file-handler-server-production.up.railway.app/minimal_blog/create_post",
      });

      setLoading(false);
      if (response) {
        setReply(response.message);
        if (response.status == 200) {
          router.push("/blog");
        }
      }
    } else {
      console.error("All fields are required");
      return; // Don't submit form if not all fields are filled in.  This prevents errors in the backend.  You can add more validation here if needed.  For example, you could check if the caption is not too long.  But in this case, we're just making sure all fields are filled in.
    }
  };

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;
    if (file && file.length > 0) {
      setImage(file[0]);
      setShowImage(URL.createObjectURL(file[0]));
    }
  };

  const handleInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = event.target;

    if (value.trim().length < 1000) {
      setCaption(value);
    } else {
      setReply("value limit reached");
    }
  };

  if (!userData) {
    return (
      <div className="container">
        <div className="container_spacer"></div>
        <div className={styles.post_container}></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Create Post</title>
      </Head>

      <div className="container">
        <div className="container_spacer"></div>
        <div className={styles.post_container}>
          <article>
            <h1>Create Post</h1>
            <header>
              <img src={userData.profile_url}></img>
              <span>{userData.display_name}</span>
            </header>
            <form onSubmit={handleForm}>
              <TextField
                className={styles.textarea}
                maxRows={5}
                onChange={handleInput}
                required
                multiline
                fullWidth
                value={caption}
                placeholder="Enter caption"
              />
              <input
                onChange={handleImage}
                accept="image/*"
                type="file"
              ></input>
              <img src={showImage}></img>
              <Button
                fullWidth
                variant="contained"
                type="submit"
                disabled={loading}
              >
                {loading ? "Posting" : "Post"}
              </Button>
            </form>
          </article>
        </div>
        <div className="container_spacer"></div>
      </div>
    </>
  );
};

export default SignIn;
