import api from "../../utils/api";
import store from "store";
import { applyMiddleware } from "redux";
export const GET_JOBS_ERROR = "GET_JOBS_ERROR";
export const GET_JOBS_LOADING = "GET_JOBS_LOADING";
export const GET_JOBS_SUCCESS = "GET_JOBS_SUCCESS";

export const GET_USER_ERROR = "GET_USER_ERROR";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_LOADING = "GET_USER_LOADING";

export const GET_CURRENT_JOB = "GET_CURRENT_JOB";
export const UPDATE_CURRENT_JOB = "UPDATE_CURRENT_JOB";

export const DELETE_JOBS_LOADING = "DELETE_JOBS_LOADING";
export const DELETE_JOBS_SUCCESS = "DELETE_JOBS_SUCCESS";
export const DELETE_JOBS_ERROR = "DELETE_JOBS_ERROR";

export const UPDATE_JOBS_LOADING = "UPDATE_JOBS_LOADING";
export const UPDATE_JOBS_SUCCESS = "UPDATE_JOBS_SUCCESS";
export const UPDATE_JOBS_ERROR = "UPDATE_JOBS_ERROR";

export const UPDATE_JOB_COLUMN_SUCCESS = "UPDATE_JOB_COLUMN_SUCCESS";
export const UPDATE_JOB_COLUMN_ERROR = "UPDATE_JOB_COLUMN_ERROR";

export const ADD_TASKS_LOADING = "GET_TASKS_LOADING";
export const ADD_TASKS_ERROR = "GET_TASKS_ERROR";
export const ADD_TASKS_SUCCESS = "GET_TASKS_SUCCESS";

export const GET_TASKS_LOADING = "GET_TASKS_LOADING";
export const GET_TASKS_ERROR = "GET_TASKS_ERROR";
export const GET_TASKS_SUCCESS = "GET_TASKS_SUCCESS";

export const DELETE_TASKS_LOADING = "DELETE_TASKS_LOADING";
export const DELETE_TASKS_SUCCESS = "DELETE_TASKS_SUCCESS";
export const DELETE_TASKS_ERROR = "DELETE_TASKS_ERROR";

export const TOGGLE_TASK = "TOGGLE_TASK";
export const CLEAR_MESSAGES = "CLEAR_MESSAGES";
export const TAG_FILTER = "TAG_FILTER";
export const TAGS = "TAGS";
export const DELETE_TAG = "DELETE_TAG";

export function getUser() {
  return dispatch => {
    dispatch({ type: GET_USER_LOADING });
    try {
      const user = store.get("okta-token-storage").idToken.claims.name;
      dispatch({ type: GET_USER_SUCCESS, payload: user });
    } catch (err) {
      dispatch({ type: GET_USER_ERROR, payload: err });
    }
  };
}

export function getJobs() {
  return dispatch => {
    dispatch({ type: GET_JOBS_LOADING });
    api()
      .get("/users/jobs")
      .then(res => {
        dispatch({ type: GET_JOBS_SUCCESS, payload: res.data });
      })

      .catch(error => {
        dispatch({ type: GET_JOBS_ERROR, payload: error });
      });
  };
}

export function deleteJob(jobId) {
  return dispatch => {
    dispatch({ type: DELETE_JOBS_LOADING });

    api()
      .delete(`/users/removeJob/${jobId}`)
      .then(res => {
        if (res.status === 200) {
          api()
            .get("/users/jobs")
            .then(res => {
              localStorage.removeItem("destItems");
              dispatch({ type: DELETE_JOBS_SUCCESS, payload: res.data });
            })
            .then(() => {
              setTimeout(() => {
                dispatch({ type: CLEAR_MESSAGES });
              }, 2500);
            })

            .catch(error => {
              dispatch({ type: DELETE_JOBS_ERROR, payload: error });
            });
        }
      })
      .catch(error => {
        dispatch({ type: DELETE_JOBS_ERROR, payload: error });
      });
  };
}

