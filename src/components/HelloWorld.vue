<template>
  <div class="hello">
    <form>
      member:
      <input type="text" v-model="inputName">
      <br>age:
      <input type="number" v-model="inputAge">
      <br>
      <input type="button" value="Submit" @click="addMember(inputName, inputAge)">
    </form>

    <div v-for="member in members" :key="member.id">
      <p>ID: {{member.id}} & member:{{member.name}} & age：{{member.age}}</p>
    </div>

    <v-table
      is-horizontal-resize
      style="width:100%"
      :columns="columns"
      :table-data="tableData"
      row-hover-color="#eee"
      row-click-color="#edf7ff"
    ></v-table>
  </div>
</template>

<script>
import Vue from "vue";
import { db } from "../main";

// 引入样式
import "vue-easytable/libs/themes-base/index.css";

// 导入 table 和 分页组件
import { VTable, VPagination } from "vue-easytable";

// 注册到全局
Vue.component(VTable.name, VTable);
Vue.component(VPagination.name, VPagination);

export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {
      members: [],
      inputName: "John",
      inputAge: 18
    };
  },
  firestore() {
    return {
      members: db.collection("members").orderBy("name")
    };
  },
  methods:{
    addMember(name1, age1) {
      name1 = age1; // for building
      // 注意：在 add 資料時，可以用另一種方式來設值(如下)，但欄位名要相同才行
      let name = this.inputName;
      let age = this.inputAge;

      db.collection("members").add({
        name,
        age
      });

      // db.collection("members").add({
      //     name: name1,
      //     age: age1
      // });

      this.inputName = null;
      this.inputAge = null;
    }
  }
};
</script>
