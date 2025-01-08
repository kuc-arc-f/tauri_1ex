<svelte:head>
<title>Show</title>
<meta name="description" content="About this app" />
</svelte:head>

<script lang="ts">
import { onMount } from 'svelte';
import TaskIndex from "../../task_items/CrudIndex";
//import IndexRow from "./IndexRow.svelte";
import LibConfig from '$lib/LibConfig';
import LibAuth from '$lib/LibAuth';
import LibCommon from '$lib/LibCommon';
//import HttpCommon from '$lib/HttpCommon';
import ApiUtil from '$lib/ApiUtil';
import CrudShow from '../CrudShow';
import Export from '../Export';
//
/** @type {import('./$types').PageData} */
export let data: any, item: any= {}, post_id = 0, content = "", id = 0;
let items: any[] = [], itemsNone = [], itemsWorking = [], itemsComplete = [];
let project = {};

/**
*
* @param
*
* @return
*/
const startProc= async function() {
    const searchParams = new URLSearchParams(window.location.search);
    const idValue = searchParams.get('id') || "";
    console.log("onMount=", idValue);
    id = Number(idValue);
    console.log("startProc=", id);
    const target = await TaskIndex.getList(id);
    items = target.data;
    //console.log(items);
    let postItem: any = {
      "id": id
    }; 
    //const json = await HttpCommon.server_post(postItem, "/project/get");
    const res = await ApiUtil.post('/project/get', postItem );
    project = res.data.data;
    console.log(project)
    setStateArray();
}

onMount(async () => {
  try {
    startProc();
  } catch (e) {
    console.log(e);
  }
});
//
const setStateArray = async function() {
    itemsNone = items.filter(item => (item.status === '1') );
//    console.log(itemsNone);
    itemsWorking = items.filter(item => (item.status === '2') );
//    console.log(itemsWorking);
    itemsComplete = items.filter(item => (item.status === '3') );
//    console.log(itemsComplete);
}
/**
*
* @param
*
* @return
*/
const exportExcel = async function () {
//console.log("#exportExcel");
  try{
      const data = {
          itemsNone: itemsNone,
          itemsWorking: itemsWorking,
          itemsComplete: itemsComplete,
      };
//console.log(data);
      await Export.exportXlsx(data);
  } catch (e) {
      console.error(e);
      throw new Error('Error , exportExcel');
  }
}
</script>

<!-- CSS -->
<style>
</style>

<!-- MarkUp -->
<div class="container my-2">
    <div class="row">
        <div class="col-md-6">
            <a href={`/task_project`} class="btn btn-outline-primary">Back
            </a>
        </div>
        <div class="col-md-6 text-end">
        </div>
    </div>
    <hr class="my-1" />
    <h1>Export: {project.name}</h1>
    ID: {id}
    <hr class="my-1" />
    <div class="text-center">
        <button class="btn btn-primary" on:click={exportExcel}>Export</button>
    </div>    
    <hr class="my-1" />

</div>

<!--
-->
