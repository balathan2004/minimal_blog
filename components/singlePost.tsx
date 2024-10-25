import React, { FC } from "react";
import Link from "next/link";
import { PostDataInterface } from "./interfaces";
import styles from "@/styles/post.module.css";
interface Props {
  postData: PostDataInterface;
}

const SinglePost: FC<Props> = ({ postData }) => {
  return (
    <article className={styles.single_post}>
      <header>
        <Link href={`/profile/${postData.post_user_id}`}>
          <img
            src={`https://ui-avatars.com/api/?name=${postData.post_user_name}`}
          />

          <span>{postData.post_user_name}</span>
        </Link>
      </header>
      <Link href={`/posts/${postData.post_name}`}>
        <main>
          <img src={postData.post_image_url} />
          <p>
            <span>{postData.post_user_name}</span>
            {postData.post_caption}
          </p>
        </main>
      </Link>
    </article>
  );
};

export default SinglePost;
