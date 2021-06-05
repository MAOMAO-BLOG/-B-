const RoleToRoute={
    coustomer:[
        {name:'product'},
        {name:'productList'},
        {name:'addProduct'},
        {name:'editProduct'}
    ],
    admin:[
        {name:'product'},
        {name:'productList'},
        {name:'addProduct'},
        {name:'category'},
        {name:'editProduct'}
    ]
}
export default function getMenuRoutes(routes,role){
    const AllowRoutes=RoleToRoute[role].map(t=>t.name);
    const resultRoutes= routes.filter(t=>{
        const obj =t;
        if(AllowRoutes.indexOf(t.name)!==-1){
            const {children}=obj;
            obj.children=children.filter((i)=>AllowRoutes.indexOf(i.name)!==-1);
           return true;
        }
        return false;
    })
    return resultRoutes;
}