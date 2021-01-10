import { template } from "lodash";

interface Item {
    word: string;
    freq: number
}

function topKFrequent(words: string[], k: number): string[] {
    const mapped: {[word: string]: number} = {};

    words.forEach(word => {
        mapped[word] = mapped[word] ? mapped[word] + 1 : 1;
    });

    const array: Item[] = [];

    for (const word in mapped) {
        array.push({
            word,
            freq: mapped[word]
        });
    }

    return sort<Item>(
        array,
        (item1, item2) => {
            if (item1.freq === item2.freq) {
                return item1.word < item2.word;
            } else {
                return item1.freq > item2.freq;
            }
        }
    ).slice(0, k).map(item => item.word);
};

function sort<T>(
    data: T[],
    compare: (d1: T, d2: T) => boolean,
): T[] {
    if (data.length < 2) return data;
    
    const midIndex = Math.floor(data.length / 2);
    return merge2SortedArray<T>(
        sort<T>(data.slice(0, midIndex), compare), 
        sort<T>(data.slice(midIndex), compare),
        compare
    );
}

function merge2SortedArray<T>(arr1: T[], arr2: T[], compare: (d1: T, d2: T) => boolean): T[] {
    const result: T[] = [];
    let index1 = 0;
    let index2 = 0;

    function nextOn(isArr1: boolean) {
        let temp: T;
        if (isArr1) {
            temp = arr1[index1];
            index1 ++;
        } else {
            temp = arr2[index2];
            index2 ++;
        }
        result.push(temp);
    }

    while (index1 < arr1.length || index2 < arr2.length) {
        if (index1 >= arr1.length) {
            nextOn(false);
        } else if (index2 >= arr2.length) {
            nextOn(true);
        } else {
            nextOn(compare(arr1[index1], arr2[index2]));
        }

    }

    return result;
}

console.log(topKFrequent(["love", "i", "leetcode", "i", "love", "coding"], 2)); // i, love

console.log(topKFrequent(["the", "day", "is", "sunny", "the", "the", "the", "sunny", "is", "is"], 4));

// console.log(sort([5,2, 6, 1, 4, 2, 3, 8], a => a));
// interface HeapListItem<T> {
//     data: T;
//     priority: number;
// }

// class Heap<T> {
//     list: HeapListItem<T>[] = [];

//     constructor(private isMin: boolean = true) {}

//     isEmpty = () => !this.list.length;

//     compare(parentIndex:number, childIndex: number): boolean {
//         const { list, isMin } = this;
//         const parent = list[parentIndex];
//         const child = list[childIndex];

//         if (parent.priority === child.priority) {
//             return parent.data < child.data;
//         }

//         if (isMin) {
//             return parent.priority < child.priority;
//         } else {
//             return parent.priority >= child.priority;
//         }
//     }

//     swap = (i: number, j: number) => {
//         const temp = this.list[i];
//         this.list[i] = this.list[j];
//         this.list[j] = temp;
//     }

//     enqueue(data: T, priority: number) {
//         const { list } = this;
        
//         list.push({ data, priority });
//         let index = list.length - 1;

//         while (index > 0) {
//             let parentIndex = Math.floor((index - 1) / 2);

//             if (this.compare(parentIndex, index)) return;

//             this.swap(index, parentIndex);
//             index = parentIndex;
//         }

//         console.log('list:', this.list);
//     }

//     dequeue = (): T | null => {
//         if (!this.list.length) return null;

//         this.swap(0, this.list.length - 1);
//         const result = this.list.pop() as HeapListItem<T>;

//         if (!this.list.length) return result.data;

//         const { list } = this;
//         let index = 0;
        
//         while (index <= list.length - 1) {
//             let child1Index = index * 2 + 1;
//             let child2Index = index * 2 + 2;
//             let nextIndex: number;

//             if (child1Index > list.length - 1 && child2Index > list.length - 1) {
//                 break;
//             } else if (child2Index > this.list.length - 1) {
//                 nextIndex = child1Index;
//             } else if (child1Index > this.list.length - 1) {
//                 nextIndex = child2Index;
//             } else if (this.compare(child1Index, child2Index)) {
//                 nextIndex = child1Index;
//             } else {
//                 nextIndex = child2Index;
//             }

//             if (this.compare(index, nextIndex)) break;

//             this.swap(index, nextIndex);

//             index = nextIndex;
//         }

//         return result.data;
//     }
// }


// function topKFrequent(words: string[], k: number): string[] {
//     const mapped: {[word: string]: number} = {};

//     words.forEach(word => {
//         mapped[word] = mapped[word] ? mapped[word] + 1 : 1;
//     });

//     const heap = new Heap<string>(false);

//     const keys = Object.keys(mapped) as string[];
//     keys.forEach(key => {
//         heap.enqueue(key, mapped[key]);
//     });

//     const result: string[] = [];
//     while (result.length < k && !heap.isEmpty()) {
//         result.push(heap.dequeue() as string);
//     }

//     return result;
// };

// console.log(topKFrequent(["love", "i", "leetcode", "i", "love", "coding"], 2)); // i, love



// console.log(topKFrequent(["the", "day", "is", "sunny", "the", "the", "the", "sunny", "is", "is"], 4));
