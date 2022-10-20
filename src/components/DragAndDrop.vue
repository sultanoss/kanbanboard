<template>
  <div class="kanban">
    <div class="drop-column">
      <div class="drop-zone-title">
        <span>To do</span>
      </div>
      <draggable v-model="items" class="drop-zone">
        <template v-slot:item="{ item }">
          <!-- example -->
          <div class="drag-el">
            {{ item.name }}
          </div>
          <!-- or your own template -->
        </template>
      </draggable>
    </div>
    <div class="drop-column">
      <div class="drop-zone-title">
        <span>In progress</span>
      </div>
      <draggable v-model="items2" class="drop-zone">
        <template v-slot:item="{ item }">
          <!-- example -->
          <div class="drag-el">
            {{ item.name }}
          </div>
          <!-- or your own template -->
        </template>
      </draggable>
    </div>
    <div class="drop-column">
      <div class="drop-zone-title">
        <span>Awaiting feedback</span>
      </div>
      <draggable v-model="items3" class="drop-zone">
        <template v-slot:item="{ item }">
          <!-- example -->
          <div class="drag-el">
            {{ item.name }}
          </div>
          <!-- or your own template -->
        </template>
      </draggable>
    </div>
    <div class="drop-column">
      <div class="drop-zone-title">
        <span>Done</span>
      </div>
      <draggable v-model="items4" class="drop-zone">
        <template v-slot:item="{ item }">
          <!-- example -->
          <div class="drag-el">
            {{ item.name }}
          </div>
          <!-- or your own template -->
        </template>
      </draggable>
    </div>
  </div>
</template>

<script>
import Draggable from "vue3-draggable";

export default {
  components: {
    Draggable,
  },
  data() {
    return {
      items: [{ name: "1" }, { name: "2" }, { name: "3" }, { name: "4" }],
      items2: [{ name: "5" }],
      items3: [{ name: "6" }],
      items4: [{ name: "7" }],
    };
  },
};
</script>

<style scoped lang="scss">
.kanban {
  display: flex;
  justify-content: space-between;
  width: 90%;
  padding-left: 50px;
  padding-right: 50px;
}

.drop-zone {
  min-height: 132px;
  width: 220px;
  overflow: auto;
}
.drag-el {
  padding: 5px;
  margin-bottom: 16px;
  background-color: white;
  height: 130px;
  border-radius: 16px;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: grab;
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
</style>
