// Simple priority queue implementation using binary heap
class PriorityQueue {
    constructor() {
        this.heap = [];
    }
    // Insert item maintaining priority order - O(log n)
    enqueue(item) {
        this.heap.push(item);
        this.heapifyUp(this.heap.length - 1);
    }
    // Remove highest priority item - O(log n)
    dequeue() {
        if (this.heap.length === 0)
            return undefined;
        if (this.heap.length === 1)
            return this.heap.pop();
        const root = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown(0);
        return root;
    }
    get length() {
        return this.heap.length;
    }
    clear() {
        return this.heap.splice(0);
    }
    heapifyUp(index) {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.compare(this.heap[index], this.heap[parentIndex]) <= 0)
                break;
            [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
            index = parentIndex;
        }
    }
    heapifyDown(index) {
        while (true) {
            let maxIndex = index;
            const leftChild = 2 * index + 1;
            const rightChild = 2 * index + 2;
            if (leftChild < this.heap.length && this.compare(this.heap[leftChild], this.heap[maxIndex]) > 0) {
                maxIndex = leftChild;
            }
            if (rightChild < this.heap.length && this.compare(this.heap[rightChild], this.heap[maxIndex]) > 0) {
                maxIndex = rightChild;
            }
            if (maxIndex === index)
                break;
            [this.heap[index], this.heap[maxIndex]] = [this.heap[maxIndex], this.heap[index]];
            index = maxIndex;
        }
    }
    // Compare function: higher priority first, then older timestamp
    compare(a, b) {
        if (a.priority !== b.priority) {
            return (a.priority || 0) - (b.priority || 0);
        }
        return b.timestamp - a.timestamp; // Older first (reversed for min-heap behavior)
    }
}
export class EditorProcessingService {
    constructor() {
        this.processingQueue = new PriorityQueue();
        this.isProcessing = false;
        this.statusChangeListeners = [];
        console.debug('EditorProcessingService created');
    }
    // Set the processing function from the editor
    setProcessor(processImage) {
        this.processImage = processImage;
        console.debug('Editor processor set, queue length:', this.processingQueue.length);
        // Start processing if there are queued items
        if (this.processingQueue.length > 0) {
            this.scheduleProcessing();
        }
    }
    // Add listener for status changes
    addStatusChangeListener(listener) {
        this.statusChangeListeners.push(listener);
    }
    // Remove status change listener
    removeStatusChangeListener(listener) {
        const index = this.statusChangeListeners.indexOf(listener);
        if (index > -1) {
            this.statusChangeListeners.splice(index, 1);
        }
    }
    // Notify status change listeners
    notifyStatusChange() {
        this.statusChangeListeners.forEach(listener => listener());
    }
    // Add task to processing queue
    async requestProcessing(task) {
        return new Promise((resolve, reject) => {
            // Validate that we have a processor
            if (!this.processImage) {
                console.warn('No processor available, rejecting task:', task.id);
                reject(new Error('Editor not ready - processor not set'));
                return;
            }
            const queueItem = {
                ...task,
                priority: task.priority || 0,
                resolve,
                reject,
                timestamp: Date.now(),
            };
            // Add to priority queue - O(log n)
            this.processingQueue.enqueue(queueItem);
            console.debug(`Added task ${task.id} to queue. Queue length: ${this.processingQueue.length}`);
            // Notify status change
            this.notifyStatusChange();
            // Schedule processing with debouncing
            this.scheduleProcessing();
        });
    }
    // Debounced processing to avoid starting processing on every single addition
    scheduleProcessing() {
        if (this.pendingProcessingTimeout) {
            clearTimeout(this.pendingProcessingTimeout);
        }
        this.pendingProcessingTimeout = setTimeout(() => {
            this.processQueue();
        }, 5); // 5ms debounce
    }
    // Process queue sequentially
    async processQueue() {
        if (this.isProcessing || this.processingQueue.length === 0 || !this.processImage) {
            return;
        }
        this.isProcessing = true;
        this.notifyStatusChange();
        console.debug('Starting queue processing...');
        while (this.processingQueue.length > 0) {
            // Get highest priority item - O(log n) vs O(n log n) sorting
            const item = this.processingQueue.dequeue();
            console.debug(`Processing task ${item.id} (priority: ${item.priority || 0}, queue remaining: ${this.processingQueue.length})`);
            try {
                const result = await this.processImage(item);
                item.resolve(result);
            }
            catch (error) {
                console.error(`Failed to process task ${item.id}:`, error);
                item.reject(error instanceof Error ? error : new Error(String(error)));
            }
            // Yield control to browser for UI updates - more efficient than setTimeout
            await new Promise(resolve => {
                if (typeof requestIdleCallback !== 'undefined') {
                    requestIdleCallback(resolve);
                }
                else {
                    // Fallback for environments without requestIdleCallback
                    setTimeout(resolve, 0);
                }
            });
            // Notify status change after each item
            this.notifyStatusChange();
        }
        this.isProcessing = false;
        this.notifyStatusChange();
        console.debug('Queue processing complete');
    }
    // Get current queue status
    getQueueStatus() {
        return {
            queueLength: this.processingQueue.length,
            isProcessing: this.isProcessing,
            hasProcessor: !!this.processImage,
        };
    }
    // Clear the queue (useful for cleanup)
    clearQueue() {
        const clearedItems = this.processingQueue.clear();
        clearedItems.forEach(item => {
            item.reject(new Error('Queue cleared'));
        });
        this.notifyStatusChange();
        console.debug(`Cleared ${clearedItems.length} items from queue`);
    }
    // Cleanup method for removing timeouts
    cleanup() {
        if (this.pendingProcessingTimeout) {
            clearTimeout(this.pendingProcessingTimeout);
            this.pendingProcessingTimeout = undefined;
        }
        this.clearQueue();
        this.statusChangeListeners.length = 0;
    }
}
