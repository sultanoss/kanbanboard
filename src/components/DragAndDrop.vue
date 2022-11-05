<template>
  <!-- taskdetails Modal  -->
  <div
    class="modal fade"
    id="boardModal"
    tabindex="-1"
    aria-labelledby="boardLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Task infos</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div :class="categoryColor">
            {{ selectedTodo.category }}
          </div>
          <span class="title">{{ selectedTodo.title }}</span>
          <p>{{ selectedTodo.description }}</p>
          <div class="due-date">
            Due Date:
            <span class="date">{{ dateTime(selectedTodo.dueDate) }}</span>
          </div>
          <div class="priority d-flex" style="margin-bottom: 8px">
            <span>Priority:</span>
            <div :class="priorityColor">
              {{ selectedTodo.priority }}
            </div>
          </div>
          <div
            class="subTasks-items"
            style="margin-bottom: 8px"
            v-if="!selectedTodo.subTasks || !selectedTodo.subTasks.length == 0"
          >
            <span style="font-weight: 700">Subtasks:</span>
            <div class="d-flex flex-column" style="font-weight: 500">
              <div
                class="subtask d-flex"
                v-for="(subTask, index) in selectedTodo.subTasks"
                :key="index"
              >
                <span
                  :id="index"
                  :class="{ taskDone: selectedTodo.subTasks[index].isDone }"
                  style="max-width: 280px"
                  >{{ subTask.text }}</span
                >
                <div class="d-flex align-items-center">
                  <i
                    class="bi bi-clipboard2-check"
                    style="font-size: 20px; cursor: pointer"
                    data-bs-toggle="tooltip"
                    data-bs-placement="right"
                    title="Done"
                    @click="subTaskDone(index)"
                  ></i>
                  <i
                    class="bi bi-arrow-return-left"
                    style="font-size: 20px; cursor: pointer; margin-left: 16px"
                    data-bs-toggle="tooltip"
                    data-bs-placement="right"
                    title="Remove Done"
                    @click="removeDoneStatus(index)"
                  ></i>
                </div>
              </div>
            </div>
          </div>
          <div class="assigned">
            <span>Assigned To:</span>
            <div
              class="users"
              v-for="user in selectedTodo.assignedTo"
              :key="user.id"
            >
              <div
                v-bind:style="{ backgroundColor: getRandomColor() }"
                class="avatar-icon"
              >
                <span>{{ getInitials(user) }}</span>
              </div>
              <div class="user-infos">
                <span style="font-weight: 500; font-size: 14px">{{
                  user
                }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <i
            class="bi bi-trash delete-task"
            style="color: red; cursor: pointer; font-size: 22px"
            data-bs-dismiss="modal"
            @click="deleteTask(selectedTodo.subId)"
          ></i>
        </div>
      </div>
    </div>
  </div>
  <!--end Modal -->

  <div class="groups">
    <!-- todo container -->

    <div class="group">
      <div class="drop-zone-title">
        <span>To do ({{ this.todos.length }})</span>
      </div>
      <div class="no-todos" v-if="this.todos.length == 0">
        <p>No Tasks</p>
      </div>
      <Container
        group-name="1"
        :get-child-payload="getChildPayload1"
        :fire-related-events-only="true"
        @drop="onDrop('todos', $event)"
        @drop-ready="onDragReady"
      >
        <Draggable v-for="item in todos" :key="item.id">
          <div class="draggable-item">
            <div class="drag-el-row1 mb-1 d-flex">
              <span class="categoryTodo">{{ item.category }}</span>
              <p>{{ item.dueDate }}</p>
            </div>
            <span class="mb-1" style="font-weight: 500; color: #363636">{{
              item.title
            }}</span>
            <p>{{ item.description }}</p>
            <div class="sub-tasks" v-if="item.subTasks.length > 0">
              <p style="color: #363636; margin-right: 4px">Subtasks</p>
              <p style="color: #363636">({{ item.subTasks.length }})</p>
            </div>
            <div
              class="assignedTo d-flex justify-content-between align-items-center"
            >
              <div class="avatar-container d-flex">
                <div
                  v-for="user in item.assignedTo"
                  :key="user"
                  v-bind:style="{ backgroundColor: getRandomColor() }"
                  class="avatar-icon"
                >
                  <span>{{ getInitials(user) }}</span>
                </div>
              </div>

              <div
                class="task-priorrity d-flex align-items-center"
                v-if="item.priority == 'High'"
              >
                <i
                  class="bi bi-chevron-double-up"
                  style="color: #f70000; font-size: 22px"
                ></i>
              </div>
              <div
                class="task-priorrity d-flex align-center"
                v-if="item.priority == 'Medium'"
              >
                <i
                  class="bi bi-chevron-bar-contract"
                  style="color: #fb6b00; font-size: 22px"
                ></i>
              </div>
              <div
                class="task-priorrity d-flex align-center"
                v-if="item.priority == 'Low'"
              >
                <i
                  class="bi bi-chevron-double-down"
                  style="color: #00c209; font-size: 22px"
                ></i>
              </div>
              <i
                class="bi bi-arrows-angle-expand"
                @click="getTask(item.id)"
                data-bs-toggle="modal"
                data-bs-target="#boardModal"
                style="cursor: pointer"
              ></i>
            </div>
          </div>
        </Draggable>
      </Container>
      <!--  todo container end -->
    </div>
    <!-- inprogress container -->

    <div class="group">
      <div class="drop-zone-title">
        <span>In progress ({{ this.inProgress.length }})</span>
      </div>
      <div class="no-todos" v-if="this.inProgress.length == 0">
        <p>No Tasks</p>
      </div>
      <Container
        group-name="1"
        :get-child-payload="getChildPayload2"
        @drop="onDrop('inProgress', $event)"
        @drop-ready="onDragReady2"
      >
        <Draggable v-for="item in inProgress" :key="item.id">
          <div class="draggable-item">
            <div class="drag-el-row1 mb-1 d-flex">
              <div class="categoryProgress">
                <span>{{ item.category }}</span>
              </div>
              <p>{{ item.dueDate }}</p>
            </div>
            <span class="mb-1" style="font-weight: 500">{{ item.title }}</span>
            <p>{{ item.description }}</p>
            <div class="sub-tasks" v-if="item.subTasks.length > 0">
              <p style="color: #363636; margin-right: 4px">Subtasks</p>
              <p style="color: #363636">({{ item.subTasks.length }})</p>
            </div>
            <div
              class="assignedTo d-flex justify-content-between align-items-center"
            >
              <div class="avatar-container d-flex">
                <div
                  v-for="user in item.assignedTo"
                  :key="user"
                  v-bind:style="{ backgroundColor: getRandomColor() }"
                  class="avatar-icon"
                >
                  <span>{{ getInitials(user) }}</span>
                </div>
              </div>

              <div
                class="task-priorrity d-flex align-items-center"
                v-if="item.priority == 'High'"
              >
                <i
                  class="bi bi-chevron-double-up"
                  style="color: #f70000; font-size: 22px"
                ></i>
              </div>
              <div
                class="task-priorrity d-flex align-center"
                v-if="item.priority == 'Medium'"
              >
                <i
                  class="bi bi-chevron-bar-contract"
                  style="color: #fb6b00; font-size: 22px"
                ></i>
              </div>
              <div
                class="task-priorrity d-flex align-center"
                v-if="item.priority == 'Low'"
              >
                <i
                  class="bi bi-chevron-double-down"
                  style="color: #00c209; font-size: 22px"
                ></i>
              </div>
              <i
                class="bi bi-arrows-angle-expand"
                @click="getTask(item.id)"
                data-bs-toggle="modal"
                data-bs-target="#boardModal"
                style="cursor: pointer"
              ></i>
            </div>
          </div>
        </Draggable>
      </Container>
      <!--  inprogress container end -->
    </div>
    <div class="group">
      <!-- awaiting feedback container -->

      <div class="drop-zone-title">
        <span>Awaiting Feedback ({{ this.feedbacks.length }})</span>
      </div>
      <div class="no-todos" v-if="this.feedbacks.length == 0">
        <p>No Tasks</p>
      </div>
      <Container
        group-name="1"
        :get-child-payload="getChildPayload3"
        @drop="onDrop('feedbacks', $event)"
        @drop-ready="onDragReady3"
      >
        <Draggable v-for="item in feedbacks" :key="item.id">
          <div class="draggable-item">
            <div class="drag-el-row1 mb-1 d-flex">
              <div class="categoryFeedback">
                <span>{{ item.category }}</span>
              </div>
              <p>{{ item.dueDate }}</p>
            </div>
            <span class="mb-1" style="font-weight: 500">{{ item.title }}</span>
            <p>{{ item.description }}</p>
            <div class="sub-tasks" v-if="item.subTasks.length > 0">
              <p style="color: #363636; margin-right: 4px">Subtasks</p>
              <p style="color: #363636">({{ item.subTasks.length }})</p>
            </div>
            <div
              class="assignedTo d-flex justify-content-between align-items-center"
            >
              <div class="avatar-container d-flex">
                <div
                  v-for="user in item.assignedTo"
                  :key="user"
                  v-bind:style="{ backgroundColor: getRandomColor() }"
                  class="avatar-icon"
                >
                  <span>{{ getInitials(user) }}</span>
                </div>
              </div>

              <div
                class="task-priorrity d-flex align-items-center"
                v-if="item.priority == 'High'"
              >
                <i
                  class="bi bi-chevron-double-up"
                  style="color: #f70000; font-size: 22px"
                ></i>
              </div>
              <div
                class="task-priorrity d-flex align-center"
                v-if="item.priority == 'Medium'"
              >
                <i
                  class="bi bi-chevron-bar-contract"
                  style="color: #fb6b00; font-size: 22px"
                ></i>
              </div>
              <div
                class="task-priorrity d-flex align-center"
                v-if="item.priority == 'Low'"
              >
                <i
                  class="bi bi-chevron-double-down"
                  style="color: #00c209; font-size: 22px"
                ></i>
              </div>
              <i
                class="bi bi-arrows-angle-expand"
                @click="getTask(item.id)"
                data-bs-toggle="modal"
                data-bs-target="#boardModal"
                style="cursor: pointer"
              ></i>
            </div>
          </div>
        </Draggable>
      </Container>
      <!--  awaiting feddback container end -->
    </div>

    <div class="group">
      <!-- done container -->

      <div class="drop-zone-title">
        <span>Done ({{ this.done.length }})</span>
      </div>
      <div class="no-todos" v-if="this.done.length == 0">
        <p>No Tasks</p>
      </div>
      <Container
        group-name="1"
        :get-child-payload="getChildPayload4"
        @drop="onDrop('done', $event)"
        @drop-ready="onDragReady4"
      >
        <Draggable v-for="item in done" :key="item.id">
          <div class="draggable-item">
            <div class="drag-el-row1 mb-1 d-flex">
              <div class="categoryDone">
                <span>{{ item.category }}</span>
              </div>
              <p>{{ item.dueDate }}</p>
            </div>
            <span class="mb-1" style="font-weight: 500">{{ item.title }}</span>
            <p>{{ item.description }}</p>
            <div class="sub-tasks" v-if="item.subTasks.length > 0">
              <p style="color: #363636; margin-right: 4px">Subtasks</p>
              <p style="color: #363636">({{ item.subTasks.length }})</p>
            </div>
            <div
              class="assignedTo d-flex justify-content-between align-items-center"
            >
              <div class="avatar-container d-flex">
                <div
                  v-for="user in item.assignedTo"
                  :key="user"
                  v-bind:style="{ backgroundColor: getRandomColor() }"
                  class="avatar-icon"
                >
                  <span>{{ getInitials(user) }}</span>
                </div>
              </div>
              <div
                class="task-priorrity d-flex align-items-center"
                v-if="item.priority == 'High'"
              >
                <i
                  class="bi bi-chevron-double-up"
                  style="color: #f70000; font-size: 22px"
                ></i>
              </div>
              <div
                class="task-priorrity d-flex align-center"
                v-if="item.priority == 'Medium'"
              >
                <i
                  class="bi bi-chevron-bar-contract"
                  style="color: #fb6b00; font-size: 22px"
                ></i>
              </div>
              <div
                class="task-priorrity d-flex align-center"
                v-if="item.priority == 'Low'"
              >
                <i
                  class="bi bi-chevron-double-down"
                  style="color: #00c209; font-size: 22px"
                ></i>
              </div>
              <i
                class="bi bi-arrows-angle-expand"
                @click="getTask(item.id)"
                data-bs-toggle="modal"
                data-bs-target="#boardModal"
                style="cursor: pointer"
              ></i>
            </div>
          </div>
        </Draggable>
      </Container>
    </div>
    <!-- done container end -->
  </div>
</template>

<script>
import { Container, Draggable } from "vue-dndrop";
import { db } from "@/main";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import {
  doc,
  updateDoc,
  collection,
  onSnapshot,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import moment from "moment";

export default {
  name: "Groups",

  components: { Container, Draggable },

  data() {
    return {
      todos: [],
      inProgress: [],
      feedbacks: [],
      done: [],
      colors: [
        "#F44336",
        "#E91E63",
        "#9C27B0",
        "#673AB7",
        "#3F51B5",
        "#2196F3",
        "#03A9F4",
        "#00BCD4",
        "#009688",
        "#4CAF50",
        "#8BC34A",
        "#FF9800",
        "#FF5722",
      ],
      selectedTodo: {},
      tasks: [],
      subTaskDoneStatus: false,
    };
  },

  created() {
    this.getTasks();
  },

  computed: {
    priorityColor: function () {
      return {
        high: this.selectedTodo.priority == "High",
        medium: this.selectedTodo.priority == "Medium",
        low: this.selectedTodo.priority == "Low",
      };
    },

    categoryColor: function () {
      return {
        categoryTodo: this.selectedTodo.collection == "todos",
        categoryProgress: this.selectedTodo.collection == "inProgress",
        categoryFeedback: this.selectedTodo.collection == "feedbacks",
        categoryDone: this.selectedTodo.collection == "done",
      };
    },
  },

  methods: {
    async deleteTask(selectedTodId) {
      await deleteDoc(doc(db, "tasks", `${selectedTodId}`));
      this.$router.go();
    },

    dateTime(value) {
      return moment(value).format("DD.MM.YY");
    },

    async subTaskDone(index) {
      this.selectedTodo.subTasks[index].isDone = true;
      await updateDoc(doc(db, "tasks", `${this.selectedTodo.subId}`), {
        subTasks: this.selectedTodo.subTasks,
      });
    },

    async removeDoneStatus(index) {
      this.selectedTodo.subTasks[index].isDone = false;
      await updateDoc(doc(db, "tasks", `${this.selectedTodo.subId}`), {
        subTasks: this.selectedTodo.subTasks,
      });
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

    async getTask(id) {
      this.selectedTodo = {};
      const snap = await getDoc(doc(db, "tasks", `${id}`));
      if (snap.exists()) {
        this.selectedTodo = Object.assign(
          snap.data(),
          { subId: `${id}` },
          this.selectedTodo
        );
      } else {
        alert("No such document");
      }
    },

    //drag and drop functions

    onDragReady(dropResult) {
      // console.log(dragResult.payload.id);
      updateDoc(doc(db, "tasks", `${dropResult.payload.id}`), {
        collection: "todos",
      });
    },

    onDragReady2(dropResult) {
      updateDoc(doc(db, "tasks", `${dropResult.payload.id}`), {
        collection: "inProgress",
      });
    },

    onDragReady3(dropResult) {
      updateDoc(doc(db, "tasks", `${dropResult.payload.id}`), {
        collection: "feedbacks",
      });
    },

    onDragReady4(dropResult) {
      updateDoc(doc(db, "tasks", `${dropResult.payload.id}`), {
        collection: "done",
      });
    },

    onDrop(collection, dropResult) {
      this[collection] = this.applyDrag(this[collection], dropResult);
    },

    getChildPayload1(index) {
      return this.todos[index];
    },

    getChildPayload2(index) {
      return this.inProgress[index];
    },

    getChildPayload3(index) {
      return this.feedbacks[index];
    },

    getChildPayload4(index) {
      return this.done[index];
    },

    applyDrag(arr, dragResult) {
      const { removedIndex, addedIndex, payload } = dragResult;
      if (removedIndex === null && addedIndex === null) return arr;

      const result = [...arr];
      let itemToAdd = payload;

      if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0];
      }

      if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd);
      }
      return result;
    },

    //drag and drop functions end

    //Avatar

    getRandomColor() {
      let randomIndex = Math.floor(Math.random() * this.colors.length);
      return this.colors[randomIndex];
    },

    getInitials(data) {
      if (data != null) {
        let chr;
        const d = data.toUpperCase();
        chr = d.split(" ");
        if (chr.length >= 2) {
          return chr[0][0] + chr[1][0];
        } else {
          return d[0] + d[1];
        }
      }
      return "";
    },

    activeBg(index) {
      this.activeItem = index;
    },
    //Avatar end
  },
};
</script>

