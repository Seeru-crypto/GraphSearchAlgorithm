const connections : string[][] = (await Deno.readTextFile("./data.txt")).split("\n").map(str => str.split(" "))
// deno run --allow-read logic.ts
// https://www.youtube.com/watch?v=cWNEl4HE2OE&list=WL&index=9
const airports = "PHX BKK OKC JFK LAX MEX EZE HEL LOS LAP LIM".split(" ")

const adjecencyList = new Map<string, string[]>();

function addNode(airport : string){
    adjecencyList.set(airport, []);
}

function addEdge(origin : string, destination : string) {
    const first = adjecencyList.get(origin);
    const second = adjecencyList.get(destination);

    if (first) first.push(destination)
    if (second) second.push(origin)
}

airports.forEach(addNode);
connections.forEach(route => {
    addEdge(route[0], route[1])
})

console.log({adjecencyList});


function BreadthFirstSearch(start : string){
    const queue = [start]
    const visited = new Set();

    while (queue.length > 0){
        const airport = queue.shift();
        if (airport === undefined) return

        const destinations = adjecencyList.get(airport)
        if (destinations === undefined) return

        for (const destination of destinations){
            queue.push(destination)
            if (destination === 'BKK') {
                console.log("found it")

            }
            if (!visited.has(destination)) {
                visited.add(destination)
                queue.push(destination)
            }
        }
    }
}

BreadthFirstSearch("PHX")