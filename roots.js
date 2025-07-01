

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");

canvas.width = canvas.clientWidth * window.devicePixelRatio;
canvas.height = canvas.clientHeight * window.devicePixelRatio;

const gl = canvas.getContext("webgl2", {antialias: true});

gl.getExtension('OES_element_index_uint');


const N = 50;
const M = 50;

let r = 0;
const f = 4;



let tindex = 0;

const buffer = new Float32Array(2);


const texture = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, texture);

// allocate memory for the texture
gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RG32F,
    N,
    1,
    0,
    gl.RG,
    gl.FLOAT,
    null
)

/*


these are necessary. Before I added them, nothing was being rendered. Not sure why, chatgpt is suggesting that the shader
did not 'consider the texture to be complete' and so the texture() method was returning vec4(0.0) everytime.

*/
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);




let shifted = false;
let lastx = null;
let lasty = null;
let rotx = 0;
let roty = 0;



function handleMouseMove(e) {


    if (lastx) {

        rotx += e.clientX - lastx;
        roty += e.clientY - lasty;

    }
    lastx = e.clientX;
    lasty = e.clientY;

    return;

}

function handleMouseUp(e) {

    lastx = null;
    lasty = null;

    canvas.removeEventListener("mousemove", handleMouseMove);

}

canvas.addEventListener("mousedown", () => {

    canvas.addEventListener("mousemove", handleMouseMove);
});
canvas.addEventListener("mouseup", handleMouseUp);
canvas.addEventListener("mouseleave", handleMouseUp);






const NUM_VERTICES = N * M;
const NUM_EDGES = (N-1)*M + N *(M-1)+(N-1)*(M-1);

const vertices = new Float32Array(2 * NUM_VERTICES); // each vertex has 2 floats
const edges = new Uint32Array(NUM_EDGES * 2); // each edge has two indices





let index;

for (let n = 0; n < N; n++) {
    for (let m = 0; m < M; m++) {
        index = n * M + m;
        vertices[2 * index] = n;
        vertices[2 * index + 1] = m; 
    }
}

index = 0;
for (let n = 0; n < N; n++) {

    // do the horizontal edges
    for (let m = 0; m < M; m++) {

        if (n < N-1) {
            edges[2 * index] = n * M + m;
            edges[2 * index + 1] = (n+1) * M + m;
            index++;
        }

        if (m < M - 1) {
            edges[2 * index] = n * M + m;
            edges[2 * index + 1] = n * M + (m+1);
            index++;
        }

        if (n < N - 1 && m < M - 1) {
            edges[2 * index] = n * M + m;
            edges[2 * index + 1] = (n + 1) * M + (m+1);
            index++;
        }


    }
}








const vao = gl.createVertexArray();
gl.bindVertexArray(vao);

const vbo = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vbo);

const ebo = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ebo);

gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, edges, gl.STATIC_DRAW);


gl.enableVertexAttribArray(0);
gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);



const vertex_source = `#version 300 es
precision highp float;

layout(location = 0) in vec2 position;

uniform float N;
uniform float M;

out float z;



uniform float rotx;
uniform float roty;


const float PI = 3.14159265359;


void main() {

    float scale = 2.0;

    float x = scale * (2.0 * (position.x / (N - 1.0)) - 1.0);
    z = scale * (2.0 * (position.y / (M - 1.0)) - 1.0);

    float y = (x * x - z * z - 1.0) * (x * x - z * z - 1.0) + (2.0 * x * z) * (2.0 * x * z) ;
    y *= 4.0;

    float B = rotx * 0.01;
    float A = roty * 0.01;

    float xtemp = cos(A) * x - sin(A) * y;
    float ytemp = sin(A) * x + cos(A) * y;

    x = xtemp;
    y = ytemp;


    xtemp = cos(B) * x - sin(B) * z;
    float ztemp = sin(B) * x + cos(B) * z;

    x = xtemp;
    z = ztemp;



    z += 4.0;



    gl_Position = vec4(x / z, y / z, 1.0 / z, 1.0);
        



    

}
`


const fragment_source = `#version 300 es
precision highp float;

in float z;


out vec4 outColor;

void main() {

    outColor = vec4(vec3(1.0 + atan(-z * 0.0)), 1.0);
}
`

const program = createProgram(gl, vertex_source, fragment_source);
gl.useProgram(program);

gl.uniform1f(gl.getUniformLocation(program, "N"), N);
gl.uniform1f(gl.getUniformLocation(program, "M"), M);


gl.clearColor(0.0, 0.0, 0.0, 1.0);

function render(time) {

    gl.clear(gl.COLOR_BUFFER_BIT, gl.DEPTH_BUFFER_BIT);



    gl.uniform1f(gl.getUniformLocation(program, "rotx"), rotx);
    gl.uniform1f(gl.getUniformLocation(program, "roty"), roty);

    gl.drawElements(gl.LINES, 2 * NUM_EDGES, gl.UNSIGNED_INT, 0);



    requestAnimationFrame(render);
}

requestAnimationFrame(render);

function createProgram(gl, vertexSource, fragmentSource) {

        
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexSource);
    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(vertexShader));
    }

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentSource);
    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(fragmentShader));
    }

    const program = gl.createProgram();

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    gl.linkProgram(program);

    return program;

}