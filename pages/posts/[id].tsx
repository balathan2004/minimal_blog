import React, { FC, useState } from "react";
import SinglePost from "@/components/elements/singlePost";
import { ParsedUrlQuery } from "querystring";
import { GetServerSidePropsContext } from "next";
import {
  PostDataInterface,
  SinglePostResponseConfig,
} from "@/components/interfaces";
import { useUserContext } from "@/components/context/user_context";

interface Props {
  postData: PostDataInterface | null;
}

const Page: FC<Props> = ({ postData }) => {
  const { userCred } = useUserContext();

  if (postData) {
    return (
      <div className="container">
        <div className="container_spacer"></div>
        <SinglePost
          isAuthor={userCred?.uid == postData.post_user_id}
          postData={postData}
        ></SinglePost>
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

    if (res.status === 200) {
      return {
        props: { postData: res.postData },
      };
    } else {
      return { props: { postData: null } };
    }
  } catch (e) {}
};
