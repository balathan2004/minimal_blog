import React, { FC } from "react";
import { ParsedUrlQuery } from "querystring";
import { GetServerSidePropsContext } from "next";
import {
  PostDataInterface,
  ProfileResponseConfig,
  UserDataInterface,
} from "@/components/interfaces";
import styles from "@/styles/profile.module.css";
import Image from "next/image";
import SinglePost from "@/components/elements/singlePost";

interface Props {
  postData: PostDataInterface[] | null;
  userData: UserDataInterface | null;
}

const Profile: FC<Props> = ({ postData, userData }) => {
  console.log(postData, userData);
  if (postData && userData) {
    return (
      <div className="container">
        <div className="container_spacer"></div>
        <div className={styles.profile_container}>
        <h1>User Profile</h1>
          <header>
            <div className={styles.img_container}>
              <img alt="error loading image" src={userData.profile_url} />
            </div>

            <div className={styles.profile_details}>
              <span className={styles.username}>{userData.display_name}</span>
              <span>{userData.email}</span>
            </div>
          </header>
          <main>
            <h2>User Posts</h2>
            {postData.map((item) => {
              return <SinglePost isAuthor={true} key={item.post_name} postData={item} />;
            })}
          </main>
        </div>
        <div className="container_spacer"></div>
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
        ? `${process.env.DOMAIN_URL?.replace(
            /^"|"$/g,
            ""
          )}/api/get_profile?userId=${id}`
        : `http://localhost:3000/api/get_profile?userId=${id}`;
    const response = await fetch(apiUrl);
    const res: ProfileResponseConfig = await response.json();

    console.log(res);

    if (res.status === 200) {
      return {
        props: { postData: res.postData, userData: res.userData },
      };
    } else {
      return { props: { postData: null } };
    }
  } catch (e) {
    return { props: { postData: null } };
  }
};
