import React, { FC,useState } from 'react'
import SinglePost from '@/components/singlePost';
import { ParsedUrlQuery } from 'querystring';
import { GetServerSidePropsContext } from 'next';
import {  PostDataInterface, SinglePostResponseConfig } from '@/components/interfaces';

interface Props{
  postData:PostDataInterface|null
}

const Page:FC<Props>=({postData})=>{
  console.log(postData);


  if(postData){

    return(
      <div className='container'>
     <SinglePost postData={postData}></SinglePost>
      </div>
    )
  }else{
    return(
      <div className='container'>
      <h1>Post Not Available</h1>
       </div>
    )
  }

 

}

export default Page;



export const getServerSideProps = async (
  context: GetServerSidePropsContext<ParsedUrlQuery>
) => {
  try {
    const { query } = context;

    const { id } = query;

    const apiUrl =
      process.env.NODE_ENV === "production"
        ? `https://we-caters.vercel.app/api/get_single_post?post_name=${id}`
        : `http://localhost:3000/api/get_single_post?post_name=${id}`;
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

