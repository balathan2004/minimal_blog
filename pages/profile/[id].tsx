import React, { FC } from "react";
import { ParsedUrlQuery } from "querystring";
import { GetServerSidePropsContext } from "next";
import {
  PostDataInterface,
  ProfileResponseConfig,
  UserDataInterface,
} from "@/components/interfaces";
import SinglePost from "@/components/singlePost";

interface Props {
  postData: PostDataInterface[] | null;
  userData: UserDataInterface | null;
}

const Profile: FC<Props> = ({ postData, userData }) => {
  if (postData && userData) {
    return (
      <div className="container">
        <header>
          <img src={userData.profile_url}/>
          <h1>{userData.display_name}</h1>
          <h1>{userData.email}</h1>
          <h1>{userData.created_at}</h1>
          <h1>{userData.uid}</h1>

        </header>
        <div>
          {postData.map((item) => {
            return <SinglePost postData={item} />;
          })}
        </div>
      </div>
    );
  }
};

export default Profile;

export const getServerSideProps = async (
  context: GetServerSidePropsContext<ParsedUrlQuery>
) => {
  try {
    const { query } = context;
    const { id } = query;

    const apiUrl =
      process.env.NODE_ENV === "production"
        ? `https://we-caters.vercel.app/api/get_profile?userId=${id}`
        : `http://localhost:3000/api/get_profile?userId=${id}`;
    const response = await fetch(apiUrl);
    const res: ProfileResponseConfig = await response.json();

    if (res.status === 200) {
      return {
        props: { postData: res.postData, userData: res.userData },
      };
    } else {
      return { props: { postData: null } };
    }

    return { props: { postData: null } };
  } catch (e) {}
};
