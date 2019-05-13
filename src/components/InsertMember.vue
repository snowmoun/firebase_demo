<template>
    <form>
      member:
      <input type="text" v-model="inputName">
      <br>age:
      <input type="number" v-model="inputAge">
      <br>
      <input type="button" value="Submit" @click="addMember(inputName, inputAge)">
    </form>
</template>

<script>
export default {
    name: "InsertMember",
    data() {
        return {
            inputName: "John",
            inputAge: 18
        };
    },
    methods:{
        addMember(name, age){
            this.$emit("onAddMember", {name: name, age: age});
        }
    }

}
</script>
