import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Button, Card, Skeleton } from "antd";
import "../More-products/moreProduct.scss";
const { Meta } = Card;
const MoreProduct = () => {

  const LIMIT = 10;
  const targetRef = useRef(null);
  const skeleton = () => {
    return Array.from({ length: 10 }).map((_, idx) => (
      <Skeleton.Node
        key={idx}
        active={true}
        className="my-skeleton"
      />
    ));
  };
  const getData = async ({ pageParam = 1 }) => {
    const res = await axios(
      `https://6816aff526a599ae7c386b97.mockapi.io/products/products?page=${pageParam}&limit=${LIMIT}`
    );
    return {
      data: res.data,
      nextPage: res.data.length === LIMIT ? pageParam + 1 : undefined,
    };
  };
  const { data, isLoading, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["albums-infinite"],
      queryFn: getData,
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });

  const allPosts = data?.pages?.flatMap((page) => page.data) || [];

  return (
    <div className="scroll">
      <div className="wrapper">
        {allPosts.map((value) => (
          <Card
            key={value.id}
            hoverable
            cover={<img alt="img" src={value.img} />}
          >
            <Meta title={value.name} description={value.price + "$"} />
          </Card>
        ))}

        {isLoading || isFetchingNextPage ? skeleton() : null}

        <div ref={targetRef} className="h-[1px]" />

      </div>
      <div className="btn">
          <Button onClick={fetchNextPage}>
            {isLoading || isFetchingNextPage
              ? "Loading..."
              : "More 10 products"}
          </Button>
        </div>
    </div>
  );
};

export default MoreProduct;
