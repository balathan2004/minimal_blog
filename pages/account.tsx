import React from "react";
import SinglePost from "@/components/elements/singlePost";
import styles from "@/styles/profile.module.css";
import { useGetMyProfileQuery } from "@/components/redux/api/profileApi";

const Profile = () => {
  const { data: { postData, userData } = {} } = useGetMyProfileQuery();

  return (
    <div className="container">
      <div className="container_spacer"></div>
      <div className={styles.profile_container}>
        <h1>Your Profile</h1>
        <header>
          <div className={styles.img_container}>
            <img alt="error loading image" src={userData?.profile_url} />
          </div>

          <div className={styles.profile_details}>
            <span className={styles.username}>{userData?.display_name}</span>
            <span>{userData?.email}</span>
          </div>
        </header>
        <main>
          <h2>Your Posts</h2>
          {postData?.map((item) => {
            return (
              <SinglePost
                isAuthor={userData?.uid == item.post_user_id}
                key={item.post_name}
                postData={item}
              />
            );
          })}
        </main>
      </div>
      <div className="container_spacer"></div>
    </div>
  );
};

export default Profile;
