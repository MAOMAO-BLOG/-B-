<template>
    <a-form-model class='search-box' layout="inline" :model="searchForm" @submit="handleSubmit" @submit.native.prevent>
        <a-form-model-item label='搜索關鍵字'>
          <a-input v-model="searchForm.keyWord" placeholder="請輸入關鍵字">
          </a-input>
        </a-form-model-item>
        <a-form-model-item label='商品類目'>
            <a-select style="width: 200px" @change="handleChange"  allowClear placeholder="請選擇商品類目">
                  <a-select-option v-for='c in data' :key='c.id' :value='c.id'>{{c.name}}
                  </a-select-option>
            </a-select>
        </a-form-model-item>
        <a-form-model-item>
          <a-button
            type="primary"
            html-type="submit">搜索
          </a-button>
        </a-form-model-item>
      </a-form-model>
</template>
<script>
    export default{
        props:['data'],
       data(){
        return {
            searchForm:{
                keyWord:'',
                category:''
            },
        }
       },
        methods:{
            handleSubmit(){
                this.$emit('handleSubmit',this.searchForm);
            },
            handleChange(value){
                this.searchForm.category=value;
            }
        }
    }
</script>
<style  scoped>
    .search-box{
        margin:10px 30px;
    }
</style>