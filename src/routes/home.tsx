import { useState } from 'react';
import { useLoaderData, useSubmit } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OrderCard from '@/components/nsp/order-card';
import { Order, markOrderCompleted } from '@/lib/api';
import { cn } from '@/lib/utils';

export default function Home() {
  const { todayOrders, previousOrders } = useLoaderData() as { todayOrders: Order[], previousOrders: Order[] };
  const [activeTab, setActiveTab] = useState('today');
  const queryClient = useQueryClient();
  const submit = useSubmit();

  const handleMarkCompleted = async (id: string) => {
    await markOrderCompleted(id);
    queryClient.invalidateQueries({queryKey: ['todayOrders']});
    submit(null, { method: 'get', action: '/' });
  };
console.log(activeTab)
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="md:text-3xl font-bold mb-6 md:mb-0">Manage Your Assigned Orders</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full bg-white mb-4 flex md:justify-start justify-center space-x-2">
          <TabsTrigger value="today" className={cn('rounded-full py-2 px-6 data-[state=active]:bg-primary/10 data-[state=active]:text-primary shadow', { 'bg-primary text-white': activeTab === 'today' })}>Today</TabsTrigger>
          <TabsTrigger value="previous" className={cn('rounded-full py-2 px-6 data-[state=active]:bg-primary/10 data-[state=active]:text-primary shadow', { 'bg-primary text-white': activeTab === 'previous' })}>Previous Orders</TabsTrigger>
        </TabsList>
        <TabsContent value="today">
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
            {todayOrders.map(order => (
              <OrderCard
                key={order.id}
                {...order}
                onMarkCompleted={handleMarkCompleted}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="previous">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {previousOrders.map(order => (
              <OrderCard
                key={order.id}
                {...order}
                onMarkCompleted={handleMarkCompleted}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}