import axios from "axios";
import Link from "next/link";
import React from "react";
import styles from "../styles/Home.module.css";
import { Post, Sub } from "../types";
import useSWR from "swr";
import Image from "next/image";
import { NextPage } from "next";
import { useAuthState } from "../context/auth";
import useSWRInfinite from "swr/infinite";

const Home: NextPage = () => {
  const { authenticated } = useAuthState();

  const fetcher = async (url: string) => {
    return await axios.get(url).then((res) => res.data);
  };
  const address = "http://localhost:4000/api/subs/sub/topSubs";

  // 각 페이지의 SWR 키를 얻기 위한 함수,
  // 'fetcher'에 의해 허용된 값을 반환합니다.
  // 'null'이 반환된다면, 페이지의 요청은 시작되지 않습니다
  const getKey = (pageIndex: number, previousPageData: Post[]) => {
    if (previousPageData && !previousPageData.length) return null; // 끝에 도달
    return `/posts?page=${pageIndex}`; // SWR key
  };

  const {
    data,
    error,
    size: page,
    setSize: setPage,
    isValidating,
    mutate,
  } = useSWRInfinite<Post[]>(getKey);

  const { data: topSubs } = useSWR<Sub[]>(address, fetcher);

  return (
    <div className="flex max-w-5xl px-4 pt-5 mx-auto">
      {/* 포스트 리스트 */}
      <div className="w-full md:mr-3 md:w-8/12"></div>

      {/* 사이드바 */}
      <div className="hidden w-4/12 ml-3 md:block">
        <div className="bg-white border rounded">
          <div className="p-4 border-b">
            <p className="text-lg font-semibold text-center">상위 커뮤니티</p>
          </div>

          {/* 커뮤니티 리스트 */}
          <div>
            {topSubs?.map((sub) => (
              <div
                key={sub.name}
                className="flex items-center px-4 py-2 text-xs border-b"
              >
                <Link href={`/r/${sub.name}`}>
                  <a>
                    <Image
                      src={sub.imageUrl}
                      className="rounded-full cursor-pointer"
                      alt="Sub"
                      width={24}
                      height={24}
                    />
                  </a>
                </Link>
                <Link href={`/r/${sub.name}`}>
                  <a className="ml-2 font-bold hover:cursor-pointer">
                    /r/{sub.name}
                  </a>
                </Link>
                <p className="ml-auto font-med">{sub.postCount}</p>
              </div>
            ))}
          </div>
          {authenticated && (
            <div className="w-full py-6 text-center">
              <Link href="subs/create">
                <a className="w-full p-2 text-center text-white bg-gray-400 rounded">
                  커뮤니티 만들기
                </a>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
