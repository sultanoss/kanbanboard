<template>
  <div class="summary-container">
    <div
      class="summary-header d-flex justify-content-center align-items-center"
    >
      <h2
        style="
          margin: 0px;
          paddind-left: 50px;
          padding-right: 32px;
          border-right: 2px solid #29abe2;
          font-weight: 700;
        "
      >
        Summary
      </h2>
      <span style="font-weight: 400; font-size: 18px; padding-left: 32px"
        >Everything in a nutshell!</span
      >
    </div>
    <div class="summary d-flex justify-content-center align-items-center">
      <div class="summary-items d-flex flex-column align-items-center">
        <div class="row1 d-flex align-items-center">
          <div class="task-info">
            <span>5</span>
            <p>Tasks in Board</p>
          </div>
          <div class="task-info">
            <span>2</span>
            <p>Tasks in Progress</p>
          </div>
          <div class="task-info">
            <span>2</span>
            <p>Awaiting Feedback</p>
          </div>
        </div>
        <div class="row2 d-flex justify-content-center align-items-center">
          <div
            class="status-details d-flex justify-content-center align-items-center"
          >
            <div
              class="urgent-icon d-flex justify-content-center align-items-center"
              style="
                height: 32px;
                width: 32px;
                background-color: #ff5716;
                border-radius: 50%;
              "
            ></div>
            <div
              class="status d-flex flex-column justify-content-center align-items-center"
            >
              <span>1</span>
              <p>Urgent</p>
            </div>
          </div>
          <div class="deadline d-flex flex-column align-items-center">
            <span>October 16,2022</span>
            <p>Upcoming Deadline</p>
          </div>
        </div>
        <div class="row3 d-flex justify-content-center align-items-center">
          <div
            class="summary-todo d-flex justify-content-center align-items-center"
            style="margin-right: 8px"
          >
            <div
              class="todo-icon"
              style="
                height: 32px;
                width: 32px;
                border-radius: 50%;
                background-color: black;
              "
            ></div>
            <div class="todo-details">
              <span>1</span>
              <p>To-do</p>
            </div>
          </div>
          <div
            class="summary-todo d-flex justify-content-center align-items-center"
            style="margin-left: 8px"
          >
            <div
              class="todo-icon"
              style="
                height: 32px;
                width: 32px;
                border-radius: 50%;
                background-color: black;
              "
            ></div>
            <div class="todo-details">
              <span>1</span>
              <p>Done</p>
            </div>
          </div>
        </div>
      </div>
      <div class="summary-welcom d-flex flex-column align-items-center">
        <span style="font-weight: 500; font-size: 28px">Good morning,</span>
        <span
          style="font-weight: 500; font-size: 32px; color: #29abe2"
          v-if="user"
          >{{ user.displayName }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
export default {
  data() {
    return {
      user: null,
    };
  },
  async created() {
    try {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.user = user;
        } else {
          this.user = null;
        }
      });
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    logOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          firebase.auth().onAuthStateChanged(() => {
            this.$router.push("/");
          });
        });
    },
  },
};
</script>

<style scoped lang="scss">
.summary-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.summary-header {
  margin-top: 50px;
  margin-bottom: 50px;
}

.summary-items {
  width: 400px;
}

.summary-welcom {
  width: 400px;
}

.task-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;
  width: 120px;
  background: white;
  border-radius: 16px;
  padding: 16px;
  text-align: center;

  p {
    margin: 0;
  }

  span {
    font-weight: 600;
    font-size: 32px;
  }
}

.row1 {
  justify-content: space-between;
  width: 100%;
}
.row2 {
  padding: 16px;
  background: white;
  border-radius: 16px;
  margin-top: 16px;
  width: 100%;
}

.status {
  padding-left: 16px;
  padding-right: 16px;
  span {
    font-weight: 600;
    font-size: 24px;
  }

  p {
    font-size: 12px;
  }
}

.status-details {
  border-right: 1px solid lightgray;
  width: 50%;
}

.deadline {
  width: 50%;
  padding-left: 16px;
  p {
    margin: 0;
    font-size: 12px;
  }

  span {
    font-weight: 500;
  }
}

.row3 {
  width: 100%;
  margin-top: 16px;
}

.summary-todo {
  width: 192px;
  background-color: white;
  border-radius: 16px;
}
.todo-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
  span {
    font-weight: 600;
    font-size: 24px;
  }
  p {
    font-size: 12px;
  }
}
</style>
