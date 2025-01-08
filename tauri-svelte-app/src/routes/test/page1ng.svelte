<svelte:head>
	<title>Crud</title>
	<meta name="description" content="About this app" />
</svelte:head>

<script lang="ts">
import { onMount } from 'svelte';
//import { onMount, afterUpdate } from 'svelte';
import mermaid from "mermaid";

export let data: any;

const flowChartDefinition = `
    graph LR
    A[Start] --> B{Is it open?}
    B -- Yes --> C[Go on]
    B -- No --> D[End]
    C --> E(Get data)
    E --> F>Or else]
    F --> G((Subprocess)]
    G --> C
  `;

  export let definition = flowChartDefinition;
  export let elementId = 'mermaid-diagram';

  onMount(() => {
    mermaid.initialize({ startOnLoad: false });
    renderMermaid();
  });

  //afterUpdate(() => {
  //  renderMermaid();
  //});

  function renderMermaid() {
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = definition;
      //mermaid.render('mermaidChart', definition, (svgCode) => {
      mermaid.render(elementId, definition, (svgCode) => {
        element.innerHTML = svgCode;
      });
    }
  }
</script>

<div class="container my-2">
  <div class="row">
      <div class="col-md-6"><h1>Test!</h1></div>
  </div>
  <hr class="my-1" />
  <div id={elementId}>
    {@html definition}
  </div>

</div>

<!-- 
let container;
class="mermaid"
const sampleChart = `

`;
mermaid.initialize({
  startOnLoad: false,
  theme: "default",
});

console.log(sampleChart);
container = document.getElementById("mermaidChart") as HTMLElement;
if (container) {
  mermaid.render(
    'mermaidChart',
    sampleChart,
    (svgCode) => {
      container.innerHTML = svgCode;
    }
  );
}

-->