export function getCurrentJob(jobId) {
  return dispatch => {
    dispatch({ type: GET_CURRENT_JOB, payload: jobId });
  };
}

export function updateCurrentJob(job) {
  return dispatch => {
    dispatch({ type: UPDATE_CURRENT_JOB, payload: job });
  };
}
export function updateJobInColumn(jobId, job) {
  return dispatch => {
    api()
      .put(`/users/updateJob/${jobId}`, job)
      .then(res => {
        if (res.status === 200) {
          api()
            .get("/users/jobs")
            .then(res => {
              let updatedColumn = res.data.filter(job => job.id === jobId);
              console.log(updatedColumn);
              dispatch({
                type: UPDATE_JOB_COLUMN_SUCCESS,
                payload: updatedColumn
              });
            });
        }
      })
      .catch(error => {
        dispatch({ type: UPDATE_JOB_COLUMN_ERROR, payload: error });
      });
  };
}
export function updateJob(jobId, job) {
  return dispatch => {
    api()
      .put(`/users/updateJob/${jobId}`, job)
      .then(res => {
        if (res.status === 200) {
          api()
            .get("/users/jobs")
            .then(res => {
              dispatch({ type: UPDATE_JOBS_SUCCESS, payload: res.data });
            })
            .then(() => {
              setTimeout(() => {
                dispatch({ type: CLEAR_MESSAGES });
              }, 2500);
            })

            .catch(error => {
              dispatch({ type: UPDATE_JOBS_ERROR, payload: error });
            });
        }
      })
      .catch(error => {
        dispatch({ type: UPDATE_JOBS_ERROR, payload: error });
      });
  };
}

export function getTasks(id) {
  return dispatch => {
    api()
      .get(`/users/tasks/${id}`)
      .then(res => {
        console.log("fired get tasks", res);
        dispatch({ type: GET_TASKS_SUCCESS, payload: res.data });
      })

      .catch(error => {
        dispatch({ type: GET_TASKS_ERROR, payload: error });
      });
  };
}
export function addTask(task, id) {
  return dispatch => {
    api()
      .post(`users/tasks/${id}/addTask`, task)
      .then(res => {
        api()
          .get(`/users/tasks/${id}`)
          .then(res => {
            dispatch({ type: GET_TASKS_SUCCESS, payload: res.data });
          });
      })
      .catch(error => {
        console.log(error.message);
        dispatch({ type: ADD_TASKS_ERROR, payload: error });
      });
  };
}

export function deleteTask(id, jobid) {
  return dispatch => {
    console.log(id, jobid);
    api()
      .delete(`/users/tasks/${id}`)
      .then(res => {
        console.log("from delete", res.status);
        if (res.status === 204) {
          api()
            .get(`users/tasks/${jobid}`)
            .then(res => {
              dispatch({ type: GET_TASKS_SUCCESS, payload: res.data });
            })

            .catch(error => {
              dispatch({ type: DELETE_TASKS_ERROR, payload: error });
            });
        }
      });
  };
}

export function toggleTask(id) {
  console.log("id", id);
  return {
    type: TOGGLE_TASK,
    payload: id
  };
}

export function clearMessages() {
  return dispatch => {
    dispatch({ type: CLEAR_MESSAGES });
  };
}
export function getTags() {
  return dispatch => {
    api()
      .get("users/tags")
      .then(res => {
        dispatch({ type: TAGS, payload: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export function addTag(tag, id) {
  return dispatch => {
    api()
      .post(`users/tags/addTag/${id}`, { tagName: tag })
      .then(res => {
        api()
          .get("users/tags")
          .then(res => {
            dispatch({ type: TAGS, payload: res.data });
          });
      });
  };
}
export function deleteTag(id) {
  return dispatch => {
    api()
      .delete(`users/tags/removeTag/${id}`)
      .then(res => {
        api()
          .get("users/tags")
          .then(res => {
            dispatch({ type: TAGS, payload: res.data });
          });
      });
  };
}
export function filterByTag(tag) {
  return dispatch => {
    dispatch({ type: TAG_FILTER, payload: tag });
  };
}
