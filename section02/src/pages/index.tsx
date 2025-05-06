// CSS Module
import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import { ReactNode, useEffect } from "react";
import BookItem from "@/components/book-item";
import { InferGetStaticPropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";

// Server-side generating
// 프로덕션 모드 + 빌드 타임에만 한 번 실행됨
export const getStaticProps = async () => {
  console.log("index page");
  const [allBooks, recommendedBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks(),
  ]);
  return {
    props: { allBooks, recommendedBooks },
  };
};

// InferGetStaticPropsType: getStaticProps의 props 타입을 추론해주는 타입
export default function Home({
  allBooks,
  recommendedBooks,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  // 클라이언트에서만 실행시킬 코드는 useEffect를 사용
  useEffect(() => {
    console.log(window);
  });

  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {recommendedBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {allBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
