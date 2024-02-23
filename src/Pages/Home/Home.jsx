// import React, { useEffect, useState } from "react";
// import axios from "axios";
// const Home = () => {
// const [data, setData] = useState([]);
// const [loader,setLoader] = useState(false)
// // const fetchData = async () => {
// // await axios
// // .get("https://hub.dummyapis.com/employee?noofRecords=1000&idStarts=1")
// // .then((res) => {
// // setData(res.data);
// // });
// // };

// const fetchData = async () => {
// setLoader(true)
// try {
// const res = await axios.get(
// "https://hub.dummyapis.com/employee?noofRecords=10&idStarts=1"
// );
// // console.log(res);
// setData(res.data);
// setLoader(false)
// } catch (error) {
// console.log(error);
// setLoader(false)
// }finally{
// setLoader(false)
// }
// };

// useEffect(() => {
// fetchData();
// }, []);

// console.log("1");
// setTimeout(() => {
// console.log("2");
// }, 1000);
// console.log("3");
// return (
// <>
// <ul>
// {loader ? "Load Data": <> {data.map((item) => {
// return (
// <>
// <li>{item.firstName}</li>
// </>
// );
// })}</>}

// </ul>
// </>
// );
// };

// export default Home;

import React, { useId, useState } from "react";

const Home = () => {
  const ids = useId();
  const [cities, setCities] = useState([]); // get all cities isme meri sari cities hongi jo me add karunga
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(5);
  const [newCity, setNewCity] = useState();
  const [newState, setNewState] = useState();
  const [editIndex, setEditIndex] = useState(null);
  const [addState, setAddState] = useState();
  const [getState, setGetState] = useState([]);

  console.log(getState);

  // handle add state data one 

  const handleStateAdd = () => {
    setGetState([...getState, { id: Date.now(), nameState: addState?.trim() }]);
    setAddState("")
  };

  // add and update data

  const handleAddData = () => {
    if (editIndex !== null) {
      const updateCities = [...cities];
      updateCities[editIndex] = {
        id: Date.now(),
        name: newCity.trim(),
        state: newState.trim(),
      };
      setCities(updateCities);
      setEditIndex(null);
    } else {
      setCities([
        ...cities,
        {
          id: Date.now(),
          name: newCity.trim(),
          state: newState.trim(),
        },
      ]);
    }

    setNewCity("");
    setNewState("");
  };

  // Delete Data

  const handleDelete = (id) => {
    console.log(id);
    const fil = cities.filter((e) => e.id !== id);
    setCities(fil);
    setEditIndex(null);
  };

  const handleEditCity = (id) => {
    const cityEdit = cities[id];
    setNewCity(cityEdit.name);
    setNewState(cityEdit.state);
    setEditIndex(id);
  };

  // handlePagination

  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentData = cities.slice(indexOfFirstItem, indexOfLastItem);

  // pagination page change button per

  const paginate = (pageNo) => setCurrentPage(pageNo);

  return (
    <>
      <h1>React JS Test</h1>

      <label htmlFor="">State</label>
      <input
        type="text"
        value={addState}
        onChange={(e) => setAddState(e.target.value)}
      />
      <button onClick={handleStateAdd}>Add state </button>

      <div>
        <label htmlFor="">choose state name</label>
        <select
          name=""
          id=""
          style={{ width: "200px" }}
          onChange={(e) => setNewState(e.target.value)}
          value={newState}
        >
          <option value="">Choose State Name</option>
          {getState?.map((ele) => {
            return (
              <>
                <option value={ele.stateName}>{ele.nameState}</option>
              </>
            );
          })}
        </select>
      </div>

      <label htmlFor="">City</label>
      <input
        type="text"
        value={newCity}
        onChange={(e) => setNewCity(e.target.value)}
      />

      <button onClick={handleAddData}>
        {editIndex !== null ? "Update" : "Add"}
      </button>

      <table>
        <thead>
          <tr>
            <th>city</th>
            <th>state</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {currentData.map((item, index) => {
            console.log(item);
            return (
              <>
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.state}</td>
                  <td>
                    <button onClick={() => handleEditCity(index)}>edit</button>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(item.id)}>
                      delete
                    </button>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>

        {Array.from({ length: Math.ceil(cities.length / itemPerPage) }).map(
          (_, index) => {
            return (
              <>
                <button key={index} onClick={() => paginate(index + 1)}>
                  {index + 1}
                </button>
              </>
            );
          }
        )}
      </table>
    </>
  );
};

export default Home;
