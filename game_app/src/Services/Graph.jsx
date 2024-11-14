class Graph{
    #vertices = new Set();
    #adjacencyList = new Map()

    get vertices(){
        return Array.from(this.#vertices);
    }

    get adjacentList(){
        const List = {}
        this.#adjacencyList.forEach((val, key)=>{
            List[key] = Array.from(val);
        })

        return List
    }

    addVertex(vertex = null){
        if(vertex != null && vertex!= undefined){
            this.#vertices.add(vertex)
            this.#adjacencyList.set(vertex, new Set());
            //We used a SET so it saves us time to check if the vertex adjacency exists or not


        }
    }

    addEdge(vertex1 = null, vertex2 = null, directed = true){
        if(
            vertex1 != null && vertex2!= null && vertex1 != vertex2
        ){
            if(!this.#adjacencyList.has(vertex1)){
                this.addVertex(vertex1)
            }
            if(!this.#adjacencyList.has(vertex2)){
                this.addVertex(vertex2)
            }

            this.#adjacencyList.get(vertex1).add(vertex2)

            if(directed){
                this.#adjacencyList.get(vertex2).add(vertex1)

            }
        }
    }
}


const graph = new Graph();

const vertices = ['A', 'B', 'C', 'D']

graph.addEdge('A', 'B')
graph.addEdge('A', 'C')
graph.addEdge('A', 'D')
graph.addEdge('B', 'D')
graph.addEdge('C', 'A')
graph.addEdge('B', 'C')
graph.addEdge('C', 'D')

console.log(graph.vertices, graph.adjacentList)