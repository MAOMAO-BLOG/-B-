<template>
    <div>
        <a-steps :current="current" class="steps">
            <a-step v-for="item in steps" :key="item.title" :title="item.title" />
          </a-steps>
          <div class="steps-content">
            <BasicInfo v-if='current===0' @next='next' :form='form'/>
           <SaleInfo v-else-if='current===1' :form='form'  @prev='prev' @next='next'/>
          </div>
    </div>
</template>
<script>
import BasicInfo from '@/components/basicInfo.vue';
import SaleInfo from '@/components/saleInfo.vue';
export default{
    components:{
        BasicInfo,
        SaleInfo
    },
   
data() {
    return {
      current: 0,
      form:{
        price:0,
        price_off:0,
        inventory:0,
        unit:'',
        images:[],
        title:'',
        desc:'',
        c_item:[],
        category:'',
        tags:[]
      },
      steps: [
        {
          title: '填写商品基本信息',
        },
        {
          title: '填写商品销售信息',
        },
      ],
    };
  },
  created(){
        const id=this.$route.params.id;
        if(id){
            //编辑页面，现根据id获得产品的详情
            this.$api.getDetail(id).then(resp=>{
                this.form=resp;
                console.log(this.form);
            })
        }else{
            //添加商品界面
        }
    },
  methods: {
    next(form) {
        console.log(form);
        this.form={
          ...this.form,
          form
      }
      if(this.current===1){
          if(this.$route.params.id){
            this.$api.edit(this.form).then(resp=>{
                console.log(resp);
                this.$message.success('修改成功');
                this.$router.push({name:'productList'});
            })
          }else{
            this.$api.addProduct(this.form).then(resp=>{
                console.log(resp);
            this.$message.success('添加成功');
            this.$router.push({name:'productList'});
            })
        }
       
      }else{
        this.current++;
      }
    },
    prev() {
      this.current--;
    },
  },
}
</script>
<style>
    .steps{
        margin:10px auto;
        padding:10px 145px;
    }
    .steps-content{
        margin:40px auto;
    }
</style>