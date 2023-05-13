import React, { useState, useEffect } from 'react';
import Child from './Child';
import { restrauList } from './contants';
import Shimmerui from './Shimmerui';
const Body = () => {
  const [input, setInput] = useState('');
  // const [exp, setExp] = useState('true');
  const [allrestraunts, setAllrestraunts] = useState([]);
  const [filteredrestaurants, setFilteredrestaurants] = useState([]);
  // console.log(restaurants);
  // function myFun() {
  //   if (exp === 'true') {
  //     setExp('false');
  //   } else {
  //     setExp('true');
  //   }
  // }
  function filterData(input, allrestraunts) {
    const filterData = allrestraunts.filter((restaurant) => {
      return restaurant?.data?.name
        ?.toLowerCase()
        ?.includes(input.toLowerCase());
    });
    return filterData;
  }

  useEffect(() => {
    console.log('useefect1 called');
    getRestaurents();
    console.log('useefect2 called');
  }, []);

  async function getRestaurents() {
    console.log('getRestaurents');
    const data = await fetch(
      'https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9656566&lng=77.5920295&page_type=DESKTOP_WEB_LISTING'
    );
    const json = await data.json();
    setAllrestraunts(json?.data?.cards[2]?.data?.data?.cards);
    setFilteredrestaurants(json?.data?.cards[2]?.data?.data?.cards);

    console.log('lingu', json);
  }
  // if(filteredrestaurants?.length === 0) return <h1>not matching entered data</h1>
  return allrestraunts?.length === 0 ? (
    <Shimmerui />
  ) : (
    <div>
      <h1>
        Body {input}
        {/* {exp} */}
      </h1>
      {/* <button onClick={myFun}>practice</button> */}
      <input
        type="text"
        onChange={(e) => setInput(e.target.value)}
        value={input}
      />
      <button
        onClick={() => {
          const data = filterData(input, allrestraunts);
          setFilteredrestaurants(data);
        }}
      >
        search
      </button>
      {filteredrestaurants.map((item) => {
        return <Child {...item.data} key={item.data.id} />;
      })}
    </div>
  );
};

export default Body;
