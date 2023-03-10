import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import { Post } from "../../../../types";

const PostPage = () => {
  const router = useRouter();
  const { identifier, sub, slug } = router.query;

  const { data: post, error } = useSWR<Post>(
    identifier && slug ? `/posts/${identifier}/${slug}` : null
  );
  return <div>[slug]</div>;
};

export default PostPage;
