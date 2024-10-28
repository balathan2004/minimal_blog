import React, { Component } from "react";
import Head from "next/head";
import styles from "@/styles/index.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <div className="container">
        
        <div className={styles.inner_container}>
          <div className="container_spacer"></div>
          <div className={styles.content}>
          <header>
            <h1>
              Welcome to <strong>Minimal Blog</strong>
            </h1>
            <p>
              Share your thoughts and moments with a simple, clean experience.
            </p>
          </header>

          <section>
            <h2>Features:</h2>
            <ul>
              <li>
                <strong>Create Posts:</strong> Share your story with an image
                and a caption, and keep it simple.
              </li>
              <li>
                <strong>Personalized Profile:</strong> See all your posts in one
                place on your profile page.
              </li>
              <li>
                <strong>Easy Sign-Up:</strong> Get started quickly with
                email-based account creation.
              </li>
            </ul>
          </section>

          <section>
            <h2>How It Works:</h2>
            <ol>
              <li>
                <strong>Sign Up</strong> with your email to create your account.
              </li>
              <li>
                <strong>Create a Blog Post</strong> by uploading an image and
                adding a caption.
              </li>
              <li>
                <strong>Explore Your Profile</strong> to see all your posts in
                one view.
              </li>
            </ol>
          </section>

          <section>
            <h2>About</h2>
            <ol>
              <li>
                <strong>Dev :</strong> Light
              </li>
              <li>
                <strong>Socials </strong>
                <a href="https://github.com/balathan2004">Link to Github </a>
              </li>
              <li>
                <strong>Socials </strong>
                <a href="https://www.linkedin.com/in/balathan2004">Link to LinkedIn</a>
              </li>
            </ol>
          </section>

          <footer>
            <p>
              This blog site is built for simplicity, focusing on what matters
              most: sharing and enjoying each post. Start sharing your thoughts
              and capturing moments now!
            </p>
          </footer>
          </div>
          <div className="container_spacer"></div>
        </div>
      </div>
    </>
  );
}
