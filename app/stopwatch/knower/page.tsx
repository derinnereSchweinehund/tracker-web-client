"use client";

import p5 from "p5";
import React, { useState } from "react";
import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic'
import { P5WrapperClassName, ReactP5Wrapper } from "@p5-wrapper/react";


// Figure out how wrappers work
const DynamicComponentWithNoSSR = dynamic(
  () => import("@p5-wrapper/react").then((mod) => mod.ReactP5Wrapper),
  { ssr: false }
)

// ASSUMPTIONS
//  size of canvas is divisible by w, size of canvas/w is odd and height is at least half of width
// -1 is wall, 0 is empty, 1 is sand

class Grid {
    width: number;
    height: number;
    grid: Array<Array<number>>;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.grid = new Array(width);
        for (let i = 0; i<width; i++) {
            this.grid[i] = new Array(height).fill(0);
        }
    }

    clear(p: p5) {
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                p.stroke(255);
                p.fill(this.grid[i][j] * 255)
                let x = i * w;
                let y = j * w;
                p.square(x, y, w);
            }
        }

        for (let k = 0; k < ~~(this.width/2); k++) { // ASSUMES SQUARE OR CERTAIN RECT PROPS
            for (let l = 0; l < 2; l++) {
                p.stroke(30, 30, 30);
                this.grid[k][k+l] = -1;
                p.fill('orange')
                let x = k * w;
                let y = (k+l) * w;
                p.square(x, y, w);
            }
        }
        for (let k = ~~(this.width/2)+1; k < this.width; k++) { // ASSUMES SQUARE OR CERTAIN RECT PROPS
            for (let l = 0; l < 2; l++) {
                p.stroke(30, 30, 30);
                this.grid[k][this.width-k-l] = -1;
                p.fill('orange')
                let x = k * w;
                let y = (this.width-k-l) * w;
                p.square(x, y, w);
            }
        }
    }
    refill() {
        for (let i = 0; i < ~~(this.width/2); i++){
            for (let j = 0; j < i; j++) {
                this.grid[i][j] = 1
            }
        }
        for (let i = ~~(this.width/2); i < this.width; i++){
            for (let j = 0; j < i; j++) {
                this.grid[i][this.width-i-j] = 1
            }
        }
    }

    set(x:number, y:number, color:number) {
        if (x < this.width && y < this.height) {
            this.grid[x][y] = color;
        }
    }

    isEmpty(x:number, y:number) {
        if (x < 0 || x > this.width - 1 || y < 0 || y > this.height-1) {
            return false
        }
        return this.grid[x][y] == 0;
    }

    swap(a: number, b:number) {
        const temp = this.grid[a]
        this.grid[a] = this.grid[b];
        this.grid[b] = temp;
    }

    updatePixel(x: number, y: number) {
        if (this.isEmpty(x,y)) {
            //this.swap(i,below)
        }
    }
    update() {
        for (let i = this.grid.length - this.width - 1; i>0; i--) {
            //this.updatePixel(i);
        }
    }

    isSand(x: number, y: number) {
        return !(this.grid[x][y] == -1 || this.isEmpty(x,y));
    }
}

let grid: Grid;
let w = 10;
let cols: number, rows: number;

