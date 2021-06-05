<template>
    <a-form-model 
    ref="ruleForm"
    :model="myForm"
    :label-col="{span:4}" :wrapper-col="{span:14}"
  >
    <a-form-model-item label="销售价格" required prop="price">
      <a-input
        v-model="myForm.price"
      />
    </a-form-model-item>
    <a-form-model-item label="销售折扣格" prop="price_off">
        <a-input
        v-model="myForm.price_off"
      />
    </a-form-model-item>
    <a-form-model-item label="商品库存" required prop="inventory">
        <a-input
        v-model="myForm.inventory"
      />
    </a-form-model-item>
    <a-form-model-item label="计量单位" required prop="unit">
        <a-input
        v-model="myForm.unit"
      />
    </a-form-model-item>
    <a-form-model-item label="商品相册" required prop="images">
        <a-upload
      :action="'https://mallapi.duyiedu.com/upload/images?appkey='+$store.state.user.appkey"
      list-type="picture-card"
      :file-list="fileList"
      @preview="handlePreview"
      @change="handleChange"
      name='avatar'
    >
      <div v-if="fileList.length<8">
        <a-icon :type="loading?'loading':'plus'"/>
        <div class="ant-upload-text">
          Upload
        </div>
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
    </a-form-model-item>
    <a-form-model-item class='btn' :wrapperCol="{span:24}">
      <a-button  type="default" @click="prev">
        上一步
      </a-button>
      <a-button  type="primary" @click="next">
        提交
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
    function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
    export default{
        props:['form'],
        data(){
            return{
                previewVisible: false,
                previewImage: '',
                fileList: [],
                loading:false,
                myForm:{}
            }
        },
        created(){
            this.myForm=this.form;
            console.log(this.myForm);
            if(this.myForm.images.length>0){
                this.fileList=this.myForm.images.map((item,index)=>{
                    return{
                        uid: index,
                        name: `image${index}.png`,
                        status: 'done',
                        url:item,
                    };
                });
            }
        },
        methods:{
            prev(){
                this.$emit('prev');
            },
            next(){
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
            handleCancel() {
                this.previewVisible = false;
            },
            async handlePreview(file) {
                if (!file.url && !file.preview) {
                    file.preview = await getBase64(file.originFileObj);
                }
                this.previewImage = file.url || file.preview;
                this.previewVisible = true;
            },
            handleChange({ file,fileList }) {
                console.log('====',file.status);
                console.log('====',file.response);
                console.log('****',fileList);
                if(file.status==='done'){
                    this.myForm.images.push(file.response.data.url);
                }else if(file.status==='removed'){
                    const url=file.response.data.url;
                    this.myForm.images.filter(item=>item!==url);
                }
                console.log(this.myForm.images);
                this.fileList = fileList;
                },
        }
    }
</script>