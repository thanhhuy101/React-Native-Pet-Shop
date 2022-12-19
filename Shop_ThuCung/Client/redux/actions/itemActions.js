export const CREATE_ITEM = "CREATE_ITEM";
export const UPDATE_ITEM = "UPDATE_ITEM";
export const DELETE_ITEM = "DELETE_ITEM";
export const GETALL_ITEM = "GETALL_ITEM";
export const SEARCH_ITEM = "SEARCH_ITEM";
//Category
//get all
export const getAllItem = (item) => {
  return {
    type: "GETALL_ITEM",
    payload: item,
  };
};

export const fetchAllItem = () => {
  return (dispatch) => {
    const getData = async () => {
      try {
        const response = await fetch("http://localhost:5000/Item");
        const item = await response.json();
        console.log("here", item);
        dispatch(getAllItem(item));
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  };
};

//search
export const SearchItem = (item) => {
  return {
    type: SEARCH_ITEM,
    payload: item,
  };
};

export const findItem = (key) => {
  return (dispatch) => {
    const getData = async () => {
      try {
        const response = await fetch("http://localhost:5000/searchItem/" + key);
        const item = await response.json();
        // console.log(books)
        dispatch(SearchItem(item));
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  };
};

//create
export const createItem = (item) => {
  return {
    type: "CREATE_ITEM",
    payload: item,
  };
};

export const postItem = (item) => {
  return (dispatch) => {
    const addData = async () => {
      try {
        await fetch("http://localhost:5000/addItem", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        });
      } catch (err) {
        console.error(err);
      }
    };
    addData();
    dispatch(createItem(item));
  };
};

//update
export const editItem = (docId, item) => {
  return {
    type: "UPDATE_ITEM",
    payload: { docId: docId, item },
  };
};

export const updateItem = (docId, item) => {
  console.log("docId-->action", docId);
  console.log("item-->action", item);
  return (dispatch) => {
    const updateData = async () => {
      try {
        await fetch(`http://localhost:5000/updateItem/${docId}`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        });
      } catch (err) {
        console.error(err);
      }
    };
    updateData();

    dispatch(editItem(docId, item));
    dispatch(fetchAllItem());
  };
};

//delete
export const deleteItem = (docId) => {
  return {
    type: "DELETE_ITEM",
    payload: { docId },
  };
};

export const removeItem = (docId) => {
  return (dispatch) => {
    const deleteData = async () => {
      try {
        await fetch(`http://localhost:5000/deleteItem/${docId}`, {
          method: "DELETE",
        });
      } catch (err) {
        console.error(err);
      }
    };
    deleteData();
    dispatch(deleteItem(docId));
    dispatch(fetchAllItem());
  };
};
