<!-- eslint-disable vue/no-deprecated-filter -->
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
      <span
        style="
          font-weight: 500;
          font-size: 18px;
          padding-left: 32px;
          color: #433b3b;
        "
        >Everything in a nutshell!</span
      >
    </div>
    <div class="summary d-flex justify-content-center align-items-center">
      <div class="summary-items d-flex flex-column align-items-center">
        <div class="row1 d-flex align-items-center">
          <div class="task-info">
            <span>{{ this.tasks.length }}</span>
            <p>Tasks in Board</p>
          </div>
          <div class="task-info">
            <span>{{ this.inProgress.length }}</span>
            <p>Tasks in Progress</p>
          </div>
          <div class="task-info">
            <span>{{ this.feedbacks.length }}</span>
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
            >
              <i
                class="bi bi-chevron-double-up"
                style="color: white; font-size: 22px"
              ></i>
            </div>
            <div
              class="status d-flex flex-column justify-content-center align-items-center"
            >
              <span>{{ this.urgentTasks.length }}</span>
              <p>Urgent</p>
            </div>
          </div>
          <div class="deadline d-flex flex-column align-items-center">
            <span v-if="minDate">{{ dateTime(minDate) }}</span>
            <p>Upcoming Deadline</p>
          </div>
        </div>
        <div class="row3 d-flex justify-content-center align-items-center">
          <div
            class="summary-todo d-flex justify-content-center align-items-center"
            style="margin-right: 8px"
          >
            <div
              class="todo-icon d-flex flex-column justify-content-center align-items-center"
              style="
                height: 32px;
                width: 32px;
                border-radius: 50%;
                background-color: #2a3647;
              "
            >
              <i class="bi bi-pencil" style="color: white; font-size: 16px"></i>
            </div>
            <div class="todo-details">
              <span>{{ this.todos.length }}</span>
              <p>To-do</p>
            </div>
          </div>
          <div
            class="summary-todo d-flex justify-content-center align-items-center"
            style="margin-left: 8px"
          >
            <div
              class="todo-icon d-flex flex-column justify-content-center align-items-center"
              style="
                height: 32px;
                width: 32px;
                border-radius: 50%;
                background-color: #2a3647;
              "
            >
              <i
                class="bi bi-check-lg"
                style="color: white; font-size: 22px"
              ></i>
            </div>
            <div class="todo-details">
              <span>{{ this.done.length }}</span>
              <p>Done</p>
            </div>
          </div>
        </div>
      </div>
      <div class="summary-welcom d-flex flex-column align-items-center">
        <span style="font-weight: 500; font-size: 62px">Hello,</span>
        <span
          style="font-weight: 500; font-size: 48px; color: #29abe2"
          v-if="user"
          >{{ user.displayName }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import { db } from "@/main";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { collection, onSnapshot } from "firebase/firestore";
import moment from "moment";

export default {
  data() {
    return {
      user: null,
      todos: [],
      inProgress: [],
      feedbacks: [],
      done: [],
      tasks: [],
      urgentTasks: [],
      minDate: "",
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
    this.getTasks();
  },
  methods: {
    dateTime(value) {
      return moment(value).format("DD.MM.YY");
    },

    async getTasks() {
      onSnapshot(collection(db, "tasks"), async (snap) => {
        snap.forEach((doc) => {
          this.tasks.push({ ...doc.data(), id: doc.id });
        });
      });

      this.getTodos();
      this.getInProgress();
      this.getFeedbacks();
      this.getDone();
      this.getUrgentTasks();
    },
    async getTodos() {
      await db
        .collection("tasks")
        .where("collection", "==", "todos")
        .get()
        .then((snap) => {
          snap.forEach((doc) => {
            this.todos.push({ ...doc.data(), id: doc.id });
          });
        });
    },

    async getInProgress() {
      await db
        .collection("tasks")
        .where("collection", "==", "inProgress")
        .get()
        .then((snap) => {
          snap.forEach((doc) => {
            this.inProgress.push({ ...doc.data(), id: doc.id });
          });
        });
    },

    async getFeedbacks() {
      await db
        .collection("tasks")
        .where("collection", "==", "feedbacks")
        .get()
        .then((snap) => {
          snap.forEach((doc) => {
            this.feedbacks.push({ ...doc.data(), id: doc.id });
          });
        });
    },

    async getDone() {
      await db
        .collection("tasks")
        .where("collection", "==", "done")
        .get()
        .then((snap) => {
          snap.forEach((doc) => {
            this.done.push({ ...doc.data(), id: doc.id });
          });
        });
    },

    async getUrgentTasks() {
      await db
        .collection("tasks")
        .where("priority", "==", "High")
        .get()
        .then((snap) => {
          snap.forEach((doc) => {
            this.urgentTasks.push({ ...doc.data(), id: doc.id });
          });
        });
      this.getOldestDate();
    },

    getOldestDate() {
      // Get Min date
      const minDate = new Date(
        Math.min(
          ...this.urgentTasks.map((element) => {
            return new Date(element.dueDate);
          })
        )
      );
      this.minDate = minDate;
    },
  },
};
</script>

<style scoped lang="scss">
.summary-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  @media (max-width: 1200px) {
    margin-top: 0;
    height: calc(100vh - 50px);
    justify-content: center;
  }
  @media (max-width: 767px) {
    height: calc(100vh - 100px) !important;
  }

  @media (max-width: 767px) and (orientation: landscape) {
    height: calc(100vh - 61px) !important;
    justify-content: unset;
    overflow: auto;
    padding-top: 16px;
  }
}
.summary-header {
  margin-top: 50px;
  margin-bottom: 50px;
}

.summary {
  @media (max-width: 1200px) {
    flex-direction: column-reverse;
  }
}

.summary-header {
  @media (max-width: 1200px) {
    margin: unset;
  }
  @media (max-width: 576px) {
    flex-direction: column;
    h2 {
      border-right: unset !important;
      padding-right: unset !important;
      margin-bottom: 8px !important;
      font-size: 20px;
    }
    span {
      margin-bottom: 16px;
      padding-left: unset !important;
      font-size: 14px !important;
    }
  }
}

.summary-items {
  width: 400px;
  @media (max-width: 576px) {
    width: 320px;
  }
}

.summary-welcom {
  width: 400px;
  @media (max-width: 1200px) {
    margin-top: 16px;
    margin-bottom: 16px;
    span {
      font-size: 32px !important;
    }
  }
  @media (max-width: 576px) {
    display: none !important;
  }
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

  @media (max-width: 576px) {
    height: 90px;
    width: 90px;
    padding: 8px;
  }

  p {
    margin: 0;
    font-weight: 500;
  }

  span {
    font-weight: 600;
    font-size: 32px;
    @media (max-width: 576px) {
      font-size: 24px;
    }
  }
}

.row1 {
  justify-content: space-between;
  width: 100%;
  @media (max-width: 576px) {
    width: 90%;
  }
}
.row2 {
  padding: 16px;
  background: white;
  border-radius: 16px;
  margin-top: 16px;
  width: 100%;
  @media (max-width: 576px) {
    padding: 8px;
    width: 90%;
  }
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
    font-weight: 500;
    @media (max-width: 576px) {
      margin-bottom: 0;
    }
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
    font-weight: 500;
  }

  span {
    font-weight: 500;
  }
}

.row3 {
  width: 100%;
  margin-top: 16px;
  @media (max-width: 576px) {
    width: 90%;
  }
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
  @media (max-width: 576px) {
    padding: 8px;
  }
  span {
    font-weight: 600;
    font-size: 24px;
  }
  p {
    font-size: 12px;
    font-weight: 500;
    margin-bottom: 0;
  }
}
</style>
