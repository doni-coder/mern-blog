const blogReducer = (state, action) => {
  switch (action.type) {
    case "SET_STATUS":
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    case "SET_PROFILE":
      return {
        ...state,
        profilePic: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
        profilePic: "",
        blogs: [],
        isLoading: false,
      };
    case "SET_BLOGS":
      return {
        ...state,
        blogs: action.payload,
      };
    case "SET_DETAILS":
      const { username, email } = action.payload;
      return {
        ...state,
        userDetails: {
          username,
          email,
        },
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "SET_EXPLORE_BLOGS":
      return {
        ...state,
        exploreBlogs: action.payload,
      };
    case "SET_SINGLE_BLOG":
      return {
        ...state,
        singleBlog: action.payload,
      };
    case "DELETE_BLOG":
      const {blog,id} = action.payload
      const updatedBlog = blog.filter((item)=> {return id != item._id})
      console.log("ID to delete:", id);
      console.log(blog);
      console.log(updatedBlog);
      return{
        ...state,
        blogs:updatedBlog
      }
    default:
      break;
  }
};

export default blogReducer;