<style lang="scss" scoped>
.groups {
  display: flex;
  justify-content: stretch;
  width: 100%;
  padding-left: 50px;
  padding-right: 50px;
  @media(max-width:320px){
    padding: 0;
  }
}

.group {
  flex: 1;
  margin: 10px;
  @media(max-width:767px){
   margin: 0;
  }
}

.draggable-item {
  margin-bottom: 16px;
  background-color: white;
  width: 250px;
  border-radius: 16px;
  color: black;
  display: flex;
  justify-content: center;
  padding: 10px;
  flex-direction: column;
  cursor: grab;
  p {
    font-size: 14px;
    color: #969696;
    font-weight: 500;
    margin: 0px 0px 4px 0px;
  }
}

.sub-tasks {
  display: flex;
  align-items: center;
  span {
    font-weight: 500;
  }
}

// .subtask-items{
//   display: none;
//   flex-direction: column;
// }

.dndrop-container {
  min-height: 130px;
  min-width: 100%;
}

.drop-zone-title {
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    margin-bottom: 16px;
    margin-top: 6px;
    font-weight: 600;
  }
}

.dndrop-draggable-wrapper {
  display: flex !important;
  justify-content: center;
  width: 100%;
}

.drag-el-row1 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    margin: 0;
  }
}

.avatar-container {
  min-width: 85px;
  max-width: 85px;
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
}

