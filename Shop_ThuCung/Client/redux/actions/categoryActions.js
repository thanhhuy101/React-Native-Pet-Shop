export const CREATE_CATEGORY = "CREATE_CATEGORY";
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";
export const DELETE_CATEGORY = "DELETE_CATEGORY";
export const GETALL_CATEGORY = "GETALL_CATEGORY";
export const SEARCH_CATEGORY = "SEARCH_CATEGORY";
//Category
//get all
export const getAllCategory = (category) => {
  return {
    type: "GETALL_CATEGORY",
    payload: category,
  };
};

export const fetchAllCategory = () => {
  return (dispatch) => {
    const getData = async () => {
      try {
        const response = await fetch("http://localhost:5000/Cate");
        const category = await response.json();
        console.log("here", category);
        //dispatch action to reducer
        dispatch(getAllCategory(category));
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  };
};

//search
export const SearchCategory = (category) => {
  return {
    type: SEARCH_CATEGORY,
    payload: category,
  };
};

export const SearchCate = (key) => {
  return (dispatch) => {
    const getData = async () => {
      try {
        const response = await fetch("http://localhost:5000/searchCate/" + key);
        const category = await response.json();
        // console.log(books)
        dispatch(SearchCategory(category));
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  };
};

//create
export const createCategory = (category) => {
  return {
    type: "CREATE_CATEGORY",
    payload: category,
  };
};

export const postCate = (category) => {
  return (dispatch) => {
    const addData = async () => {
      try {
        await fetch("http://localhost:5000/addCate", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(category),
        });
      } catch (err) {
        console.error(err);
      }
    };
    addData();
    dispatch(createCategory(category));
  };
};

//update
export const updateCategory = (docId, category) => {
  return {
    type: "UPDATE_CATEGORY",
    payload: { docId: docId, category },
  };
};

export const updateCate = (docId, category) => {
  console.log("docId", docId);
  console.log("category", category);
  return (dispatch) => {
    const updateData = async () => {
      try {
        await fetch(`http://localhost:5000/updateCate/${docId}`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(category),
        });
      } catch (err) {
        console.error(err);
      }
    };
    updateData();
    dispatch(updateCategory(docId, category));
    dispatch(fetchAllCategory());
  };
};

//delete
export const deleteCategory = (docId) => {
  return {
    type: "DELETE_CATEGORY",
    payload: { docId },
  };
};

export const deleteCate = (docId) => {
  return (dispatch) => {
    const deleteData = async () => {
      try {
        await fetch(`http://localhost:5000/deleteCate/${docId}`, {
          method: "DELETE",
        });
      } catch (err) {
        console.error(err);
      }
    };
    deleteData();
    dispatch(deleteCategory(docId));
    dispatch(fetchAllCategory());
  };
};
