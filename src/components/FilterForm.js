import { useContext, useState } from "react";
import tinh_tp from "../json/tinh_tp.json";
import quan_huyen from "../json/quan_huyen.json";
import data from "../json/data.json";
import { appContext } from "../context/appContext";
const arrayTinhTP = Object.values(tinh_tp);
const arrayQuanHuyen = Object.values(quan_huyen);

export default function FilterForm() {
  const [state, dispatch] = useContext(appContext);
  const [tinhTP, setTinhTP] = useState("");
  const [qh, setQh] = useState("");
  const [price, setPrice] = useState("");
  const [area, setArea] = useState("");
  let quanHuyen = [];
  if (tinhTP !== "") {
    quanHuyen = arrayQuanHuyen.filter((qh, index) => {
      return qh.parent_code === tinhTP;
    });
  }
  const handeFilter = (e) => {
    e.preventDefault();

    const FilterArr = data.filter((item) => {
      let range = { priceMax: 0, priceMin: 0 };
      if (price !== "") {
        if (price === "1") {
          range.priceMax = 1000000;
        } else if (price === "2") {
          range.priceMax = 2000000;
          range.priceMin = 1000000;
        } else if (price === "3") {
          range.priceMax = 3000000;
          range.priceMin = 2000000;
        } else if (price === "4") {
          range.priceMax = 5000000;
          range.priceMin = 3000000;
        } else if (price === "5") {
          range.priceMax = 10000000;
          range.priceMin = 7000000;
        }
      } else {
        range.priceMax = Infinity;
      }
      let rangeArea = { areaMax: 0, areaMin: 0 };
      if (area) {
        if (area === "1") {
          rangeArea.areaMax = 20;
        } else if (area === "2") {
          rangeArea.areaMax = 30;
          rangeArea.areaMin = 20;
        } else if (area === "2") {
          rangeArea.areaMax = 50;
          rangeArea.areaMin = 30;
        } else if (area === "2") {
          rangeArea.areaMax = 60;
          rangeArea.areaMin = 50;
        } else if (area === "2") {
          rangeArea.areaMax = 70;
          rangeArea.areaMin = 60;
        } else if (area === "2") {
          rangeArea.areaMax = 80;
          rangeArea.areaMin = 70;
        }
      } else {
        rangeArea.areaMax = Infinity;
      }
      if (qh !== "") {
        return (
          item.city === tinhTP &&
          item.district === qh &&
          item.price < range.priceMax &&
          item.price >= range.priceMin &&
          item.area < rangeArea.areaMax &&
          item.area >= rangeArea.areaMin
        );
      } else {
        return (
          item.city === tinhTP &&
          item.price < range.priceMax &&
          item.price >= range.priceMin &&
          item.area < rangeArea.areaMax &&
          item.area >= rangeArea.areaMin
        );
      }
    });
    console.log(FilterArr);
    console.log(tinhTP);
    dispatch({ type: "FILTER", payload: FilterArr });
  };
  return (
    <div className="px-5 py-5 rounded-md">
      <form className="w-full bg-orange-300 px-3 py-3 flex ">
        <div className="flex flex-col mr-3">
          <label>Tỉnh thành</label>
          <select
            className="py-1 px-1 text-gray-500 rounded-sm"
            onChange={(e) => {
              setTinhTP(e.target.value);
            }}
          >
            {arrayTinhTP.map((tinh, index) => {
              return (
                <option key={index + "tinhtp"} value={tinh.code}>
                  {tinh.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex flex-col mr-3">
          <label>Quận Huyện</label>
          <select
            className="py-1 px-1 text-gray-500 rounded-sm"
            onChange={(e) => {
              setQh(e.target.value);
            }}
          >
            <option value="">--Quận Huyện--</option>
            {tinhTP !== "" &&
              quanHuyen.map((qh, index) => {
                return (
                  <option value={qh.code} key={index + "quanhuyen"}>
                    {qh.name}
                  </option>
                );
              })}
            <option value=""></option>
          </select>
        </div>
        <div className="flex flex-col mr-3">
          <label>Khoảng giá</label>
          <select
            className="py-1 px-1 text-gray-500 rounded-sm"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          >
            <option value="">Chọn mức giá</option>
            <option value="1">Dưới 1 triệu</option>
            <option value="2">2 triệu - 3 triệu</option>
            <option value="3">3 triệu - 5 triệu</option>
            <option value="4">5 triệu - 7 triệu</option>
            <option value="5">7 triệu - 10 triệu</option>
          </select>
        </div>
        <div className="flex flex-col mr-3">
          <label>Diện tích</label>
          <select
            className="py-1 px-1 text-gray-500 rounded-sm"
            onChange={(e) => {
              setArea(e.target.value);
            }}
          >
            <option value="">Chọn diện tích</option>
            <option value="1">Dưới 20 m2</option>
            <option value="2">20 m2 - 30 m2</option>
            <option value="3">30m2 - 50m2</option>
            <option value="4">50-60m2</option>
            <option value="5">60-70m2</option>
            <option value="6">70-80m2</option>
          </select>
        </div>
        <button
          onClick={handeFilter}
          className="bg-yellow-600 text-white font-semibold text-center py-1 h-2/4 px-2 self-end rounded-sm"
        >
          Lọc Tin
        </button>
      </form>
    </div>
  );
}
