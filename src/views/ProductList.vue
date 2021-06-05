<template>
    <div class="product-list">
      <SearchBox @handleSubmit='search' :data='categoryList'/>
      <a-button class='add-btn'>
        <router-link :to='{name:"addProduct"}'>添加商品</router-link>
      </a-button>
      <List :data='tableData' :page='page' @change='changPage' @edit='edit' @remove='remove'/>
    </div>
</template>
  <script>
    import SearchBox from '../components/SearchBox.vue';
    import List from '../components/List.vue';
    export default {
      data(){
        return {
          searchForm:{},
          tableData:[],
          categoryList:[],
          categoryObj:{},
          page:{
            current:1,
            pageSize:10,
            showSizeChanger:true,
            total:1
          }
        }
      },
      async created(){
        await this.$api.category().then(resp=>{
                console.log(resp.data);
                this.categoryList=resp.data;
                resp.data.forEach(item=>{
                  this.categoryObj[item.id]=item.name;
                })
                console.log(this.categoryObj);
            }).catch(error=>{
               this.$message.error(error);
            });
        this.getTableData();
      },
      components:{
        SearchBox,
        List
      },
      methods:{
        getTableData(){
            this.$api.productList({
            page:this.page.current,
            size:this.page.pageSize,
            ...this.searchForm
          }).then(resp=>{
            console.log(resp);
            this.tableData=resp.data.map(item=>({
              ...item,
              categoryName:this.categoryObj[item.category]
            }))
            console.log(this.tableData);
            this.page.total=resp.total;
          }).catch(error=>{
            this.$message.error(error);
          })
        },
        search(searchForm){
          this.searchForm=searchForm;
          this.getTableData();
        },
        changPage(page){
          this.page=page;
          this.getTableData();
        },
        edit(record){
            this.$router.push({name:'editProduct',params:{id:record.id}});
        },
        remove(record){
          this.$confirm({
            title:'确认删除',
            content:()=><div style='color:red'>确认删除该商品吗？</div>,
            onOk:()=>{
              this.$api.removeProduct({id:record.id}).then(resp=>{
                console.log(resp);
                this.getTableData();
              })
            },
            onCancel:()=>{
              console.log('cancel');
            },
            class:'confirm-box',
          })
        }
      }
    }
  </script>
  <style lang='less'>
    .product-list{
      position:relative;
    }
    .add-btn{
      position: absolute;
      right:10px;
      top:4px;
    }

  </style>