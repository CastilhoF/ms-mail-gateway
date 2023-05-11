abstract class QueueServiceInterface {
  abstract addItemOnQueue(message: string): Promise<void>;
  abstract getItemsOnQueue(): Promise<string[]>;
}

export default QueueServiceInterface;
