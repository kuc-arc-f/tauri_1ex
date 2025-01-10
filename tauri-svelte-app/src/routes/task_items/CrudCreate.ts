import LibConfig from '../../lib/LibConfig';
import Crud from './Crud';
import HttpCommon from '../../lib/HttpCommon';
import LibAuth from '$lib/LibAuth';
import ApiUtil from '$lib/ApiUtil';

const CrudCreate = {

  /**
   *
   * @param key: any
   *
   * @return
   */
  addItem : async function(projectId: number, selected : number) : Promise<any>
  {
    try{
      let ret = false;
      let values = Crud.getInputValues();
      values.status = String(selected);
      values.projectId = projectId;
      values.userId = LibAuth.getUserId();
console.log(values);
      const res = await ApiUtil.post('/tasks/create', values);
      console.log(res.data);
      return res;
    } catch (e) {
      console.error("Error, addItem");
      console.error(e);
      throw new Error('Error , addItem');
    }
  },  
  /**
  * startProc
  * @param
  *
  * @return
  */   
  startProc :async function (): Promise<void> 
  {
    try{
      console.log("#startProc");
      //btn
    } catch (e) {
      console.error(e);
    }    
  } 
}
//
//CrudCreate.startProc();

export default CrudCreate;
