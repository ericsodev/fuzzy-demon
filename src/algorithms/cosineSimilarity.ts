export default function match(wordList: string[], input: string): string[] {
    const pairs: Pair[] = [];
    for (let word of wordList) {
        let dot = dotProduct(input, word);
        let m1 = magnitude(input);
        let m2 = magnitude(word);
        if (m1 === 0 || m2 === 0) continue;
        pairs.push({ word: word, cos: dot / (m1 * m2) });
    }
    return nSmallest(10, pairs);
}

type Pair = {
    word: string;
    cos: number;
};
function nSmallest(n: number, pairs: Pair[]): string[] {
    let nthSmallest = quickSelect(n, 0, pairs.length - 1, pairs);
    let words = [];
    console.log(nthSmallest.word);
    for (let pair of pairs) {
        if (pair.cos > nthSmallest.cos) {
            words.push(pair.word);
        }
    }
    return [...words, nthSmallest.word].splice(0, n);
}

function quickSelect(
    k: number,
    left: number,
    right: number,
    pairs: Pair[]
): Pair {
    if (left === right) return pairs[left];

    let pivotIdx = left + Math.floor(Math.random() % (right - left + 1));
    pivotIdx = partition(pairs, left, right, pivotIdx);
    if (k === pivotIdx) {
        return pairs[k];
    } else if (k < pivotIdx) {
        return quickSelect(k, left, pivotIdx - 1, pairs);
    } else {
        return quickSelect(k, pivotIdx + 1, right, pairs);
    }
}

function partition(
    pairs: Pair[],
    left: number,
    right: number,
    pivotIdx: number
) {
    let storeIdx = left;
    let pivotVal = pairs[pivotIdx].cos;
    [pairs[pivotIdx], pairs[right]] = [pairs[right], pairs[pivotIdx]];

    for (let i = left; i < right; i++) {
        if (pairs[i].cos > pivotVal) {
            [pairs[storeIdx], pairs[i]] = [pairs[i], pairs[storeIdx]];
            storeIdx++;
        }
    }
    [pairs[right], pairs[storeIdx]] = [pairs[storeIdx], pairs[right]];
    return storeIdx;
}

function dotProduct(str1: string, str2: string): number {
    let sum = 0;
    const freq1 = freq(str1);
    const freq2 = freq(str2);
    const intersection = new Set<string>(
        Object.keys(freq1).concat(Object.keys(freq2))
    );
    for (let c of intersection) {
        if (c in freq1 && c in freq2) {
            sum += freq1[c] * freq2[c];
        }
    }
    return sum;
}

function magnitude(str: string): number {
    const freq1 = freq(str);
    let sum = 0;
    for (let c in freq1) {
        sum += freq1[c] ** 2;
    }
    return Math.sqrt(sum);
}

interface charFreq {
    [key: string]: number;
}
function freq(str: string): charFreq {
    const freq: charFreq = {};
    for (let char of str) {
        if (char in freq) {
            freq[char] += 1;
        } else {
            freq[char] = 1;
        }
    }
    return freq;
}
