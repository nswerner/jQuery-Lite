const DOMNodeCollection = require('./dom_node_collection.js');
// debugger
const cbQueue = [];

// window.state = false;

// function setState() {
//   window.state = true;
//   runCBs();  
// }

// function runCBs() {
//     if (window.state) {  
//         while (cbQueue.length > 0) {
//             cbQueue.shift()();
//         }
//     }
// }

function runCBs() {
    while (cbQueue.length > 0) {
        cbQueue.shift()();
    }
}

let loaded = false; 

// window.addEventListener('DOMContentLoaded', runCBs());

document.addEventListener('DOMContentLoaded', () => {
    // debugger
    cbQueue.forEach( fx => fx() );
});

// jquery dom ready callback
// $(() => {
//     alert('something');
// });


function $1() {
    const args = Array.from(arguments);
    for (let i =0; i < args.length; i++) {
        let query = args[i];
        if (query instanceof Function) {
            cbQueue.push(query);
        } else if (query instanceof HTMLElement) {
            return new DOMNodeCollection([query]);
        } else {
            const nodeList = document.querySelectorAll(query);
            const nodeArray = Array.from(nodeList);
            return new DOMNodeCollection(nodeArray);
        }
    }
}

$1.extend = function(...objs) {
    let resultObj = {};
    objs.forEach(obj => {
        Object.keys(obj).forEach(key => {
            resultObj[key] = obj[key];
        });
    });
    return resultObj;
};

$1.ajax = function(opts) {
    const defaultOptions = { method: "GET", url: window.location.href, 
        contentType: "application/json", data: {}, success: response => console.log(response), 
        error: response => console.log(response) };

    const options = $1.extend(defaultOptions, opts);

    const Http = new XMLHttpRequest();
    Http.onload = function() {
        options.success(JSON.parse(Http.response));
        
    };
    Http.onerror = function(options) {
        console.log('error');
        options.error(JSON.parse(Http.response));
    };
    Http.open(options.method, options.url);
    Http.send();
};

window.$1 = $1;


$1( () => {
   return () => alert('test');
}, () => {
    console.log('your cat!');
});


// window.addEventListener('load' && 'DomContentLoaded')
// window.onload = () => { catz }