function sketch(p: p5) {
    p.frameRate(60)
    // p is a reference to the p5 instance this sketch is attached to
    p.setup = function() {
        p.createCanvas(410, 820);
        cols = p.width / w;
        rows = p.height / w;
        grid = new Grid(cols, rows);
        grid.refill();

    }


    p.draw = function() {
        //p.onLeftClick = (x, y) => {
        //}
        let bias = this.random() >= 0.5
        grid.clear(p);
        let count=0

        let nextGrid = new Grid(cols, rows);
        if (bias) {
            for (let i = grid.width-1; i > 0; i--) {
                for (let j = 0; j < grid.height; j++) {
                    if (grid.isSand(i, j)) {
                        count+=1
                        if (j < grid.height - 1 && grid.isEmpty(i, j+1)) {
                            nextGrid.set(i, j, 0);
                            nextGrid.set(i, j+1, 1);
                        } else if ((grid.isEmpty(i-1, j+1) == grid.isEmpty(i+1, j+1)) && grid.isEmpty(i-1, j+1) && (grid.isEmpty(i-1, j) == grid.isEmpty(i+1, j)) && grid.isEmpty(i-1, j) && nextGrid.isEmpty(i-1, j+1) && nextGrid.isEmpty(i+1, j+1)) {
                            if (this.random() >= 0.5) {
                                nextGrid.set(i, j, 0);
                                nextGrid.set(i-1, j+1, 1);
                            } else {
                                nextGrid.set(i, j, 0);
                                nextGrid.set(i+1, j+1, 1);
                            }
                        } else if (grid.isEmpty(i-1, j+1) && grid.isEmpty(i-1, j) && nextGrid.isEmpty(i-1, j+1)) {
                            nextGrid.set(i, j, 0);
                            nextGrid.set(i-1, j+1, 1); //what if interference from SIDE thing not DIRECT side thing
                        } else if (grid.isEmpty(i+1, j+1) && grid.isEmpty(i+1, j) && nextGrid.isEmpty(i+1, j+1)) {
                            nextGrid.set(i, j, 0);
                            nextGrid.set(i+1, j+1, 1);
                        } else {
                            nextGrid.set(i, j, grid.grid[i][j]);
                        }
                    }
                }
            }
        } else {
            for (let i = 0; i < grid.width; i++) {
                for (let j = 0; j < grid.height; j++) {
                    if (grid.isSand(i, j)) {
                        count+=1
                        if (j < grid.height - 1 && grid.isEmpty(i, j+1)) {
                            nextGrid.set(i, j, 0);
                            nextGrid.set(i, j+1, 1);
                        } else if ((grid.isEmpty(i-1, j+1) == grid.isEmpty(i+1, j+1)) && grid.isEmpty(i-1, j+1) && (grid.isEmpty(i-1, j) == grid.isEmpty(i+1, j)) && grid.isEmpty(i-1, j) && nextGrid.isEmpty(i-1, j+1) && nextGrid.isEmpty(i+1, j+1)) {
                            if (this.random() >= 0.5) {
                                nextGrid.set(i, j, 0);
                                nextGrid.set(i-1, j+1, 1);
                            } else {
                                nextGrid.set(i, j, 0);
                                nextGrid.set(i+1, j+1, 1);
                            }
                        } else if (grid.isEmpty(i-1, j+1) && grid.isEmpty(i-1, j) && nextGrid.isEmpty(i-1, j+1)) {
                            nextGrid.set(i, j, 0);
                            nextGrid.set(i-1, j+1, 1); //what if interference from SIDE thing not DIRECT side thing
                        } else if (grid.isEmpty(i+1, j+1) && grid.isEmpty(i+1, j) && nextGrid.isEmpty(i+1, j+1)) {
                            nextGrid.set(i, j, 0);
                            nextGrid.set(i+1, j+1, 1);
                        } else {
                            nextGrid.set(i, j, grid.grid[i][j]);
                        }
                    }
                }
            }
        }
        grid = nextGrid;
        console.log(count)
    }
    p.mouseDragged = function () {
        if (p.mouseX && p.mouseY)
        grid.set(~~(p.mouseX/w), ~~(p.mouseY/w), 1);
    }

}

export default function hourglass() {
    // create a reference to the container in which the p5 instance should place the canvas
    //const p5ContainerRef = useRef();

    //useEffect(() => {
        // On component creation, instantiate a p5 object with the sketch and container reference
        //const p5Instance = new p5(sketch, p5ContainerRef.current);

        // On component destruction, delete the p5 instance
        //return () => {
            //p5Instance.remove();
        //}
    //}, []);


    return (
        <main>
        <button type="button" className="cursor-cell">Hi</button>
        {/*<ReactP5Wrapper sketch={sketch} />*/}
        <DynamicComponentWithNoSSR className="cursor-cell" sketch={sketch} fallback={<div>Loading</div>}></DynamicComponentWithNoSSR>
        </main>
    );
}
