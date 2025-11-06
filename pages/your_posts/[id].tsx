import React, { FC, use, useEffect, useState } from "react";
import { ParsedUrlQuery } from "querystring";
import { GetServerSidePropsContext } from "next";
import {
  PostDataInterface,
  SinglePostResponseConfig,
} from "@/components/interfaces";
import EditPost from "@/components/elements/edit_post";
import { useRouter } from "next/router";
import { useAuth } from "@/components/redux/api/authSlice";
interface Props {
  postData: PostDataInterface | null;
}

const Page: FC<Props> = ({ postData }) => {
  const router = useRouter();

  const { userData } = useAuth();

  useEffect(() => {
    if (userData && postData) {
      if (userData.uid != postData.post_user_id) {
        router.push("/blog");
      }
    }
  }, [userData]);

  if (postData) {
    return (
      <div className="container">
        <div className="container_spacer"></div>
        <EditPost
          isAuthor={userData?.uid == postData.post_user_id}
          postData={postData}
        ></EditPost>
        <div className="container_spacer"></div>
      </div>
    );
  } else {
    return (
      <div className="container">
        <h1>Post Not Available</h1>
      </div>
    );
  }
};

export default Page;

export const getServerSideProps = async (
  context: GetServerSidePropsContext<ParsedUrlQuery>
) => {
  try {
    const { query } = context;

    const { id } = query;

    const apiUrl =
      process.env.NODE_ENV === "production"
        ? `${process.env.DOMAIN_URL?.replace(
            /^"|"$/g,
            ""
          )}/api/get_single_post?post_name=${id}`
        : `http://localhost:3000/api/get_single_post?post_name=${id}`;

    console.log(process.env.DOMAIN_URL);
    const response = await fetch(apiUrl);
    const res: SinglePostResponseConfig = await response.json();

    if (response.ok) {
      return {
        props: { postData: res.postData },
      };
    } else {
      return { props: { postData: null } };
    }
  } catch (e) {
    console.log(e);
     return { props: { postData: null } };
  }
};
