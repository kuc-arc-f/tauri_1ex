<svelte:head>
<title>Show</title>
<meta name="description" content="About this app" />
</svelte:head>

<script lang="ts">
import { onMount } from 'svelte';
//import TaskIndex from "../../../task_items/CrudIndex";
//import IndexRow from "./IndexRow.svelte";
//import LibCommon from '$lib/LibCommon';
//import LibConfig from '$lib/LibConfig';
//import LibAuth from '$lib/LibAuth';
//import HttpCommon from '$lib/HttpCommon';
//import CrudShow from '../task_project/CrudShow';
import Gantt from './Gantt';
import ApiUtil from '$lib/ApiUtil';
//
/** @type {import('./$types').PageData} */
//export let data: any, item: any= {}, post_id = 0, content = "", id = "";
export let item: any= {}, post_id = 0, content = "", id = 0;
let items: any[] = [], projectCreatedAt = "";
let project = {};
//
//console.log(tadkString);
let ganttText = "";

onMount(async () => {
  try {
    console.log("onMount");
    const searchParams = new URLSearchParams(window.location.search);
    const idValue = searchParams.get('id') || "";
    console.log("onMount=", idValue);
    id = Number(idValue);
    let postItem: any = {
      "id": id
    };
    const res = await ApiUtil.post('/project/get', postItem);
    const item = res.data.data;
    console.log(item);
    project = item;
    const taskItem = {projectId: id}
    const resTask = await ApiUtil.post('/tasks/get_list', taskItem);
    console.log(resTask.data.data)
    items = resTask.data.data;
    Gantt.drawChart(items);
  } catch (e) {
    console.log(e);
  }
});

</script>

<style>
</style>

<!-- MarkUp -->
<div class="container mx-auto px-4 py-4">
  <div class="container mx-auto px-4 py-4">
    <div class="row">
      <div class="col-md-6">
        <a href={`/task_project`} 
        class="btn btn-outline-blue">Back
        </a>
      </div>
      <div class="col-md-6 text-end">
      </div>
    </div>
    <hr class="my-2" />
    <div class="row">
      <div class="col-md-6">
        <h3 class="text-3xl font-bold">{project.name}</h3>
        ID: {project.id}
      </div>
      <div class="col-md-6 text-end">
        <a class="btn btn-primary mx-4" href={`/task_project/${id}`}>Grid</a>
      </div>
      <div class="chart_wrap ">
        <div id="chart"></div>
      </div>
  
    </div>
    <hr class="my-1" />
    

  </div>
</div>

<!--
-->
