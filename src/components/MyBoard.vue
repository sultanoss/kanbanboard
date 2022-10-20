<template>
  <div class="board-container">
    <div class="board-header">
      <h2 style="margin: 0px">Board</h2>
      <div class="board-headr-search">
        <div class="input-box" style="margin-right: 16px">
          <input type="text" class="form-control" style="height: 32px" />
          <i class="fs-4 bi-search"></i>
        </div>
        <button
          class="btn btn-dark btn-sm m-1"
          type="submit"
          style="width: 100px"
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
export default {
  components: { DragAndDrop },
};
</script>

<style scoped lang="scss">
.board-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 50px);
  overflow: auto;
}
.board-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 50px;
  width: 90%;
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
</style>
