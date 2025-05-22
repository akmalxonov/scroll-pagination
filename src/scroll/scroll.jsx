    import axios from "axios";
    import React, { useEffect, useRef } from "react";
    import { useInfiniteQuery } from "@tanstack/react-query";
    import { Card, Skeleton } from "antd";
    import "../scroll/scroll.scss";
    const { Meta } = Card;
    const Scroll = () => {
    const LIMIT = 1;
    const targetRef = useRef();

    const skeleton = () => {
        return Array.from({ length: 1 }).map((_, idx) => (
        <div class="loader"></div>
        
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

    const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
        useInfiniteQuery({
        queryKey: ["albums-infinite"],
        queryFn: getData,
        getNextPageParam: (lastPage) => lastPage.nextPage,
        });

    // Infinite scroll observer
    useEffect(() => {
        if (!targetRef.current) return;

        const observer = new IntersectionObserver((entries) => {
        entries.forEach((value) => {
            if (value.isIntersecting && hasNextPage) {
            fetchNextPage();
            }
        });
        });

        observer.observe(targetRef.current);

        return () => {
        if (targetRef.current) observer.unobserve(targetRef.current);
        };
    }, [hasNextPage, fetchNextPage]);

    const allPosts = data?.pages?.flatMap((page) => page.data) || [];

    return (
        <div className="scroll-page">
        <div className="wrapper">
            {allPosts.map((value) => (
            <div key={value.id} className="card">
                <Card
                key={value.id}
                hoverable
                cover={<img alt="img" src={value.img} />}
                >
                <Meta title={value.name} description={value.price + "$"} />
                </Card>
            </div>
            ))}

            {isLoading || isFetchingNextPage ? skeleton() : null}

            <div ref={targetRef} className="intersection-target" />
        </div>
        </div>
    );
    };

    export default Scroll;
