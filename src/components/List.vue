<template>
    <a-table :columns="columns" :data-source="data" :pagination="page" @change='changePage'>
      <div slot="operation" slot-scope='text,record'>
        <a-button @click='edit(record)'>编辑
        </a-button>
        <a-button @click='remove(record)'>删除
        </a-button>
      </div>
    </a-table>
  </template>
  <script>
  const columns = [
  {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
     ellipsis:true,
    },
    {
      title: '描述',
      dataIndex: 'desc',
      key: 'desc',
     ellipsis:true,

    },
    {
      title: '类目',
      dataIndex: 'categoryName',
      key: 'category',
      ellipsis: true,
    },
    {
      title: 'price',
      dataIndex: 'price',
      key: 'price ',
    },
    {
      title: '折扣价格',
      dataIndex: 'price_off',
      key: 'price_off',
    },
    {
      title: '标签',
      dataIndex: 'tags',
      key: ' tags',
    },
    {
      title: '限制购买数量',
      dataIndex: 'inventory',
      key: ' inventory',
    },
    {
      title: '上架状态',
      dataIndex: 'status',
      key: ' status',
      customRender:function(text,record){
          return record.status===1?'上架':'下架';
      }
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: ' operation',
      width:200,
      scopedSlots: { customRender: 'operation' },
    },

  ];
  
  export default {
    data() {
      return {
        columns,
      };
    },
    props:['data','page'],
    computed:{
        tableData(){
            console.log(this.data);
           return this.data.map(item=>(
                {
                ...item,
                key:item.id
                }))
        }
    },
    methods:{
        changePage(page){
            this.$emit('change',page);
        },
        edit(record){
            this.$emit('edit',record);
        },
        remove(record){
            this.$emit('remove',record);
        }
    }
  };
  </script>