// CSS Module
import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import { ReactNode, useEffect } from "react";
import BookItem from "@/components/book-item";
import { InferGetServerSidePropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";

// Server-side rendering
export const getServerSideProps = async () => {
  // 컴포넌트보다 먼저 실행되어 데이터 패칭하는 함수
  // 서버에서만 실행되므로 window, document 등 브라우저 API 사용 불가
  const [allBooks, recommendedBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks(),
  ]);
  return {
    props: { allBooks, recommendedBooks },
  };
};

// 사전 렌더링때 한 번, 클라이언트에서 hydration 시에 한 번 실행됨
// InferGetServerSidePropsType: getServerSideProps의 반환값을 타입으로 추론해주는 타입
export default function Home({
  allBooks,
  recommendedBooks,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
