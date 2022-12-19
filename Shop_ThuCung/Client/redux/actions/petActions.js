export const CREATE_PET = "CREATE_PET";
export const UPDATE_PET = "UPDATE_PET";
export const DELETE_PET = "DELETE_PET";
export const GETALL_PET = "GETALL_PET";
export const SEARCH_PET = "SEARCH_PET";
//action creator
//get all
export const getAllPet = (Shop) => {
  return {
    type: "GETALL_PET",
    payload: Shop,
  };
};

export const fetchAllPet = () => {
  console.log("fetchAllPet");
  return (dispatch) => {
    const getData = async () => {
      try {
        const response = await fetch("http://localhost:5000/Shop");
        const pet = await response.json();
        console.log("here", pet);
        //dispatch action to reducer
        dispatch(getAllPet(pet));
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  };
};
//search
export const SearchPet = (pet) => {
  return {
    type: SEARCH_PET,
    payload: pet,
  };
};

export const searchPet = (key) => {
  return (dispatch) => {
    const getData = async () => {
      try {
        const response = await fetch("http://localhost:5000/searchPet/" + key);
        const pet = await response.json();
        // console.log(books)
        dispatch(SearchPet(pet));
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  };
};

//create
export const createPet = (pet) => {
  return {
    type: "CREATE_PET",
    payload: pet,
  };
};

export const postPet = (pet) => {
  return (dispatch) => {
    const addData = async () => {
      try {
        await fetch("http://localhost:5000/addPet", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(pet),
        });
      } catch (err) {
        console.error(err);
      }
    };
    addData();
    dispatch(createPet(pet));
  };
};

//update
export const UpdatePet = (docId, pet) => {
  return {
    type: "UPDATE_PET",
    payload: { docId: docId, pet },
  };
};

export const updatePet = (docId, pet) => {
  console.log("docId", docId);
  console.log("pet", pet);
  return (dispatch) => {
    const updateData = async () => {
      try {
        await fetch(`http://localhost:5000/updatePet/${docId}`, {
          method: "PUT",
          headers: {
            Accept: "application/json", 
            "Content-Type": "application/json",
          },
          body: JSON.stringify(pet),
        });
      } catch (err) {
        console.error(err);
      }
    };
    updateData();
    dispatch(UpdatePet(docId, pet));
    dispatch(fetchAllPet());
  };
};

//delete
export const DeletePet = (docId) => {
  return {
    type: "DELETE_PET",
    payload: { docId },
  };
};

export const deletePet = (docId) => {
  return (dispatch) => {
    const deleteData = async () => {
      try {
        await fetch(`http://localhost:5000/deletePet/${docId}`, {
          method: "DELETE",
        });
      } catch (err) {
        console.error(err);
      }
    };
    deleteData();
    dispatch(DeletePet(docId));
    dispatch(fetchAllPet());
  };
};
