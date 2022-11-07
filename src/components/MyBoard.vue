<template>
  <!-- addTask Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Add Task</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body" style="background-color: #f7f7f7">
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
                    <option selected>Select task category</option>
                    <option value="sales">Sales</option>
                    <option value="backoffice">Backoffice</option>
                    <option value="products">Products</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="select" class="form-label">Assigned to</label>
                  <select
                    class="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                    required
                    multiple
                    v-model="assignedTo"
                  >
                    <option selected style="font-weight: 500">
                      Select contacts to assign
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
                    <option selected>Set Priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>

                <div class="mb-3">
                  <label for="subtasks" class="form-label">Subtasks</label>
                  <div class="input-group mb-3">
                    <div class="search">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Add new subtask"
                        v-model="subTask"
                      />
                      <i class="bi bi-plus" @click="addSubTask"></i>
                    </div>
                  </div>
                  <span v-if="alert" style="color: red"
                    >Please fill the subtasks fields.</span
                  >
                </div>
                <div class="sub-tasks">
                  <div
                    class="subTask"
                    v-for="(subtask, index) in subTasks"
                    :key="subtask"
                  >
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
              <button
                class="btn btn-dark btn-sm m-1"
                type="submit"
                style="width: 130px"
                data-bs-dismiss="modal"
              >
                Create Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- addTask Modal end -->

  <div class="board-container">
    <div class="board-header">
      <h2 style="margin: 0px">Board</h2>
      <div class="board-headr-search">
        <!-- <div class="input-box" style="margin-right: 16px">
          <input type="text" class="form-control" style="height: 32px" />
          <i class="fs-4 bi-search"></i>
        </div> -->
        <button
          class="btn btn-dark btn-sm m-1"
          type="submit"
          style="width: 100px"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Add Task +
        </button>
      </div>
    </div>
    <DragAndDrop></DragAndDrop>
  </div>
</template>

<script>
import DragAndDrop from "./DragAndDrop.vue";
import { db } from "@/main";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { collection, onSnapshot } from "firebase/firestore";
export default {
  components: { DragAndDrop },

  created() {
    this.getTasks();
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
    };
  },

  methods: {
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
      this.$router.go();
    },

    async getUsers() {
      onSnapshot(collection(db, "users"), async (snap) => {
        snap.forEach((doc) => {
          this.users.push({ ...doc.data(), id: doc.id });
        });
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

    async getTasks() {
      onSnapshot(collection(db, "tasks"), async (snap) => {
        snap.forEach((doc) => {
          this.tasks.push({ ...doc.data(), id: doc.id });
        });
      });
    },
  },
};
</script>

<style scoped lang="scss">
.board-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 50px);
  overflow: auto;
  @media (max-width: 767px) {
    height: calc(100vh - 137px);
  }
  @media (max-width: 767px) and (orientation: landscape) {
    height: calc(100vh - 137px) !important;
  }
}
.board-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 50px;
  width: 100%;
  @media (max-width: 1024px) {
    padding-top: 12px;
    padding-bottom: 0px;
    padding-left: 24px;
    padding-right: 6px;
  }
}

.board-headr-search {
  display: flex;
  align-items: center;
}

.input-box {
  position: relative;
}

.input-box i {
  position: absolute;
  right: 13px;
  top: 2px;
  color: #ced4da;
}

.form-control {
  height: 50px;
  background-color: #eeeeee69;
}

.form-control:focus {
  background-color: #eeeeee69;
  box-shadow: none;
  border-color: #eee;
}

.fs-4 {
  font-size: 1.2rem !important;
  color: black !important;
}

.add-task-form {
  display: flex;
  flex-direction: column;
  width: 100%;
  font-weight: 500;
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
  top: 7px;
  right: 5px;
  font-size: 24px;
  cursor: pointer;
}

.sub-tasks {
  max-height: 148px;
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

  .modal-body {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
