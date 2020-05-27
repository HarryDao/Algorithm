class HashMap {
    constructor(size = 53) {
        this.keyMap = new Array(size);
    }

    _hash(key) {
        let total = 0;
        let WEIRD_PRIME = 31;
        for (let i = 0; i < Math.min(key.length, 100); i++) {
            let chr = key[i];
            let value = chr.charCodeAt(0) - 96;
            total = (total * WEIRD_PRIME + value) % this.keyMap.length;
        }
        return total;
    }

    set(key, value) {
        const index = this._hash(key);
        if (!this.keyMap[index]) this.keyMap[index] = [];
        
        let replacedIndex = this.keyMap[index].length;
        for (let i = 0; i < this.keyMap[index].length; i++) {
            if (this.keyMap[index][i][0] === key) {
                replacedIndex = i
            }
        }
        
        this.keyMap[index][replacedIndex] = [key, value];
    }

    get(key) {
        const index = this._hash(key);
        if (this.keyMap[index]) {
            for (let item of this.keyMap[index]) {
                if (item[0] === key) {
                    return item[1];
                }
            }
        }
        return undefined;
    }

    keys() {
        const arr = [];
        for (let item of this.keyMap) {
            if (item) {
                arr.push(...item.map(([key]) => key));
            }
        }
        return arr;
    }

    values() {
        const arr = [];
        for (let item of this.keyMap) {
            if (item) {
                arr.push(...item.map(([key, value]) => value));
            }
        }
        return arr;
    }
}

const map = new HashMap(53);
map.set('haha', '#1');
//console.log(map.keyMap);
map.set('hoho', '#2');
//console.log(map.keyMap);
map.set('hihi', '#1');
//console.log(map.keyMap);
map.set('hoho', '#hoho2');
//console.log(map.keyMap);
console.log(map.get('hoho'));
console.log(map.keys());
console.log(map.values());