<svelte:head>
<title>Show</title>
<meta name="description" content="About this app" />
</svelte:head>

<script lang="ts">
import { z } from "zod";
import { EditId } from './stores';
import ApiUtil from '../../lib/ApiUtil';
import { todoSchema } from './create/types'

//import LibConfig from '$lib/LibConfig';
//import LibAuth from '$lib/LibAuth';
import LibCommon from '$lib/LibCommon';
//import CrudEdit from './CrudEdit';
//
let id = 0, item: any ={}, createdAt = "", content="", messageModal = "";
let p_date = "", errors = {};
let IsOpen = false;

/**
*
* @param
*
* @return
*/
const getItem = async function (id: number) {
    try{
        if(id <= 0) { return false; };
        let postItem: any = {
            "id": id
        }; 
        const res = await ApiUtil.post('/plan/get', postItem );
        console.log(res.data.data)
        item = res.data.data;
        createdAt = LibCommon.converDateString(item.createdAt);
        //console.log(createdAt);
        p_date = LibCommon.converDateString(item.p_date);
        IsOpen = true;
    } catch (error) {
        console.error(error);
    }    
}
//store
EditId.subscribe(value => {
    id = value;
console.log("Modal.editModal.id=", value);
    getItem(id);
});
/**
 *
 * @param
 *
 * @return
 */ 
const savePost = async function () {
	try {
    errors = {};
		const content = document.querySelector<HTMLInputElement>('#content');
		const item = {
			content : content?.value,
			id: Number(id),
		}
    const validatedTodo = todoSchema.parse(item);
    //console.log(item);
    const res = await ApiUtil.post('/plan/update', item );
    console.log(res)
    if(res.ret === 200){
      IsOpen = false;
      location.reload();
      console.log("Success, save todo");
    }else{
			throw new Error('Error , update');
    }
	} catch (error) {
		console.error(error);
		if (error instanceof z.ZodError) {
			errors = error.errors.reduce((acc, curr) => {
				const field = curr.path[0];
				acc[field] = curr.message;
				return acc;
			}, {});
		}
		console.error(errors);
	} 
}
//
const okFunction = function () {
    window.location.href = '/plan';
}
/**
 * deleteItem
 * @param
 *
 * @return
 */ 
 async function deleteItem(){
	try {
        const item = {
            id: Number(id),
        }
//console.log(item);
const res = await ApiUtil.post('/plan/delete', item );
    console.log(res)
    if(res.ret === 200){
      IsOpen = false;
      location.reload();
    }else{
			throw new Error('Error , delete');
    }
	} catch (error) {
	    console.error(error);
	}
}

function closeButton(){
  IsOpen = false;
}
</script>

<!-- CSS -->
<style>
#open_post_edit { display: none ;}
</style>

<!-- MarkUp -->
{#if IsOpen}
<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
  <div class="bg-white rounded-lg p-6 w-full max-w-md">
    <div class="modal-header">
      <h3 class="modal-title" id="fullEditModalLabel">{p_date}</h3>
      <button type="button" ></button>
    </div>
    <div class="modal-body">
      <p>ID: {item.id}</p>
      <hr class="my-1" />
      <div class="col-md-6 form-group">
        <label for="content">content</label>
        <textarea id="content" name="content" required class="input_textarea"
        rows="10" placeholder="markdown input, please">{item.content}</textarea>
        {#if errors.content}
        <p class="text-red-500 text-sm mt-1">{errors.content}</p>
        {/if}
      </div>
      <button on:click={savePost} class="btn btn-primary my-1">Save</button>
      <hr class="my-1" />  
      <button on:click={deleteItem} class="btn-outline-red my-2">Delete</button>       
    </div>
    <div class="modal-footer">
      <button type="button" class="btn-outline-blue"
      on:click={closeButton}>Close</button>
    </div>

  </div>
</div>
{/if}

<!--
-->
