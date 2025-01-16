import React, { FC, useState } from "react";
import { GetServerSideProps } from "next";
import { debounce } from "lodash";
import styles from "@/styles/blog.module.css";
import { PostDataInterface, PostResponseConfig } from "@/components/interfaces";
import SinglePost from "@/components/elements/singlePost";
import InfiniteScroll from "react-infinite-scroller";
import { useUserContext } from "@/components/context/user_context";
import { CircularProgress } from "@mui/material";

interface Props {
  initialPostData: PostDataInterface[] | null;
}

const Home: FC<Props> = ({ initialPostData }) => {
  const [renderPostData, setRenderPostData] = useState<
    PostDataInterface[] | null
  >(initialPostData || []);
  const [startFrom, setStartFrom] = useState(1);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const [loading, setLoading] = useState(false);

  const { userCred } = useUserContext();

  const fetchMorePosts = async () => {
    try {
      const response = await fetch(`/api/get_posts?page=${startFrom}&limit=5`);
      if (response.ok) {
        const data: PostResponseConfig = await response.json();
        console.log(data);

        if (data.postData && data.postData.length > 0) {
          setRenderPostData((prevData) => [
            ...(prevData || []),
            ...(data.postData || []),
          ]);
          setStartFrom((prev) => prev + 1);
        } else {
          setHasMorePosts(false); // No more posts to load
        }
      } else {
        console.error("Failed to fetch more posts");
        setHasMorePosts(false);
      }
    } catch (error) {
      console.error("Error fetching more posts:", error);
    }
  };

  const debouncedFetchMorePosts = debounce(async () => {
    await fetchMorePosts();
    setLoading(false); // Stop loading after fetchMorePosts finishes
  }, 1000); // 1 second debounce delay

  const triggerFetchMorePosts = () => {
    if (loading || !hasMorePosts) return; // Prevent multiple requests
    setLoading(true); // Set loading as soon as debounce starts
    debouncedFetchMorePosts();
  };

  return (
    <div className="container">
      <div className="container_spacer"></div>
      <div className={styles.blog_container}>
        <h1>Blog</h1>
        <InfiniteScroll
          pageStart={0}
          loadMore={triggerFetchMorePosts}
          hasMore={true || false}
          loader={loading && hasMorePosts ? <Loading /> : undefined}
        >
          {renderPostData?.map((item) => (
            <SinglePost isAuthor={false} key={item.post_name} postData={item} />
          ))}
        </InfiniteScroll>
        {!hasMorePosts?(
          <div className="wrapper">
          <span className="text">End Of Page</span>
        </div>
        ):""}
      </div>

      <div className="container_spacer"></div>
    </div>
  );
};

export default Home;

function Loading() {
  return (
    <div className="wrapper">
      <div className="dot"></div>
      <span className="text">Fetching Posts</span>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const apiUrl =
    process.env.NODE_ENV === "production"
      ? `${process.env.DOMAIN_URL?.replace(/^"|"$/g, "")}/api/get_posts`
      : "http://localhost:3000/api/get_posts?page=0&limit=5";

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "minimal-access-token": "light@blog2406",
      },
    });

    if (!response.ok) {
      console.error("Failed to fetch posts:", response.statusText);
      return { props: { initialPostData: null } };
    }

    const res: PostResponseConfig = await response.json();
    console.log(res);
    return { props: { initialPostData: res.postData || null } };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);
    return { props: { initialPostData: null } };
  }
};
