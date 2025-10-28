import React, { FC, useState } from "react";
import Link from "next/link";
import { PostDataInterface } from "../interfaces";
import styles from "@/styles/post.module.css";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { Button, TextField } from "@mui/material";
import SendData from "../send_data";
import { useReplyContext } from "../context/Reply_context";
import { useRouter } from "next/router";
import { useLoadingContext } from "../context/loading_context";

interface Props {
  postData: PostDataInterface;
  isAuthor: boolean;
}

const EditPost: FC<Props> = ({ postData }) => {
  const [data, setData] = useState(postData);
  const [caption, setCaption] = useState(data.post_caption);
  const { setReply } = useReplyContext();
  const router = useRouter();

  const { setLoading } = useLoadingContext();

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!caption.trim() || data.post_caption === caption.trim()) {
      setReply("No changes made");
      return;
    }
    setLoading(true);
    const newData = {
      post_name: data.post_name,
      post_user_id: data.post_user_id,
      post_caption: caption.trim(),
    };

    const response = await SendData({
      data: newData,
      route: "/api/posts/update_post",
    });
    setLoading(false);

    if (response) {
      setReply(response.message);
      if (response.status == 200) {
        setData((prev) => ({ ...prev, post_caption: caption.trim() }));
      }
    }
  };

  async function deletePost() {
    const confirmation = confirm("Are You Sure to Delete This Post");

    if (confirmation) {
      setLoading(true);
      const newData = {
        post_name: data.post_name,
        post_user_id: data.post_user_id,
      };

      const response = await SendData({
        data: newData,
        route: "/api/posts/delete_post",
      });
      setLoading(false);
      if (response) {
        setReply(response.message);
        if (response.status == 200) {
          router.push("/account");
        }
      }
    }
  }

  return (
    <article className={styles.single_post}>
      <header>
        <img src={`https://ui-avatars.com/api/?name=${data.post_user_name}`} />
        <Link href={`/profile/${data.post_user_id}`}>
          <span>{data.post_user_name}</span>
        </Link>
      </header>

      <main>
        <Image
          width={600}
          height={400}
          priority
          alt={data.post_name}
          src={data.post_image_url}
          placeholder="blur"
          blurDataURL={"/blur.png"}
        />
        <span suppressHydrationWarning>
          created{" "}
          {formatDistanceToNow(new Date(data.post_time), {
            addSuffix: true,
          }) || "..."}
        </span>
        <form onSubmit={submitForm}>
          <TextField
            className={styles.input}
            onChange={(event) => {
              setCaption(event.target.value);
            }}
            fullWidth
            value={caption}
            required
          ></TextField>
          <Button
            type="submit"
            className={styles.button}
            fullWidth
            variant="contained"
          >
            Submit
          </Button>
          <Button
            className={styles.button}
            fullWidth
            variant="contained"
            color="error"
            onClick={deletePost}
          >
            Delete Post
          </Button>
        </form>
      </main>
    </article>
  );
};

export default EditPost;
