import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OrderCard from '@/components/nsp/order-card';
import { Order, fetchOrders, manageOrder, queryKeys } from '@/lib/api';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Search, Loader2 } from 'lucide-react';
import EmptyState from '@/components/nsp/empty-state';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function Home() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('today');
  const { toast } = useToast();
  const { ref, inView } = useInView();

  console.log('Inview : ', inView)

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch
  } = useInfiniteQuery({
    queryKey: queryKeys.orders.all,  
    queryFn: () => {
      console.log('Fetching orders...', )
      return fetchOrders({ pageParam: 1 });
    },
    getNextPageParam: (lastPage) => {
      console.log(lastPage)
      if (!lastPage?.pagination) return undefined;
      
      const { current_page, last_page } = lastPage.pagination;
      return current_page < last_page ? current_page + 1 : undefined;
    },
    initialPageParam: 1,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isError) {
    toast({
      variant: "destructive",
      title: "Error",
      description: error.message || "Failed to fetch orders",
    });
  }





  console.log('Logging Order data : ', data)
  // Flatten and process orders
  const allOrders = data?.pages.flatMap(page => page.orders) ?? [];
  
  // Filter today's orders
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayOrders = allOrders.filter(order => {
    const orderDate = new Date(order?.date);
    orderDate.setHours(0, 0, 0, 0);
    return orderDate.getTime() === today.getTime();
  });

  // Filter previous orders
  const previousOrders = allOrders.filter(order => {
    const orderDate = new Date(order?.date);
    orderDate.setHours(0, 0, 0, 0);
    return orderDate.getTime() < today.getTime();
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const filteredPreviousOrders = previousOrders?.filter(order =>
    order.joint_name?.toLowerCase().includes(search?.toLowerCase()) ||
    order.address?.toLowerCase().includes(search?.toLowerCase()) ||
    order.staff_name?.toLowerCase().includes(search?.toLowerCase())
  );

  const handleMarkCompleted = async (id: number) => {
    try {
      await manageOrder(id, 'Completed');
      refetch();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to mark order as completed",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <h1 className="md:text-3xl font-bold mb-6 md:mb-0">Manage Your Assigned Orders</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full my-4 bg-transparent flex md:justify-start justify-center space-x-2">
          <TabsTrigger 
            value="today" 
            className={cn('rounded-full py-2 px-6 data-[state=active]:bg-primary/10 data-[state=active]:text-primary shadow md:text-lg', 
              { 'bg-primary text-white': activeTab === 'today' }
            )}
          >
            Today
          </TabsTrigger>
          <TabsTrigger 
            value="previous" 
            className={cn('rounded-full py-2 px-6 data-[state=active]:bg-primary/10 data-[state=active]:text-primary shadow md:text-lg', 
              { 'bg-primary text-white': activeTab === 'previous' }
            )}
          >
            Previous Orders
          </TabsTrigger>
        </TabsList>
        <TabsContent value="today">
          {todayOrders?.length > 0 ? (
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
              <EmptyState 
                message='No Orders Assigned Yet' 
                onRefresh={() => refetch()} 
              /> 
            </div>
          )}
        </TabsContent>
        <TabsContent value="previous">
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
          {filteredPreviousOrders?.length > 0 ? (
            <>
              <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
                {filteredPreviousOrders.map((order, index) => (
                  <div key={order.id}>
                    <OrderCard
                      {...order}
                      onMarkCompleted={handleMarkCompleted}
                      activeTab={activeTab}
                    />
                    {index === filteredPreviousOrders?.length - 1 && (
                      <div ref={ref} className="mt-4">
                        {isFetchingNextPage && (
                          <div className="flex justify-center">
                            <Loader2 className="h-6 w-6 animate-spin text-primary" />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {hasNextPage && !isFetchingNextPage && (
                <div className="flex justify-center mt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => fetchNextPage()}
                    className="text-primary hover:text-primary-foreground"
                  >
                    Load More
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="h-full w-full mt-12 flex justify-center items-center">
              <EmptyState 
                message='No Orders Completed Yet' 
                onRefresh={() => refetch()} 
              /> 
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}