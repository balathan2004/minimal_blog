export interface ResponseConfig{
  message: string;
  status:200|300|400
}

export interface AuthResponseConfig extends ResponseConfig{
  credentials:UserDataInterface
}

export interface PostResponseConfig extends ResponseConfig{

  postData:PostDataInterface[]|null

}

export interface SinglePostResponseConfig extends ResponseConfig{

  postData:PostDataInterface|null

}

export interface ProfileResponseConfig extends ResponseConfig{

  postData:PostDataInterface[]|null;
  userData:UserDataInterface|null;

}

export interface UserDataInterface{
  uid:string;
  email:string;
  display_name:string;
  created_at:string;
  profile_url:string;
}

export const DummyUserData={
uid:"",
email:"",
display_name:"",
created_at:"",
profile_url:""
}

export interface PostDataInterface{
  post_name:string;
  post_caption:string;
  post_time:string;
  post_user_id:string;
  post_image_url:string;
  post_user_name:string;

}