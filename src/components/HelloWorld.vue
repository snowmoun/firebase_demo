<template>
  <div class="hello">

    <va-carousel
              :name="carousel.name"
              :list="carousel.list"
            >
            </va-carousel>


    <InsertMember @onAddMember="addMember"></InsertMember>

    <div v-for="member in members" :key="member.id">
      <p>ID: {{member.id}} & member:{{member.name}} & age：{{member.age}}</p>
    </div>

    <v-table
      is-horizontal-resize
      style="width:100%"
      :columns="columns"
      :table-data="users"
      row-hover-color="#eee"
      row-click-color="#edf7ff"
      :cell-edit-done="memberEditDone"
      @on-custom-comp="customCompFunc"
    ></v-table>
  </div>
</template>

<script>
import Vue from "vue";
import { db } from "../main";

// 引入样式
import "vue-easytable/libs/themes-base/index.css";
import VACarousel from 'vue2-admin-lte/src/components/VACarousel.vue'

// 导入 table 和 分页组件
import { VTable, VPagination } from "vue-easytable";

import TableOperation from './TableOperation.vue'
Vue.component('table-operation', TableOperation);

import InsertMember from './InsertMember.vue'
Vue.component('InsertMember', InsertMember);

// css files
import 'vue2-admin-lte/src/lib/css'

// js files
import 'vue2-admin-lte/src/lib/script'

// 注册到全局
Vue.component(VTable.name, VTable);
Vue.component(VPagination.name, VPagination);

export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  components: {
    'va-carousel': VACarousel
  },
  computed: {
    users: function() {
      let data = [];
      for (let index = 0; index < this.members.length; index++) {
        const member = this.members[index];
        let userData = {
          user_id: member.id,
          name: member.name,
          age: member.age
        };

        data.push(userData);
      }

      return data;
    }
  },
  data() {
    return {
      members: [],
      columns: [
        { field: "user_id", title: "id", width: 80, isResize: true, titleAlign: "center", columnAlign: "center", isEdit: false },
        { field: "name", title: "姓名", width: 80, isResize: true, titleAlign: "center", columnAlign: "center", isEdit: true },
        { field: "age", title: "年齡", width: 80, isResize: true, titleAlign: "center", columnAlign: "center", isEdit: true },
        { field: "custome-adv", title: "操作", width: 200, titleAlign: "center", columnAlign: "center", componentName: "table-operation", isResize: true }
      ],
      carousel: {
        name: 'carousel-example',
        list: [
          {
            image: 'http://placehold.it/900x500/39CCCC/ffffff&text=I+Love+Bootstrap',
            text: 'First Slide'
          },
          {
            image: 'http://placehold.it/900x500/3c8dbc/ffffff&text=I+Love+Bootstrap',
            text: 'Second Slide'
          },
          {
            image: 'http://placehold.it/900x500/f39c12/ffffff&text=I+Love+Bootstrap',
            text: 'Third Slide'
          }
        ]
      }
    };
  },
  firestore() {
    return {
      members: db.collection("members").orderBy("name")
    };
  },
  methods:{
    addMember(data) {
      db.collection("members").add({
          name: data.name,
          age: data.age
      });
    },
    memberEditDone(newValue, oldValue, rowIndex, rowData, field) {
      if (oldValue !== newValue) {
        rowData[field] = newValue;
        db.collection("members")
          .doc(rowData.user_id)
          .set(rowData)
          .then(() => {
            oldValue = rowIndex;
          });
      }
    },
    customCompFunc(params){
    if (params.type === 'delete'){ // do delete operation
        db.collection("members")
        .doc(params.key)
        .delete();
        }
    }

  }
};
</script>
