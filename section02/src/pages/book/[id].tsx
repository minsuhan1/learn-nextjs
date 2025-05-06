import {
  GetServerSidePropsContext,
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
} from "next";
import style from "./[id].module.css";
import fetchOneBook from "@/lib/fetch-one-book";
import { useRouter } from "next/router";

export const getStaticPaths = async (context: GetStaticPathsContext) => {
  return {
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
    fallback: true,
    // fallback: false --> 정적 페이지를 미리 생성하지 않은 경우 404 페이지로 이동
    // fallback: 'blocking' -->  정적 페이지를 미리 생성하지 않은 경우 SSR 방식으로 페이지를 생성(생성한 페이지는 /next 폴더에 저장)
    // fallback: true --> 정적 페이지를 미리 생성하지 않은 경우 fallback 페이지부터 반환하고 SSR
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;
  const book = await fetchOneBook(Number(id));

  if (!book) {
    return {
      notFound: true,
    };
  }

  return {
    props: { book },
  };
};

export default function Page({
  book,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) return "로딩중입니다...";
  if (!book) return "문제가 발생했습니다. 다시 시도하세요";

  const { id, title, subTitle, description, author, publisher, coverImgUrl } =
    book;

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl}></img>
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>

      <div className={style.description}>{description}</div>
    </div>
  );
}
