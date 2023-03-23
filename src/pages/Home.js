import { useContext, useEffect, useState } from "react";
import { FilterForm } from "../components";
import data from "../json/data.json";
import tinhTP from "../json/tinh_tp.json";
import quanHuyen from "../json/quan_huyen.json";
import { appContext } from "../context/appContext";

export default function Home() {
  const [state, dispatch] = useContext(appContext);
  const [newsData, setNewsData] = useState(data);
  useEffect(() => {
    setNewsData(state.data);
  }, [state.data]);
  return (
    <div>
      <FilterForm />
      <div className="border border-md border-orange-700 px-5 py-5 w-[80%] mx-auto bg-orange-100">
        {/* thoi gian co han nen ko chia component */}
        {newsData &&
          newsData.map((news, index) => {
            return (
              <div
                className="flex mt-5 border-b pb-5 border-b-orange-700"
                key={index + "card"}
              >
                <div className="w-[180px] h-[180px]">
                  <img
                    src={news.thumbnail}
                    alt="thumbnail"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-5 ml-5">
                  <p className="text-red-500 font-semibold">{news.title}</p>
                  <p className="font-bold text-green-500">
                    {news.price / 1000000} triệu/tháng
                  </p>
                  <div className="flex">
                    <p className="text-gray-500 mr-5">
                      Diện tích:{" "}
                      <span className="font-bold">{news.area} m2</span>
                    </p>
                    <p className="text-gray-500">
                      Khu vực:{" "}
                      <span className="font-bold text-blue-500">Quận</span>{" "}
                      <span className="font-bold text-blue-500">
                        {quanHuyen[news.district].name},{" "}
                        {tinhTP[news.city].name}
                      </span>
                    </p>
                  </div>
                  <p className="text-gray-500">{news.content}</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
