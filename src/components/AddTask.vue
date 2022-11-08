<template>
  <div class="add-task-container">
    <div class="add-task-header">
      <h2 style="margin: 0px">Add Task</h2>
    </div>
    <form class="add-task-form" @submit.prevent="addTask">
      <div class="form d-flex justify-content-center">
        <div class="form-left">
          <div class="mb-3">
            <label for="title" class="form-label">Title</label>
            <input
              type="text"
              class="form-control"
              placeholder="Enter a title"
              required
              v-model="title"
            />
          </div>
          <div class="mb-3">
            <label for="textarea" class="form-label">Description</label>
            <textarea
              class="form-control"
              rows="3"
              placeholder="Enter a Description"
              required
              v-model="description"
            ></textarea>
          </div>
          <div class="mb-3">
            <label for="select" class="form-label">Category</label>
            <select
              class="form-select form-select-sm"
              aria-label=".form-select-sm example"
              required
              v-model="category"
            >
              <option selected disabled>Select task category</option>
              <option value="sales">Sales</option>
              <option value="backoffice">Backoffice</option>
              <option value="products">Products</option>
            </select>
          </div>
          <label for="select" class="form-label">Assigned to</label>
          <div class="mb-3">
            <select
              class="form-select form-select-sm"
              required
              multiple
              v-model="assignedTo"
            >
              <option selected disabled style="font-weight: 500">
                Please hold Ctrl for multi select.
              </option>
              <option
                v-for="user in users"
                :data-value="{
                  firstName: user.firstName,
                  lastName: user.lastName,
                }"
                :key="user"
              >
                {{ user.firstName + " " + user.lastName }}
              </option>
            </select>
          </div>
        </div>
        <div class="form-right">
          <div class="mb-3">
            <label for="date" class="form-label">Due date</label>
            <input type="date" class="form-control" required v-model="dueDate" />
          </div>
          <div class="mb-3">
            <label for="select" class="form-label">Priority</label>
            <select
              class="form-select form-select-sm"
              aria-label=".form-select-sm example"
              required
              v-model="priority"
            >
              <option selected disabled>Set Priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div class="mb-3">
            <label for="subtasks" class="form-label">Subtasks</label>
            <div class="input-group mb-3">
              <div class="search">
                <form @submit.prevent="addSubTask">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Add new subtask"
                    v-model="subTask"
                  />
                  <i class="bi bi-plus" @click="addSubTask"></i>
                </form>
              </div>
            </div>
            <span v-if="alert" style="color: red">Please fill the subtasks fields.</span>
          </div>
          <div class="sub-tasks">
            <div class="subTask" v-for="(subtask, index) in subTasks" :key="subtask">
              {{ subtask.text }}
              <i
                class="bi bi-x"
                style="font-size: 24px; cursor: pointer"
                @click="deleteSubtask(index)"
              ></i>
            </div>
          </div>
        </div>
      </div>
      <div class="form-btn">
        <button
          type="button"
          class="guest btn btn-sm btn-outline-dark m-1"
          style="width: 130px"
          @click="clearAddTask"
        >
          Clear
        </button>
        <button class="btn btn-dark btn-sm m-1" type="submit" style="width: 130px">
          Create Task
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { db } from "@/main";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { collection, onSnapshot } from "firebase/firestore";
export default {
  created() {
    this.getUsers();
  },

  data() {
    return {
      title: "",
      description: "",
      category: "",
      assignedTo: [],
      dueDate: "",
      priority: "",
      subTask: "",
      subTasks: [],
      users: [],
      tasks: [],
      alert: false,
      show: false,
    };
  },

  methods: {
    async addTask() {
      this.tasks = [];
      await db.collection("tasks").add({
        title: this.title,
        description: this.description,
        category: this.category,
        assignedTo: this.assignedTo,
        dueDate: this.dueDate,
        priority: this.priority,
        subTasks: this.subTasks,
        collection: "todos",
      });
      this.clearAddTask();
      this.$router.push("/main/board");
    },

    clearAddTask() {
      this.title = "";
      this.description = "";
      this.category = "";
      this.assignedTo = [];
      this.dueDate = "";
      this.priority = "";
      this.subTask = "";
      this.subTasks = [];
    },

    async getUsers() {
      onSnapshot(collection(db, "users"), async (snap) => {
        snap.forEach((doc) => {
          this.users.push({ ...doc.data(), id: doc.id });
        });
      });
    },

    sortUsers() {
      this.users.sort(function (a, b) {
        let nameA = a.firstName.toLowerCase(),
          nameB = b.firstName.toLowerCase();
        if (nameA < nameB)
          //sort string ascending
          return -1;
        if (nameA > nameB) return 1;
        return 0; //default return value (no sorting)
      });
    },
    addSubTask() {
      if (this.subTask.length == 0) {
        this.alert = true;
      } else {
        this.subTasks.push({ text: this.subTask, isDone: false });
        this.subTask = "";
        this.alert = false;
      }
    },

    deleteSubtask(index) {
      this.subTasks.splice(index, 1);
    },

    showUsers() {
      this.show = !this.show;
    },
  },
};
</script>

<style scoped lang="scss">
.add-task-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1240px;
  margin-left: auto;
  margin-right: auto;
  @media (max-width: 767px) {
    height: calc(100vh - 137px);
  }
}
.add-task-header {
  padding: 50px;
  width: 90%;
  @media (max-width: 767px) {
    padding-top: 12px;
    padding-bottom: 12px;
    padding-left: 24px;
    padding-right: 6px;
    width: 100%;
  }
}
.add-task-form {
  display: flex;
  flex-direction: column;
  width: 90%;
  padding-left: 50px;
  padding-right: 50px;
  height: calc(100vh - 190px);
  justify-content: space-between;
  padding-bottom: 50px;
  font-weight: 500;
  @media (max-width: 767px) {
    height: calc(100vh - 100px);
    overflow: auto;
    padding-left: 16px;
    padding-right: 16px;
  }
}

.form {
  @media (max-width: 767px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
}

.form-left {
  width: 50%;
  padding-right: 50px;
  border-right: 1px solid lightgrey;
  @media (max-width: 767px) {
    border: unset;
    width: 100%;
    padding-right: 0;
  }
}

.select-user {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  label {
    margin: 0;
  }
}

.form-right {
  width: 50%;
  padding-left: 50px;
  @media (max-width: 767px) {
    width: 100%;
    padding-left: 0;
  }
}

.form-btn {
  display: flex;
  justify-content: flex-end;
  @media (max-width: 767px) {
    margin-top: 16px;
  }
}

.search {
  position: relative;
  box-shadow: 0 0 40px rgba(51, 51, 51, 0.1);
}

.search {
  width: 100%;
}

input:focus {
  box-shadow: none;
  outline: 1px solid #29abe2;
}

textarea {
  resize: none;
}

textarea:focus {
  box-shadow: none;
  outline: 1px solid #29abe2;
}

select:focus {
  box-shadow: none;
  outline: 1px solid #29abe2;
}

.search i {
  position: absolute;
  top: 1px;
  right: 5px;
  font-size: 24px;
  cursor: pointer;
}

.sub-tasks {
  max-height: 144px;
  overflow: auto;
}

.subTask {
  justify-content: space-between;
  width: 100%;
  display: flex;
  align-items: center;
  background: white;
  border-radius: 8px;
  padding-left: 12px;
  padding-right: 4px;
  margin-bottom: 16px;
  &:hover {
    background: #212529;
    color: white;
  }
}

.hide {
  display: none;
}
.visible {
  display: flex;
}
</style>
