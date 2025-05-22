import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Pagination, Skeleton } from "antd";
import axios from "axios";
import { Card } from "antd";
import "../pagination/pagination.scss";
const { Meta } = Card;

const PaginationComp = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const getData = async (page) => {
    const res = await axios.get(
      `https://6816aff526a599ae7c386b97.mockapi.io/products/products?page=${page}&limit=10`
    );
    return {
      data: res.data,
    };
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: [`products-${currentPage}`],
    queryFn: () => getData(currentPage),
  });
  console.log(data);

  const skeleton = () => {
    return Array.from({ length: 10 }).map((value) => {
      <Skeleton.Node active={true} style={{ width: 160 }} />;
    });
  };

  return (
    <div className="pagination-page">
      <div className="wrapper">
        {isLoading
          ? skeleton()
          : data.data.map((value) => (
              <Card
                key={value.id}
                hoverable
                // style={{ width: 240 }}
                cover={<img alt="img" src={value.img} />}
              >
                <Meta title={value.name} description={value.price + "$"} />
              </Card>
            ))}
      </div>
      <div className="pagination">
        <Pagination
          current={currentPage}
          total={100}
          pageSize={10}
          onChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default PaginationComp;
