import list from '../rootAllList'

export const filterlist =(ids)=>{
    let result = [];
    list.map(item=>{
        if(!item.children){
            if(ids.indexOf(item.id)!==-1){
                result.push(item)
            }
        }else{
            let tmp = [];
            let state = false;
            item.children.map(item=>{
                if(ids.indexOf(item.id)!==-1){
                    tmp.push(item)
                    state = true
                }
            })
            if(state){
                item.children = tmp;
                // console.log(item)
                result = result.concat(item)
            }else{
                filterlist(ids)
            }
        }
    })
    console.log(result)
}