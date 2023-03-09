function compress(text) {
    // Création de la table de fréquence
    var frequency = {};
    for (var i = 0; i < text.length; i++) {
        var character = text.charAt(i);
        if (!frequency[character]) {
            frequency[character] = 0;
        }
        frequency[character]++;
    }

    // Création de l'arbre de Huffman à partir de la table de fréquence
    var queue = new PriorityQueue();
    for (var char in frequency) {
        queue.enqueue(char, frequency[char]);
    }
    while (queue.length > 1) {
        var left = queue.dequeue();
        var right = queue.dequeue();
        queue.enqueue(new TreeNode(left.value + right.value, left, right), left.priority + right.priority);
    }

    // Création du tableau de codage
    var codes = {};
    function buildCodes(node, code) {
        if (typeof node === "string") {
        codes[node] = code;
        return;
        }
        buildCodes(node.left, code + "0");
        buildCodes(node.right, code + "1");
    }
    buildCodes(queue.dequeue(), "");

    // Compression du texte en utilisant le tableau de codage
    var compressed = "";
    for (var i = 0; i < text.length; i++) {
        compressed += codes[text.charAt(i)];
    }

    return compressed;
}

// Classe pour représenter les nœuds de l'arbre de Huffman
class TreeNode {
    constructor(value, left, right) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

// Classe pour représenter la file de priorité utilisée pour construire l'arbre de Huffman
class PriorityQueue {
    constructor() {
        this.nodes = [];
        this.enqueue = function (value, priority) {
            this.nodes.push({ value: value, priority: priority });
            this.sort();
        };
        this.dequeue = function () {
            return this.nodes.shift();
        };
        this.sort = function () {
            this.nodes.sort(function (a, b) {
                return a.priority - b.priority;
            });
        };
        this.length = function () {
            return this.nodes.length;
        };
    }
}
