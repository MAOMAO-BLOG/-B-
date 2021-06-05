<template>
    <a-form-model class="form"
    ref="ruleForm"
    :model="myForm"
    :label-col="{span:4}" :wrapper-col="{span:14}"
  >
    <a-form-model-item label="标题" required prop="title">
      <a-input
        v-model="myForm.title"
      />
    </a-form-model-item>
    <a-form-model-item label="商品描述" prop="desc">
        <a-input
        v-model="myForm.desc"
      />
    </a-form-model-item>
    <a-form-model-item label="商品类目" required prop="category">
        <a-select v-model='myForm.category'   @change="handleChange" placeholder="请输入商品类目">
            <a-select-option v-for='c in categoryList' :key='c.id' :value="c.id">
              {{c.name}}
            </a-select-option>
          </a-select>
          <a-select v-model='myForm.c_item'  placeholder="请选择子类目">
            <a-select-option v-for='c in categoryItems' :key='c' :value="c">
              {{c}}
            </a-select-option>
          </a-select>
    </a-form-model-item>
    <a-form-model-item label="商品标签" required prop="tags">
        <a-select mode='tags' v-model='myForm.tags' placeholder='请选择商品标签' :default-value='["包邮,最晚次日达"]'>
            <a-select-option value='包邮,最晚次日达'>
                包邮,最晚次日达
            </a-select-option>
          </a-select>
    </a-form-model-item>
    <a-form-model-item class='btn'>
      <a-button  type="primary" @click="onSubmit">
        下一步
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
    export default{
        props:['form'],
        data(){
            return {
                categoryList:[],
                categoryItems:[],
                myForm:{}
            }
        },
        created(){
            this.$api.category().then(resp=>{
                this.categoryList=resp.data;
            })
            this.myForm=this.form;
            console.log(this.myForm);
            console.log(this.form);
        },
        methods:{
            onSubmit(){
                this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    alert('submit!');
                    this.$emit('next',this.myForm);
                    return true;
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
            },
            handleChange(category){
                for(let i=0;i<this.categoryList.length;i++){
                    if(this.categoryList[i].id===category){
                        this.categoryItems=this.categoryList[i].c_items;
                    }
                }
            }
        }
}
</script>
<style>
    .btn{
        padding: 0 234px;
        text-align: center;
    }
</style>