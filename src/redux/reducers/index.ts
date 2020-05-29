import {
  GET_USER_ERROR,
  GET_USER_LOADING,
  GET_USER_SUCCESS,
  GET_JOBS_ERROR,
  GET_JOBS_LOADING,
  GET_JOBS_SUCCESS,
  GET_CURRENT_JOB,
  DELETE_JOBS_LOADING,
  DELETE_JOBS_SUCCESS,
  DELETE_JOBS_ERROR,
  UPDATE_JOBS_LOADING,
  UPDATE_JOBS_SUCCESS,
  UPDATE_JOBS_ERROR,
  UPDATE_CURRENT_JOB,
  GET_TASKS_ERROR,
  GET_TASKS_LOADING,
  GET_TASKS_SUCCESS,
  ADD_TASKS_ERROR,
  ADD_TASKS_LOADING,
  ADD_TASKS_SUCCESS,
  DELETE_TASKS_ERROR,
  DELETE_TASKS_LOADING,
  DELETE_TASKS_SUCCESS,
  TOGGLE_TASK,
  CLEAR_MESSAGES,
  TAGS,
  TAG_FILTER,
  UPDATE_JOB_COLUMN_SUCCESS
} from "../actions/index";
import Tags from "../../UIElements/Tags";

const initialState = {
  loading: false,
  error: "",
  success: {
    state: false,
    type: "",
    message: ""
  },
  user: {
    firstName: "",
    lastName: ""
  },
  jobs: [],
  filteredJobs: [],
  currentJob: {
    location: "",
    jobTitle: "",
    urlText: "",
    rating: 3,
    description: "",
    notes: "",
    applicationDeadline: "",
    companyTitle: "",
    companyUrl: ""
  },
  updateDisabled: true,
  tags: [],
  tasks: []
};

export function reducer(state = initialState, action: any): object {
  switch (action.type) {
    default:
      return {
        state
      };
    case GET_USER_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_USER_SUCCESS:
      const fullName = action.payload.split(" ");
      const firstName = fullName[0];
      const lastName = fullName[1];
      return {
        ...state,
        user: {
          firstName,
          lastName
        },
        loading: false
      };
    case GET_USER_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case GET_JOBS_LOADING:
      return { ...state, loading: true };

    case GET_JOBS_SUCCESS:
      return {
        ...state,
        jobs: action.payload,
        loading: false
      };
    case GET_JOBS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case DELETE_JOBS_LOADING:
      return {
        ...state,
        loading: true,
        success: {
          state: false,
          type: "",
          message: ""
        }
      };
    case DELETE_JOBS_SUCCESS:
      return {
        ...state,
        jobs: action.payload,
        loading: false,
        success: {
          state: true,
          type: "Deleted",
          message: "Successfully Deleted"
        }
      };
    case DELETE_JOBS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case UPDATE_JOBS_LOADING:
      return {
        ...state,
        loading: true,
        success: {
          state: false,
          type: "",
          message: ""
        }
      };
    case UPDATE_JOBS_SUCCESS:
      return {
        ...state,
        loading: false,
        jobs: action.payload,
        success: {
          state: true,
          type: "Updated",
          message: "Successfully Updated Job"
        },
        updateDisabled: true
      };
    case UPDATE_JOBS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case GET_CURRENT_JOB:
      let thisJob;
      if (state.jobs.find(obj => obj.id === action.payload)) {
        thisJob = state.jobs.find(obj => obj.id === action.payload);
      } else {
        thisJob = state.currentJob;
      }
      return {
        ...state,
        currentJob: {
          ...state.currentJob,
          ...thisJob
        },
        updateDisabled: true
      };
    case UPDATE_CURRENT_JOB:
      return {
        ...state,
        currentJob: {
          ...state.currentJob,
          ...action.payload
        },
        updateDisabled: false
      };
    case UPDATE_JOB_COLUMN_SUCCESS:
      console.log("fired");
      console.log(action.payload[0].id);
      let jobsMinusUpdated = state.jobs.filter(
        job => job.id != action.payload[0].id
      );
      return {
        ...state,
        jobs: [...jobsMinusUpdated, action.payload[0]]
      };
    case ADD_TASKS_LOADING:
      return {
        ...state,
        loading: true
      };
    case ADD_TASKS_SUCCESS:
      return {
        ...state,
        tasks: action.payload,
        loading: false
      };
    case ADD_TASKS_ERROR:
      return {
        ...state,
        loading: false
      };

    case GET_TASKS_LOADING:
      return { ...state, loading: true };

    case GET_TASKS_SUCCESS:
      console.log("get tasks", action.payload);
      return {
        ...state,
        tasks: action.payload,
        loading: false
      };
    case GET_TASKS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case DELETE_TASKS_LOADING:
      return {
        ...state,
        loading: true,
        success: {
          state: false,
          type: "",
          message: ""
        }
      };
    case DELETE_TASKS_SUCCESS:
      return {
        ...state,
        jobs: action.payload,
        loading: false,
        success: {
          state: true,
          type: "Deleted",
          message: "Successfully Deleted"
        }
      };
    case DELETE_TASKS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    // case TOGGLE_TASK: {
    //   return {
    //     ...state,
    //     tasks: state.tasks.map((task) =>
    //       task.id === action.payload
    //         ? { ...task, completed: !task.completed }
    //         : task
    //     ),
    //   };
    // }
    case DELETE_TASKS_LOADING:
      return {
        ...state,
        loading: true,
        success: {
          state: false,
          type: "",
          message: ""
        }
      };
    case DELETE_TASKS_SUCCESS:
      return {
        ...state,
        tasks: action.payload,
        loading: false,
        success: {
          state: true,
          type: "Deleted",
          message: "Task Successfully Deleted"
        }
      };
    case DELETE_TASKS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case CLEAR_MESSAGES:
      return {
        ...state,
        success: {
          state: false,
          type: "",
          message: ""
        }
      };
    case TAGS:
      let jobIds = [];
      state.jobs.forEach(job => {
        jobIds = [...jobIds, job.id];
      });
      let usersTags = action.payload.filter(tag => {
        return jobIds.indexOf(tag.jobPosts_id) > -1;
      });
      return {
        ...state,
        tags: usersTags
      };

    case TAG_FILTER:
      let postIds = [];
      let filteredTags = state.tags.filter(tag => {
        return tag.tagName === action.payload;
      }); //tags that match[{"dfs",postid :3},{"dfs",postid :5}]
      filteredTags.forEach(tag => {
        postIds = [...postIds, tag.jobPosts_id];
      });
      let filteredJobs = state.jobs.filter(job => {
        return postIds.indexOf(job.id) > -1;
      });
      return {
        ...state,
        jobs: filteredJobs
      };
  }
}
