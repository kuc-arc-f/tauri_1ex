import LibConfig from '$lib/LibConfig';
import LibAuth from '$lib/LibAuth';
import ApiUtil from '../../lib/ApiUtil';
import moment from 'moment'
//
const CrudIndex = {

  /**
  *
  * @param
  *
  * @return
  */
  getList :async function (target_month: any): Promise<any>
  {
    try{
      const dt = moment( target_month.format("YYYY-MM-DD") )
      const start = dt.startOf('month');
      const start_str = start.format("YYYY-MM-DD HH:mm:ss")
      const end = dt.add(1, 'month').startOf('month');
      const end_str = end.format("YYYY-MM-DD HH:mm:ss")
      const postItem = {
        "start": start_str,
        "end": end_str,
        "userId": LibAuth.getUserId(),
      }
console.log(postItem);
//return;
      const res = await ApiUtil.post('/plan/get_list', postItem );
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
      console.log("#startProc");
      //
      const button: any = document.querySelector('#status_complete');
      button.addEventListener('click', async () => {
        console.log("#status_complete");
      });      
    } catch (e) {
      console.error(e);
    }    
  } 
}
//
//CrudIndex.startProc();

export default CrudIndex;
