import React, { FC } from 'react'
import { PostDataInterface } from './interfaces'
import styles from '@/styles/post.module.css'
interface Props{
  postData: PostDataInterface
}

const SinglePost:FC<Props>=({postData})=>{


  return(
    <article className={styles.single_post} >
      <header>
        <img src={`https://ui-avatars.com/api/?name=${postData.post_user_name}`}/>
      <span>{postData.post_user_name}</span>
      </header>
      <main>
      <img src={postData.post_image_url}/>
      <p><span>{postData.post_user_name}</span>{postData.post_caption}</p>
      </main>
     
    </article>
  )



}


export default SinglePost;