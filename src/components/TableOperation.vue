<template>
    <span>
        <button type="button" @click="deleteRow(rowData,index)">刪除</button>
    </span>
</template>

<script>
export default {
    name: 'table-operation',
    props:{
        rowData:{
            type:Object
        },
        index:{
            type:Number
        }
    },
    methods:{
        deleteRow(){
            let params = {type:'delete',index:this.index, key: this.rowData.user_id};
            this.$emit('on-custom-comp',params);
        }
    }
}
</script>
