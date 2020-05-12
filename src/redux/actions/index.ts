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

export const UPDATE_JOB_COLUMN_SUCCESS = "UPDATE_JOBS_LOADING";
export const UPDATE_JOB_COLUMN_ERROR = "UPDATE_JOBS_ERROR";

export const GET_TASKS_LOADING = "GET_TASK_LOADING";
export const GET_TASKS_ERROR = "GET_TASKS_ERROR";
export const GET_TASKS_SUCCESS = "GET_TASKS_SUCCESS";

export const DELETE_TASKS_LOADING = "DELETE_JOBS_LOADING";
export const DELETE_TASKS_SUCCESS = "DELETE_TASKS_SUCCESS";
export const DELETE_TASKS_ERROR = "DELETE_TASKS_ERROR";

export const GET_INTERVIEWS_LOADING = "GET_INTERVIEWS_LOADING";
export const GET_INTERVIEWS_ERROR = "GET_INTERVIEWS_ERROR";
export const GET_INTERVIEWS_SUCCESS = "GET_INTERVIEWS_SUCCESS";

export const CLEAR_MESSAGES = "CLEAR_MESSAGES";

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
        console.log(res.status);
        if (res.status === 200) {
          api()
            .get("/users/jobs")
            .then(res => {
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
export function updateJob(jobId, job) {
  console.log(job);
  return dispatch => {
    // dispatch({ type: UPDATE_JOBS_LOADING });

    api()
      .put(`/users/updateJob/${jobId}`, job)
      .then(res => {
        console.log(res.status);
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

export function getTasks() {
  return dispatch => {
    dispatch({ type: GET_TASKS_LOADING });
    api()
      .get("/tasks")
      .then(res => {
        dispatch({
          type: GET_TASKS_SUCCESS,
          payload: [{ taskName: "apply", date: "02/20/2020", completed: false }]
        });
      })

      .catch(error => {
        dispatch({ type: GET_TASKS_ERROR, payload: error });
      });
  };
}

export function deleteTask(taskId) {
  return dispatch => {
    dispatch({ type: DELETE_TASKS_LOADING });

    api()
      .delete(`/users/ADD WHAT IS NEEDED/${taskId}`)
      .then(res => {
        console.log(res.status);
        if (res.status === 200) {
          api()
            .get("")
            .then(res => {
              dispatch({ type: DELETE_TASKS_SUCCESS, payload: res.data });
            })
            .then(() => {
              setTimeout(() => {
                dispatch({ type: CLEAR_MESSAGES });
              }, 2500);
            })

            .catch(error => {
              dispatch({ type: DELETE_TASKS_ERROR, payload: error });
            });
        }
      })
      .catch(error => {
        dispatch({ type: DELETE_TASKS_ERROR, payload: error });
      });
  };
}

export function getInterviews() {
  return dispatch => {
    dispatch({ type: GET_INTERVIEWS_LOADING });
    // api()
    // .get("/tasks")
    // .then((res) => {
    dispatch({
      type: GET_INTERVIEWS_SUCCESS,
      payload: [
        { interviewName: "Phone 1st", date: "02/20/2020", time: "2:30 pm" }
      ]
    });
    // })

    //     .catch((error) => {
    //       dispatch({ type: GET_TASKS_ERROR, payload: error });
    //     });
  };
}

export function clearMessages() {
  return dispatch => {
    dispatch({ type: CLEAR_MESSAGES });
  };
}
