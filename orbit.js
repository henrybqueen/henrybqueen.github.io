

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas2");

canvas.width = canvas.clientWidth * window.devicePixelRatio;
canvas.height = canvas.clientHeight * window.devicePixelRatio;

const gl = canvas.getContext("webgl2", {antialias: true, depth: true});

gl.enable(gl.DEPTH_TEST);

gl.getExtension('OES_element_index_uint');


const N = 13;
const M = 13;

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

        float u = 2.0 * PI * (position.x / (N-1.0));
        float v = 1.0 * PI * (position.y / (M-1.0));

        vec3 p;

        p.x = cos(u) * sin(v);
        p.y = cos(v);
        p.z = sin(u) * sin(v);


        float theta = 0.005 * roty;
        float phi = 0.005 * rotx;

        // phi = azimuth (horizontal orbit) → rotate around Y axis
        mat3 R_azimuth = mat3(
            cos(phi), 0.0, sin(phi),
            0.0, 1.0, 0.0,
        -sin(phi), 0.0, cos(phi)
        );

        // theta = elevation (vertical orbit) → rotate around X axis
        mat3 R_elevation = mat3(
            1.0, 0.0, 0.0,
            0.0, cos(theta), -sin(theta),
            0.0, sin(theta),  cos(theta)
        );

        // Apply elevation *after* azimuth
        p = R_elevation * R_azimuth * p;



        p.z += 2.0;


        float x = p.x;
        float y = p.y;
        z = p.z;



        gl_Position = vec4(x / z, y / z, z / 100.0, 1.0);
        //gl_Position = vec4(x, y, z, z); // allows real perspective divide + depth
        //gl_Position = vec4(p.x, p.y, -p.z, 1.0);
       


            



        

    }
    `


const fragment_source = `#version 300 es
precision highp float;

in float z;


out vec4 outColor;

void main() {

    outColor = vec4(vec3(atan(0.3 * z)), 1.0);
    //outColor = vec4(vec3(gl_FragCoord.z), 1.0);

}
`

const program = createProgram(gl, vertex_source, fragment_source);
gl.useProgram(program);

gl.uniform1f(gl.getUniformLocation(program, "N"), N);
gl.uniform1f(gl.getUniformLocation(program, "M"), M);


gl.clearColor(1.0, 1.0, 1.0, 1.0);

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