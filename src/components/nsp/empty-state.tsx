import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  message: string;
  onRefresh: () => void;
}

export default function EmptyState({ message, onRefresh }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <img src="/empty-clipboard.svg" alt="Empty clipboard" className="w-32 h-32 mb-4" />
      <p className="text-lg font-semibold mb-4">{message}</p>
      <Button onClick={onRefresh}>Refresh</Button>
    </div>
  );
}