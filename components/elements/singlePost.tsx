import React, { FC } from "react";
import Link from "next/link";
import { PostDataInterface } from "../interfaces";
import styles from "@/styles/post.module.css";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";

interface Props {
  postData: PostDataInterface;
  isAuthor: boolean;
}

const SinglePost: FC<Props> = ({ postData, isAuthor }) => {
  return (
    <article className={styles.single_post}>
      <header>
        <img
          alt={`${postData.post_user_name}'s avatar`}
          src={`https://ui-avatars.com/api/?name=${postData.post_user_name}`}
        />
        <Link
          href={isAuthor ? "/account" : `/profile/${postData.post_user_id}`}
        >
          <span>{postData.post_user_name}</span>
        </Link>
      </header>

      <main>
        <Link
          href={
            isAuthor
              ? `/your_posts/${postData.post_name}`
              : `/posts/${postData.post_name}`
          }
        >
          <Image
            width={600}
            height={400}
            priority={false}
            alt={postData.post_name}
            src={postData.post_image_url||"/blur.png"}
            placeholder="blur"
            blurDataURL="/blur.png"
          />
          <p>
            <span>{postData.post_user_name}</span>
            {postData.post_caption}
          </p>
          <span suppressHydrationWarning>
            created{" "}
            {formatDistanceToNow(new Date(postData.post_time), {
              addSuffix: true,
            })}
          </span>
        </Link>
      </main>
    </article>
  );
};

export default SinglePost;
