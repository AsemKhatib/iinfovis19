
<!-- HTML Content -->
<template>
    <div class="bubble-root">
        <div class="canvas-container">
            <svg class="bubble-chart-canvas">
                <g class="canvas-group">
                </g>
            </svg>
        </div>
    </div>
</template>

<!-- Typescript content --> 
<script lang="ts">

import { Vue, Component, Prop } from "vue-property-decorator";
import * as d3 from "d3";
import dataService from "../../data.service";
import { v4 as uuid } from 'uuid';
import { HierarchyNode } from "d3";
import { hasProto } from "vue-class-component/lib/util";
import { test_food } from "../../data_helper";

@Component({
})
export default class BubbleChart extends Vue {

    canvas_container: HTMLElement | null = null;
    d3_canvas: HTMLElement | null = null;
    canvas_group: HTMLElement | null = null;

    data: {}[] = [];

    pack_layout: d3.PackLayout<any> | null = null;
    root_node: d3.HierarchyNode<any> | null = null;
    leaf: d3.Selection<any, any, any, any> | null = null;

    mounted() {
        this.$nextTick(function() {
            this.canvas_container = this.$el.querySelector('.canvas-container');
            this.d3_canvas = this.$el.querySelector('.bubble-chart-canvas');
            this.canvas_group = this.$el.querySelector('.canvas-group');
        });
    }

    setData(data: {}[]) {
        if ( data === undefined ) {
            this.data = [];
        } else {
            this.data = data;
        }
        

        if ( this.data.length == 0 ) {
            this.clearChart();
        } else {
            this.clearChart();
            this.setupChart();
        }
    }

    clearChart() {
        if ( this.canvas_group !== null ) {
            while ( this.canvas_group.firstChild ) { this.canvas_group.removeChild(this.canvas_group.firstChild); }
        } 
    }

    setupChart() {
        var test_data = {
            "name": "ROOT",
            "children": this.data
            };
    
        if ( this.d3_canvas !== null && this.canvas_container !== null ) {
            let width = (this.d3_canvas as HTMLObjectElement).getBoundingClientRect().width;
            let height = (this.d3_canvas as HTMLObjectElement).getBoundingClientRect().height;

            this.pack_layout = d3.pack().size([width, height])

            this.root_node = d3.hierarchy(test_data)
            this.root_node.sum(function(d) {
                return d.value;
            });

            let g = d3.select(this.d3_canvas).select('g');

            this.pack_layout(this.root_node);
            
            this.leaf = g.selectAll("g")
                .data(this.root_node.leaves())
                .join("g")
                .attr("transform", d => `translate(${d.x + 1},${d.y + 1})`);

            this.leaf.append("circle")
                .attr("id", function(d) { return "leaf-"+String(uuid()); })
                .attr("r", d => d.r)
                .attr("fill-opacity", 0.7)
                .attr("fill", "#ff0000")
                .attr("class", "blubble-chart-cirlce");

            this.leaf.append("text")
                .attr("clip-path", d => d.clipUid)
                .selectAll("tspan")
                .data(d => d.data.name.split(/(?=[A-Z][^A-Z])/g))
                .join("tspan")
                .attr('class', 'bubble')
                .attr("x", 0)
                .attr("y", (d, i, nodes) => `${i - nodes.length / 2 + 0.8}em`)
                .style('fill', 'white')
                .text(d => d);              
        }
    }

}
</script>

<!-- (S)CSS content -->
<style>
circle.lol {
  fill: indianred;
  opacity: 0.3;
  stroke: white;
}

svg.bubble-chart-canvas {
    width: 100%;
    height: 100%;
}

tspan.bubble {
        text-shadow:  1px  1px 1px black,
                  1px -1px 1px black,
                 -1px  1px 1px black,
                 -1px -1px 1px black;
}

.bubble-root {
    width: 100%;
    height: 100%;
}

.canvas-container {
    width: 100%;
    height: 100%;    
}
</style>