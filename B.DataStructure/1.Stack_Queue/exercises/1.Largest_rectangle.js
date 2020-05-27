function largestRectangle(arr) {
    const stack = [];
    let maxArea = 0;
    let i = 0;
    while (i < arr.length) {
        if (!stack.length || arr[i] >= arr[stack[stack.length - 1]]) {
            stack.push(i);
            i += 1;
        } else {
            const top = stack.pop();
            const area = arr[top] * (stack.length ? (i - stack[stack.length - 1] - 1) : i);
            console.log(`area: top - ${top}; stack[] - ${stack}; (i) - ${stack.length ? (i - stack[stack.length - 1] - 1) : i}; area - ${area}`);
            maxArea = maxArea > area ? maxArea : area;
        }
        console.log('stack:', stack, maxArea);
    }
    console.log('okokokokokokokok');
    while (stack.length) {
        const top = stack.pop();
        const area = arr[top] * (stack.length ? (i - stack[stack.length - 1] - 1) : i);
        maxArea = maxArea > area ? maxArea : area;        
    }

    console.log('max:', maxArea);
    console.log('stack:', stack);
}

console.log(largestRectangle([6, 2, 5, 4, 5, 1, 6]));


// function largestRectangleArea(height) {
//     if (height == null || height.length == 0) {
//         return 0;
//     }
 
//     var stack = [];
 
//     var max = 0;
//     var i = 0;
 
//     while (i < height.length) {
//         //push index to stack when the current height is larger than the previous one
//         if (stack.length == 0 || height[i] >= height[stack[stack.length - 1]]) {
//             stack.push(i);
//             i++;
//         } else {
//         //calculate max value when the current height is less than the previous one
//             var p = stack.pop();
//             var h = height[p];
//             var w = stack.length == 0 ? i : i - stack[stack.length - 1] - 1;
//             max = Math.max(h * w, max);
//         }
 
//     }
 
//     while (stack.length!=0) {
//         var p = stack.pop();
//         var h = height[p];
//         var w = stack.length == 0 ? i : i - stack[stack.length - 1] - 1;
//         max = Math.max(h * w, max);
//     }
 
//     return max;
// }
// console.log(largestRectangleArea([6, 2, 5, 4, 5, 1, 6]));