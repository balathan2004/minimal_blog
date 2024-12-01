import React, { FC } from "react";
import { GetServerSideProps } from "next";
import styles from "@/styles/blog.module.css";
import { PostDataInterface, PostResponseConfig } from "@/components/interfaces";
import SinglePost from "@/components/singlePost";
interface Props {
  postData: PostDataInterface[] | null;
}

const Home: FC<Props> = ({ postData }) => {
  console.log("postData", postData);
  return (
    <div className="container">
      <div className="container_spacer"></div>
      <div className={styles.blog_container}>
      {postData?.map((item) => (
        <SinglePost key={item.post_name}  postData={item} />
      ))}
      </div>
      <div className="container_spacer"></div>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const apiUrl =
    process.env.NODE_ENV === "production"
      ? `${process.env.DOMAIN_URL?.replace(/^"|"$/g, '')}/api/get_posts`
      : "http://localhost:3000/api/get_posts";

  console.log("url", apiUrl);
  const response = await fetch(apiUrl,{
    method: 'GET',
    headers:{
      "minimal-access-token":"light@blog2406"
    }
  });
  const res: PostResponseConfig = await response.json();

  return {
    props: { postData: res.postData },
  };
};