.avatar-icon {
  color: #ffffff;
  border-radius: 50%;
  margin-right: 4px;
  margin-bottom: 4px;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 24px;
  width: 24px;
  font-weight: 600;
}

.categoryTodo {
  width: 115px;
  background: #ff7931;
  text-align: center;
  color: #f8f9fa;
  font-weight: 400;
  border-radius: 8px;
}

.categoryProgress {
  width: 115px;
  background: #dc39cf;
  text-align: center;
  color: #f8f9fa;
  font-weight: 400;
  border-radius: 8px;
}

.categoryFeedback {
  width: 115px;
  background: #2c67cd;
  text-align: center;
  color: #f8f9fa;
  font-weight: 400;
  border-radius: 8px;
}

.categoryDone {
  width: 115px;
  background: #2ccdb1;
  text-align: center;
  color: #f8f9fa;
  font-weight: 400;
  border-radius: 8px;
}

.modal-body {
  .category {
    width: 100px;
    background: #212529;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    color: white;
    padding-top: 4px;
    padding-bottom: 4px;
  }
  .title {
    font-weight: 700;
    font-size: 32px;
  }
  p {
    margin: 0;
    font-weight: 500;
    margin-bottom: 8px;
    color: #363636;
  }
  .date {
    font-weight: 500;
  }
  .due-date {
    font-weight: 700;
    margin-bottom: 8px;
  }

  .priority {
    span {
      margin-right: 18px;
      font-weight: 700;
    }
    .high {
      background: rgb(220 47 0);
      width: 100px;
      display: flex;
      justify-content: center;
      border-radius: 8px;
      color: white;
    }

    .medium {
      background: rgb(242 135 40);
      width: 100px;
      display: flex;
      justify-content: center;
      border-radius: 8px;
      color: white;
    }

    .low {
      background: rgb(29 149 6);
      width: 100px;
      display: flex;
      justify-content: center;
      border-radius: 8px;
      color: white;
    }
  }

  .assigned {
    span {
      font-weight: 700;
    }

    .name {
      font-weight: 500;
      color: #212529;
    }
  }
  .users {
    display: flex;
    margin-top: 8px;
  }
}

.no-todos {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  p {
    color: #a6a6a6;
    font-weight: 400;
  }
}

.subTasks-items {
  display: flex;
  flex-direction: column;
}

.subtask {
  word-break: break-word;
  background: #f4f3f3;
  margin-bottom: 5px;
  padding: 4px;
  border-radius: 4px;
  font-size: 14px;
  align-items: center;
  justify-content: space-between;
  position: relative;
  &:hover {
    background-color: #dfdfdf;
  }
}

.delete-task {
  &:hover {
    transform: scale(1.1);
  }
}

.taskDone {
  text-decoration: line-through;
}

.groups {
  flex-wrap: wrap;
}
</style>
