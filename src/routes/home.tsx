import { useState } from 'react';
import { useLoaderData, useSubmit } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OrderCard from '@/components/nsp/order-card';
import { Order, manageOrder } from '@/lib/api';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import EmptyState from '@/components/nsp/empty-state';

export default function Home() {
  const [search, setSearch] = useState('');
  const { orders } = useLoaderData() as { orders: Order[] };
  const [activeTab, setActiveTab] = useState('today');
  const queryClient = useQueryClient();
  const submit = useSubmit();

  const todayOrders = orders.filter(order => new Date(order.date).toDateString() === new Date().toDateString());
  const previousOrders = orders.filter(order => new Date(order.date) < new Date(new Date().setHours(0, 0, 0, 0)));

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const filteredPreviousOrders = previousOrders.filter(order =>
    order.name.toLowerCase().includes(search.toLowerCase()) ||
    order.address.toLowerCase().includes(search.toLowerCase()) ||
    order.joint_name.toLowerCase().includes(search.toLowerCase())
  );

  const handleMarkCompleted = async (id: number) => {
    try {
      await manageOrder(id, 'Completed');
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      submit(null, { method: 'get', action: '/' });
    } catch (error) {
      console.error('Failed to mark order as completed:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <h1 className="md:text-3xl font-bold mb-6 md:mb-0">Manage Your Assigned Orders</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full mb-4 bg-transparent flex md:justify-start justify-center space-x-2">
          <TabsTrigger 
            value="today" 
            className={cn('rounded-full py-2 px-6 data-[state=active]:bg-primary/10 data-[state=active]:text-primary shadow', 
              { 'bg-primary text-white': activeTab === 'today' }
            )}
          >
            Today
          </TabsTrigger>
          <TabsTrigger 
            value="previous" 
            className={cn('rounded-full py-2 px-6 data-[state=active]:bg-primary/10 data-[state=active]:text-primary shadow', 
              { 'bg-primary text-white': activeTab === 'previous' }
            )}
          >
            Previous Orders
          </TabsTrigger>
        </TabsList>
        <TabsContent value="today">
          {todayOrders.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
              {todayOrders.map(order => (
                <OrderCard
                  key={order.id}
                  {...order}
                  onMarkCompleted={handleMarkCompleted}
                  activeTab={activeTab}
                />
              ))}
            </div>
          ) : (
            <div className="h-full w-full mt-12 flex justify-center items-center">
              <EmptyState message='No Orders Assigned Yet' onRefresh={() => submit(null, { method: 'get', action: '/nsp' })} /> 
            </div>
          )}
        </TabsContent>
        <TabsContent value="previous">
          {filteredPreviousOrders.length > 0 ? (
            <>
              <div className="relative w-64 mb-3 mt-2">
                <Input
                  type="text"
                  placeholder="Search"
                  value={search}
                  onChange={handleSearch}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
              <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
                {filteredPreviousOrders.map(order => (
                  <OrderCard
                    key={order.id}
                    {...order}
                    onMarkCompleted={handleMarkCompleted}
                    activeTab={activeTab}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="h-full w-full mt-12 flex justify-center items-center">
              <EmptyState message='No Orders Completed Yet' onRefresh={() => submit(null, { method: 'get', action: '/nsp' })} /> 
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}