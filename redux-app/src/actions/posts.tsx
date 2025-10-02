import axios from "axios";

// export const fetchPosts = (): any => {
//   return async function fetchPostsThunk(dispatch: any, getState: any) {
//     const response = await axios.get(
//       `${process.env.REACT_APP_THUNK_API_URL}/posts`
//     );
//     dispatch({ type: "FETCH_POSTS", payload: response.data });
//   };
// };

export const getFecthPosts = (): any => async (dispatch: any, getState: any) => {
  const response = await axios.get(
    `${process.env.REACT_APP_THUNK_API_URL}/posts`
  );
  dispatch({ type: "FETCH_POSTS", payload: response.data });
};
