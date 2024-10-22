import React, { FC, useContext, useState } from "react";
import { UserCredContext } from "./_app";
import SendFile from "@/components/sendFile";
import styles from "@/styles/create_post.module.css"
import { useRouter } from "next/router";

const SignIn: FC = () => {
  const [image, setImage] = useState<null | Blob>(null);
  const [showImage, setShowImage] = useState("");
  const [caption, setCaption] = useState("");
  const { userCred } = useContext(UserCredContext);
  const router = useRouter();

  const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (caption.length > 0 && image && userCred.uid) {
      console.log("submitted");
      const form = new FormData();
      form.append("file", image);
      form.append("caption", caption);
      form.append("userId", userCred.uid);
      form.append("username", userCred.display_name);
      const response= await SendFile({data: form,route:"/api/create_post"})
       if(response.status==200){
        router.push('/blog')
       } 
    }else{
      console.error("All fields are required");
      return;  // Don't submit form if not all fields are filled in.  This prevents errors in the backend.  You can add more validation here if needed.  For example, you could check if the caption is not too long.  But in this case, we're just making sure all fields are filled in.
    }
  };

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;
    if (file && file.length > 0) {
      setImage(file[0]);
      setShowImage(URL.createObjectURL(file[0]));
    }
  };

  return (
    <div className="container">
      <div className={styles.post_container}>
        <article>
        <header>
          <img src={userCred.profile_url}></img>
          <span>{userCred.display_name}</span>
        </header>
        <form onSubmit={handleForm}>
         
          <textarea
            onChange={(event) => setCaption(event.target.value.trim())}
            required
            placeholder="Enter caption"
          />
           <input onChange={handleImage} type="file"></input>
          <img  src={showImage}></img>
          <button type="submit">Post</button>
        </form>
        </article>
      </div>
    </div>
  );
};

export default SignIn;
