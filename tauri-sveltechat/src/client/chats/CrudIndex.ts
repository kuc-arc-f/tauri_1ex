import LibConfig from '../../lib/LibConfig';
import HttpCommon from '../../lib/HttpCommon';
import LibPagenate from '../../lib/LibPagenate';
let API_BASE = import.meta.env.VITE_API_URL;
import ApiUtil from '../../lib/ApiUtil';

//
const CrudIndex = {
  /**
   *
   * @param page: page number
   * @param perPage: 1 page count
   *
   * @return
   */      
  getPageList : async function(itemsAll: any, page: number, perPage: number) : Promise<any>
  {
    try{
      let items: any = [];
//console.log("page=", page);
//console.log("offset=", offset);
      const pinfo = LibPagenate.getPageStart(page, perPage);
console.log(pinfo);
      items = itemsAll.slice(pinfo.start, pinfo.end);
      return items;
    } catch (e) {
      console.error(e);
    }
  },  
  /**
  *
  * @param
  *
  * @return
  */
  getList :async function (): Promise<any>
  {
    try{
      const postData = { key: 'example', value: 'data' };
      const res = await ApiUtil.post('/api/chats/get_list', postData);
      console.log(res)
      return res.data;
    } catch (e) {
      console.error(e);
      throw new Error("Error, getList");
    } 
  }  ,  
  /**
  * startProc
  * @param
  *
  * @return
  */   
  startProc :async function (): Promise<void> 
  {
    try{
    } catch (e) {
      console.error(e);
    }    
  } 
}
//
//CrudIndex.startProc();

export default CrudIndex;
